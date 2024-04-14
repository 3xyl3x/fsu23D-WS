const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const cookieSession = require("cookie-session");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(
	cookieSession({
		secret: "secretkeey",
		maxAge: 60000 * 60,
	})
);

const fetchUsers = async () => {
	const data = await fs.readFile("./data/users.json");
	const users = JSON.parse(data);
	return users;
};

// Get products from stripe
app.get("/products", async (req, res) => {
	const products = await stripe.products.list({
		expand: ["data.default_price"],
	});
	res.status(200).json(products);
});

// user register
app.post("/register", async (req, res) => {
	let { name, email, password } = req.body;
	email = email.toLowerCase();
	const users = await fetchUsers();
	const userAlreadyExists = users.find((u) => u.email === email);

	if (userAlreadyExists) {
		return res.status(400).json("User already exist");
	}

	// Create customer
	const customer = await stripe.customers.create({
		name: name,
		email: email,
	});

	const hashedPassword = await bcrypt.hash(password, 10);

	const registerUser = {
		name: name,
		email: email,
		password: hashedPassword,
		stripeID: customer.id,
	};
	users.push(registerUser);
	await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
	// Remove password from response
	delete registerUser.password;
	console.log("USER Register");
	req.session.user = registerUser;
	res.status(201).json(registerUser);
});

// User login
app.post("/login", async (req, res) => {
	let { email, password } = req.body;
	email = email.toLowerCase();
	const users = await fetchUsers();
	const user = users.find((u) => u.email === email);

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(400).json("Wrong user / password");
	}

	// Remove password from response
	delete user.password;
	console.log("USER LOG IN");
	req.session.user = user;
	res.status(200).json(user);
});

// User logout
app.post("/logout", async (req, res) => {
	req.session = null;
	res.status(200).json("Logged out");
});

// User authorize
app.get("/authorize", async (req, res) => {
	console.log("AUTHORIZING:" + req.session.user ? "true" : "false");

	if (!req.session.user) {
		return res.status(401).json("You are not logged in");
	}

	res.status(200).json(req.session.user);
});

// Checkout
app.post("/checkout", async (req, res) => {
	const cart = req.body;
	const session = await stripe.checkout.sessions.create({
		mode: "payment",
		customer: req.session.user.stripeID,
		line_items: cart.map((item) => {
			return {
				price: item.product,
				quantity: item.quantity,
			};
		}),
		success_url: "http://localhost:5173",
		cancel_url: "http://localhost:5173",
	});

	res.status(200).json({ url: session.url, sessionId: session.id });
});

// Verify
app.post("/verify", async (req, res) => {
	const sessionId = req.body.sessionId;

	const session = await stripe.checkout.sessions.retrieve(sessionId);

	if (session.payment_status === "paid") {
		const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

		const order = {
			sessionId: sessionId,
			orderNumber: Math.floor(Math.random() * 100000000),
			customerName: session.customer_details.name,
			products: lineItems.data,
			total: session.amount_total,
			date: new Date(),
		};

		const orders = JSON.parse(await fs.readFile("./data/orders.json"));
		const existingOrder = orders.find((order) => order.sessionId === sessionId);
		if (!existingOrder) {
			orders.push(order);
			await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4));
		}
		res.status(200).json({ verified: true });
	} else return res.status(400).json("Not verified");
});

app.listen(3000, () => console.log("Server is online"));

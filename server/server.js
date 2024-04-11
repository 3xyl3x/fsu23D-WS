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
	let { email, password } = req.body;
	email = email.toLowerCase();
	const users = await fetchUsers();
	const userAlreadyExists = users.find((u) => u.email === email);

	if (userAlreadyExists) {
		return res.status(400).json("User already exist");
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const registerUser = {
		email: email,
		password: hashedPassword,
	};
	users.push(registerUser);
	await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
	res.status(201).json(registerUser.email);
});

// User login
app.post("/login", async (req, res) => {
	let { email, password } = req.body;
	email = email.toLowerCase();
	const users = await fetchUsers();
	const userExists = users.find((u) => u.email === email);

	if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
		return res.status(400).json("Wrong user / password");
	}

	req.session.user = userExists;
	res.status(200).json(userExists.email);
});

// User logout
app.post("/logout", async (req, res) => {
	req.session = null;
	res.status(200).json("Logged out");
});

// User authorize
app.get("/authorize", async (req, res) => {
	// If there is no user session, return 401
	if (!req.session.user) {
		return res.status(401).json("You are not logged in");
	}

	// Return user session email
	res.status(200).json(true);
});

app.listen(3000, () => console.log("Server is online"));

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
	const { email, password } = req.body;
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
	try {
		const users = await fetchUsers();
		const user = users.find((u) => u.email === email);

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		req.session.user = user;
		res.status(200).json({ email: user.email });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

// User logout
app.post("/logout", async (req, res) => {
	try {
		req.session.destroy();
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

// User authorize
app.get("/authorize", async (req, res) => {
	try {
		if (!req.session.user) {
			return res.status(401).json({ error: "Unauthorized" });
		}

		res.status(200).json({ authorized: true, email: req.session.user.email });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

app.listen(3000, () => console.log("Server is online"));

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(cors());

app.get("/products", async (req, res) => {
	const products = await stripe.products.list({
		expand: ["data.default_price"],
	});
	res.status(200).json(products);
});

app.listen(3000, () => console.log("Server online"));

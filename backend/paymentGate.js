const dotenv = require("dotenv");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
const router = express.Router();

app.route("/create-checkout-session").post(async (req, res) => {
  try {
  } catch (e) {}
});

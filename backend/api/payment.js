const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const authMiddleware = require("../middleware/authMiddleware");
const prisma = require("../lib/prisma");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const app = express();

  // CORS configuration
  const corsOrigin = process.env.CLIENT_URL || "http://localhost:5173";
  app.use(
    cors({
      origin: corsOrigin,
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
      credentials: true,
    })
  );

  app.use(express.json());

  // Create checkout session
  app.post("/create-checkout-session", authMiddleware, async (req, res) => {
    try {
      const { plan } = req.body;

      const PLAN_PRICES = {
        free: 0,
        premium: 999,
        enterprise: 2999,
      };

      if (plan === "free") {
        return res
          .status(200)
          .json({ url: process.env.CLIENT_URL + "/success" });
      }

      if (!PLAN_PRICES[plan]) {
        return res.status(400).json({ error: "Invalid plan" });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        metadata: {
          userId: req.user.id,
          plan,
        },
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `AI Lawyer ${plan.toUpperCase()} Plan`,
              },
              unit_amount: PLAN_PRICES[plan] * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: process.env.CLIENT_URL + "/success",
        cancel_url: process.env.CLIENT_URL + "/cancel",
      });

      res.status(200).json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app(req, res);
};

import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import authRoutes from "./auth/authRoutes.js";

const users = []; // change to db

const app = express();
const router = express.Router();
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --------------------------- temp
app.use("/auth", authRoutes);
import authMiddleware from "./middleware/authMiddleware.js";

app.get("/auth/me", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

// --------------------------

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { plan } = req.body;
    const PLAN_PRICES = {
      free: 0,
      premium: 999,
      Enterprise: 2999,
    };
    if (plan === "free") {
      return res.status(200).json({ url: process.env.CLIENT_URL + "/success" });
    }
    if (!PLAN_PRICES[plan]) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `AI Lawyer ${plan.toUpperCase()} Version`,
              description: `It is ${plan.toUpperCase()} Subscription Plan`,
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

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

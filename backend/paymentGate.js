import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import cors from "cors";

import authRoutes from "./auth/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import { users } from "./auth/userStore.js";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ MUST COME FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//  MUST COME BEFORE ROUTES
app.use(express.json());

// ---------------- AUTH ROUTES ----------------
app.use("/auth", authRoutes);

app.get("/auth/me", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

// ---------------- STRIPE ROUTES ----------------
const router = express.Router();

router.post("/create-checkout-session", authMiddleware, async (req, res) => {
  try {
    const { plan } = req.body;

    const PLAN_PRICES = {
      free: 0,
      premium: 999,
      enterprise: 2999,
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

router.post("/payment-success", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { plan } = req.body;
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.role = plan;
  res
    .status(200)
    .json({ message: "User plan updated successfully", plan: user.plan });
  res.json({
    message: "role upgraded",
    role: user.role,
  });
});

app.use("/api", router);

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

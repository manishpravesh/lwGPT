// import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import jwt from "jsonwebtoken";
import "dotenv/config";
// dotenv.config();
import authRoutes from "./auth/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import { chatWithAI } from "./controllers/chatController.js";
import { users } from "./auth/userStore.js";
import prisma from "./lib/prisma.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ MUST COME FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/api", chatRoutes);

//  MUST COME BEFORE ROUTES
// app.use((req, res, next) => {
//   if (req.originalUrl === "/webhook") {
//     next();
//   } else {
//     express.json()(req, res, next);
//   }
// });

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

// ---------------- CHAT ROUTE ----------------
// app.post("/chat", handleChat);

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

  const newToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "role upgraded",
    role: user.role,
    token: newToken,
  });
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.metadata.userId;
      const plan = session.metadata.plan;

      try {
        // 1 Save payment
        await prisma.payment.create({
          data: {
            stripeSessionId: session.id,
            amount: session.amount_total,
            currency: session.currency,
            status: session.payment_status,
            plan,
            userId,
          },
        });

        // 2 Upsert subscription
        await prisma.subscription.upsert({
          where: { userId },
          update: { plan, active: true },
          create: { userId, plan },
        });

        // 3️Upgrade user role
        await prisma.user.update({
          where: { id: userId },
          data: { role: plan },
        });

        console.log(`User ${userId} upgraded to ${plan}`);
      } catch (dbErr) {
        console.error("DB error in webhook:", dbErr);
        return res.status(500).send("Database error");
      }
    }

    res.json({ received: true });
  }
);

app.use("/api", router);

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

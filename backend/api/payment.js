const Stripe = require("stripe");
const authMiddleware = require("../middleware/authMiddleware");
const prisma = require("../lib/prisma");

let stripe;

module.exports = async (req, res) => {
  // Initialize Stripe
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  // CORS headers
  const corsOrigin = process.env.CLIENT_URL || "http://localhost:5173";
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Parse JSON body
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      if (body) {
        req.body = JSON.parse(body);
      }

      if (req.method === "POST" && req.url === "/create-checkout-session") {
        // Apply auth middleware
        await authMiddleware(req, res, async () => {
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
        });
      } else {
        res.status(404).json({ error: "Not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
};

import redis from "../lib/redis.js";
import { PLAN_LIMITS } from "../config/limits.js";

const usageLimit = (feature) => {
  return async (req, res, next) => {
    const user = req.user;
    const limit = PLAN_LIMITS[user.role];

    if (limit === Infinity) {
      return next();
    }

    const key = `usage:${user.id}:${feature}`;

    const current = await redis.incr(key);

    // Set expiry only on first hit
    if (current === 1) {
      await redis.expire(key, 60 * 60 * 24); // 24 hours
    }

    if (current > limit) {
      return res.status(429).json({
        error: "Daily usage limit exceeded. Upgrade plan.",
      });
    }

    next();
  };
};

export default usageLimit;
// NOT YET APPLIED THE REDIS LIMIT, APPLY IN THE ROUTES

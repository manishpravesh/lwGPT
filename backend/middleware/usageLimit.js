import redis from "../lib/redis.js";
import { PLAN_LIMITS } from "../config/limits.js";

const usageLimit = (feature) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const limit = PLAN_LIMITS[user.role];

      // Free users or unlimited plans skip the check
      if (limit === Infinity) {
        return next();
      }

      const key = `usage:${user.id}:${feature}`;

      try {
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
      } catch (redisErr) {
        console.warn("Redis error, allowing request:", redisErr.message);
        // If Redis fails, allow the request to proceed (fail-open)
      }

      next();
    } catch (err) {
      console.error("Usage limit error:", err);
      // If anything fails, allow the request through
      next();
    }
  };
};

export default usageLimit;

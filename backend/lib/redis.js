import { Redis } from "@upstash/redis";

let redis;

try {
  redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
    automaticDeserialization: false,
  });

  // Test connection
  redis.ping().catch((err) => {
    console.warn("Redis connection warning:", err.message);
  });
} catch (error) {
  console.error("Failed to initialize Redis:", error);
  // Create a fallback mock redis if connection fails
  redis = {
    incr: async () => 0,
    expire: async () => true,
    get: async () => null,
    set: async () => true,
  };
}

export default redis;

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

let prisma;

try {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20, // Maximum connections
    min: 2, // Minimum connections to maintain
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000, // Increased from 2000 to 10000ms
    statement_timeout: 10000,
  });

  // Handle pool errors
  pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
  });

  const adapter = new PrismaPg(pool);

  if (!global.prisma) {
    global.prisma = new PrismaClient({
      adapter,
      log: [
        {
          emit: "event",
          level: "error",
        },
      ],
    });

    // Handle Prisma errors
    global.prisma.$on("error", (e) => {
      console.error("Prisma error event:", e);
    });
  }
  prisma = global.prisma;
} catch (error) {
  console.error("Failed to initialize Prisma:", error);
  throw error;
}

export default prisma;

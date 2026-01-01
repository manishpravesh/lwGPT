import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

let prisma;

try {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, // Maximum connections
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
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

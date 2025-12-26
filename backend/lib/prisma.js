import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Client } = pg;

let prisma;

if (process.env.NODE_ENV === "production") {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(client);
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(client);
    global.prisma = new PrismaClient({
      adapter,
      log: ["warn", "error"],
    });
  }
  prisma = global.prisma;
}

export default prisma;

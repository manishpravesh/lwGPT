import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";

const DEFAULT_DEMO_EMAIL = "demo@lawgpt.local";
const DEFAULT_DEMO_PASSWORD = "Demo@123456";

export const DEMO_USER_EMAIL =
  process.env.DEMO_USER_EMAIL || DEFAULT_DEMO_EMAIL;
export const DEMO_USER_PASSWORD =
  process.env.DEMO_USER_PASSWORD || DEFAULT_DEMO_PASSWORD;

export const ensureDemoUser = async () => {
  const passwordHash = await bcrypt.hash(DEMO_USER_PASSWORD, 10);

  await prisma.user.upsert({
    where: { email: DEMO_USER_EMAIL },
    update: {
      password: passwordHash,
      role: "FREE",
    },
    create: {
      email: DEMO_USER_EMAIL,
      password: passwordHash,
      role: "FREE",
    },
  });

  console.log(`Demo user ready: ${DEMO_USER_EMAIL}`);
};

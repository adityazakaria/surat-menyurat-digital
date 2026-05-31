import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (c) => {
  const { email, password } = await c.req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return c.json({ message: "Email atau password salah" }, 401);
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  return c.json({
    token,
    user: { id: user.id, nama: user.nama, email: user.email, role: user.role },
  });
};

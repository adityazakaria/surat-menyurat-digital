import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (c) => {
  try {
    const { email, password } = await c.req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return c.json(
        { message: "Email atau password salah" },
        401
      );
    }

    if (!process.env.JWT_SECRET) {
      return c.json(
        { message: "JWT_SECRET belum diset di Vercel" },
        500
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return c.json({
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR LAGI:", error);

    return c.json(
      {
        message: error.message,
      },
      500
    );
  }
};
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const getUsers = async (c) => {
  const users = await prisma.user.findMany({
    select: { id: true, nama: true, email: true, role: true, createdAt: true },
  });
  return c.json(users);
};

export const createUser = async (c) => {
  const { nama, email, password, role } = await c.req.json();
  const hashed = bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: { nama, email, password: hashed, role },
  });
  return c.json(user, 201);
};

export const updateUser = async (c) => {
  const id = parseInt(c.req.param("id"));
  const { nama, email, role, password } = await c.req.json();
  const data = { nama, email, role };
  if (password) data.password = bcrypt.hashSync(password, 10);
  const user = await prisma.user.update({ where: { id }, data });
  return c.json(user);
};

export const deleteUser = async (c) => {
  const id = parseInt(c.req.param("id"));
  await prisma.user.delete({ where: { id } });
  return c.json({ message: "User deleted" });
};

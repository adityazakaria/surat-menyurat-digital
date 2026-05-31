import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardStats = async (c) => {
  const user = c.get("user");
  let stats = {};
  if (user.role === "admin") {
    const totalSurat = await prisma.surat.count();
    const draft = await prisma.surat.count({ where: { status: "draft" } });
    const disposition = await prisma.surat.count({
      where: { status: "disposition" },
    });
    const process = await prisma.surat.count({ where: { status: "process" } });
    const completed = await prisma.surat.count({
      where: { status: "completed" },
    });
    stats = { totalSurat, draft, disposition, process, completed };
  } else if (user.role === "pimpinan") {
    const totalDisposisi = await prisma.disposisi.count({
      where: { dariUserId: user.id },
    });
    const selesai = await prisma.disposisi.count({
      where: { dariUserId: user.id, status: "completed" },
    });
    stats = { totalDisposisi, selesai };
  } else if (user.role === "staff") {
    const tugasBelum = await prisma.disposisi.count({
      where: { kepadaUserId: user.id, status: "pending" },
    });
    const tugasSelesai = await prisma.disposisi.count({
      where: { kepadaUserId: user.id, status: "completed" },
    });
    stats = { tugasBelum, tugasSelesai };
  }
  return c.json(stats);
};

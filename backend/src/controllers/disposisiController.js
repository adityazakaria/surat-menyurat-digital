import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createDisposisi = async (c) => {
  const user = c.get("user");
  const { suratId, kepadaUserId, instruksi, batasWaktu } = await c.req.json();
  const disposisi = await prisma.disposisi.create({
    data: {
      suratId,
      dariUserId: user.id,
      kepadaUserId,
      instruksi,
      batasWaktu: new Date(batasWaktu),
    },
  });
  await prisma.surat.update({
    where: { id: suratId },
    data: { status: "disposition" },
  });
  return c.json(disposisi, 201);
};

export const getTugasStaff = async (c) => {
  const user = c.get("user");
  const tugas = await prisma.disposisi.findMany({
    where: { kepadaUserId: user.id },
    include: { surat: true, dariUser: { select: { nama: true } } },
    orderBy: { createdAt: "desc" },
  });
  return c.json(tugas);
};

export const selesaikanDisposisi = async (c) => {
  const id = parseInt(c.req.param("id"));
  const disposisi = await prisma.disposisi.update({
    where: { id },
    data: { status: "completed" },
  });
  await prisma.surat.update({
    where: { id: disposisi.suratId },
    data: { status: "completed" },
  });
  return c.json(disposisi);
};

export const getDisposisiBySurat = async (c) => {
  const suratId = parseInt(c.req.param("suratId"));
  const disposisi = await prisma.disposisi.findMany({
    where: { suratId },
    include: {
      dariUser: { select: { nama: true } },
      kepadaUser: { select: { nama: true } },
    },
  });
  return c.json(disposisi);
};

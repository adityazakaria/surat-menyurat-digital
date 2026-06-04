import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import { authenticate, authorize } from "./middleware/auth.js";
import { login } from "./controllers/authController.js";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/userController.js";

import {
  getSuratList,
  createSurat,
  updateStatusSurat,
  deleteSurat,
  getSuratById,
} from "./controllers/suratController.js";

import {
  createDisposisi,
  getTugasStaff,
  selesaikanDisposisi,
  getDisposisiBySurat,
} from "./controllers/disposisiController.js";

import { getDashboardStats } from "./controllers/dashboardController.js";
import { exportLaporanPDF } from "./controllers/laporanController.js";

const app = new Hono();

// ======================
// CORS
// ======================
app.use(
  "*",
  cors({
    origin: "https://tampilanweb-delta.vercel.app",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Handle preflight request
app.options("*", (c) => {
  return c.body(null, 204);
});

// ======================
// PUBLIC ROUTES
// ======================
app.get("/", (c) => {
  return c.text("API OK");
});

app.post("/api/auth/login", login);

// ======================
// PROTECTED ROUTES
// ======================
app.use("/api/users/*", authenticate);
app.use("/api/surat/*", authenticate);
app.use("/api/disposisi/*", authenticate);
app.use("/api/dashboard/*", authenticate);
app.use("/api/laporan/*", authenticate);

// ======================
// USERS
// ======================
app.get("/api/users", authorize("admin"), getUsers);
app.post("/api/users", authorize("admin"), createUser);
app.put("/api/users/:id", authorize("admin"), updateUser);
app.delete("/api/users/:id", authorize("admin"), deleteUser);

// ======================
// SURAT
// ======================
app.get("/api/surat", getSuratList);
app.get("/api/surat/:id", getSuratById);

app.post("/api/surat", authorize("staff", "admin"), createSurat);

app.put(
  "/api/surat/:id/status",
  authorize("staff", "admin"),
  updateStatusSurat,
);

app.delete("/api/surat/:id", authorize("admin"), deleteSurat);

// ======================
// DISPOSISI
// ======================
app.post("/api/disposisi", authorize("pimpinan", "admin"), createDisposisi);

app.get("/api/disposisi/tugas", authorize("staff"), getTugasStaff);

app.get("/api/disposisi/surat/:suratId", getDisposisiBySurat);

app.put("/api/disposisi/:id/selesai", authorize("staff"), selesaikanDisposisi);

// ======================
// DASHBOARD
// ======================
app.get("/api/dashboard", getDashboardStats);

// ======================
// LAPORAN PDF
// ======================
app.get(
  "/api/laporan/pdf",
  authorize("admin", "pimpinan", "staff"),
  exportLaporanPDF,
);

// ======================
// START SERVER
// ======================
export default handle(app);

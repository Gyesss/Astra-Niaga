import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT id, username, email, role, full_name, profile_picture FROM users WHERE email = ? AND password = ?",
      [email, password],
    );

    if (rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Login berhasil!",
        user: rows[0],
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Email atau password salah.",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server." });
  }
});

export default router;

// +++++++++++++++++++++++++++++++++++++++

// server/routes/auth.js

// ... (tambahkan di bawah route login)

router.post("/register", async (req, res) => {
  const { username, email, password, role = "buyer" } = req.body;

  // VALIDASI SERVER-SIDE
  const usernameRegex = /^[a-z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      success: false,
      message:
        "Format username tidak valid. Gunakan hanya huruf kecil dan angka.",
    });
  }

  try {
    // 1. Cek apakah email atau username sudah terdaftar
    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username],
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username atau Email sudah digunakan.",
      });
    }

    // 2. Insert user baru (Password masih plaintext sesuai tahap awal Anda)
    await db.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, password, role],
    );

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil! Silakan login.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Gagal mendaftarkan user." });
  }
});

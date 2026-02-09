import express from "express";
import db from "../db.js";

const router = express.Router();

/**
 * -----------------------------------------------------------------------
 * ENDPOINT: LOGIN
 * Fungsinya untuk memverifikasi kredensial user (email & password).
 * Jika cocok, mengembalikan data profil user untuk disimpan di frontend.
 * -----------------------------------------------------------------------
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT id, username, email, role, full_name, profile_picture, phone_number FROM users WHERE email = ? AND password = ?",
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
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Terjadi kesalahan server." });
  }
});

/**
 * -----------------------------------------------------------------------
 * ENDPOINT: REGISTRASI
 * Fungsinya untuk membuat user baru di database.
 * Termasuk pengecekan apakah username/email sudah dipakai dan validasi format.
 * -----------------------------------------------------------------------
 */
router.post("/register", async (req, res) => {
  const { username, email, password, role = "buyer" } = req.body;

  // Validasi format username (Hanya huruf kecil, angka, dan underscore)
  const usernameRegex = /^[a-z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      success: false,
      message:
        "Format username tidak valid. Gunakan hanya huruf kecil dan angka.",
    });
  }

  try {
    // Cek duplikasi data
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

    // Eksekusi pembuatan user
    await db.execute(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, password, role],
    );

    res.status(201).json({ success: true, message: "Registrasi berhasil!" });
  } catch (error) {
    console.error("Register Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal mendaftarkan user." });
  }
});

// --- AMBIL PRODUK SAYA ---
router.get("/products/mine/:seller_id", async (req, res) => {
  const { seller_id } = req.params;
  console.log("Mencari produk untuk User ID:", seller_id); // Log untuk debug

  try {
    // Query ini mencari produk yang shop-nya dimiliki oleh seller_id
    const query = `
      SELECT p.* FROM products p
      JOIN shops s ON p.shop_id = s.id
      WHERE s.user_id = ?
      ORDER BY p.created_at DESC
    `;

    const [rows] = await db.execute(query, [seller_id]);
    console.log("Produk ditemukan:", rows.length);
    res.json(rows);
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json([]);
  }
});

/**
 * -----------------------------------------------------------------------
 * ENDPOINT: UPDATE PROFIL
 * Fungsinya untuk memperbarui data opsional user (nama, hp, foto).
 * Setelah update, mengirimkan data user terbaru untuk memperbarui localStorage.
 * -----------------------------------------------------------------------
 */
router.put("/update-profile", async (req, res) => {
  const { id, full_name, phone_number, profile_picture } = req.body;

  try {
    // Melakukan update ke database
    await db.execute(
      "UPDATE users SET full_name = ?, phone_number = ?, profile_picture = ? WHERE id = ?",
      [full_name, phone_number, profile_picture, id],
    );

    // Mengambil data terbaru untuk disinkronkan ke frontend
    const [updated] = await db.execute(
      "SELECT id, username, email, role, full_name, profile_picture, phone_number FROM users WHERE id = ?",
      [id],
    );

    res.json({ success: true, user: updated[0] });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Gagal memperbarui profil." });
  }
});

/**
 * -----------------------------------------------------------------------
 * ENDPOINT: HAPUS AKUN
 * Fungsinya untuk menghapus data user dari database secara permanen.
 * -----------------------------------------------------------------------
 */
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
    res.json({ success: true, message: "Akun berhasil dihapus." });
  } catch (err) {
    console.error("Delete Account Error:", err);
    res.status(500).json({ success: false, message: "Gagal menghapus akun." });
  }
});

export default router;

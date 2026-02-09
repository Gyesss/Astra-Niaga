import express from "express";
import db from "../db.js";

const router = express.Router();

// --- 1. AMBIL SEMUA KATEGORI ---
router.get("/categories", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT id, name FROM categories ORDER BY name ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json([]);
  }
});

// --- 2. AMBIL SEMUA PRODUK ---
router.get("/products", async (req, res) => {
  try {
    const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.created_at DESC
    `;
    const [rows] = await db.execute(query);
    res.json(rows);
  } catch (err) {
    console.error("Gagal ambil produk:", err.message);
    res.status(500).json([]);
  }
});

router.post("/products/add", async (req, res) => {
  const { name, price, stock, description, image_url, seller_id } = req.body;

  try {
    // 1. CARI DULU: Mana ID Shop milik user ini?
    const [shop] = await db.execute(
      "SELECT id FROM shops WHERE user_id = ?", 
      [seller_id]
    );

    // 2. Jika user belum punya toko di tabel 'shops'
    if (shop.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Gagal: Kamu belum memiliki profil Toko (Shop). Silakan buat toko terlebih dahulu." 
      });
    }

    const shopId = shop[0].id;

    // 3. BARU INSERT: Gunakan shopId yang asli dari database
    const query = `
      INSERT INTO products 
      (shop_id, name, description, price, stock, image_url) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    await db.execute(query, [
      shopId, 
      name, 
      description || "", 
      price, 
      stock || 0, 
      image_url || ""
    ]);
    
    res.status(201).json({ success: true, message: "Produk berhasil ditambahkan!" });
  } catch (err) {
    console.error("Database Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- 4. UPDATE PROFIL USER ---
router.put("/user/update", async (req, res) => {
  const { id, full_name, phone_number, profile_picture, password } = req.body;
  try {
    await db.execute(
      "UPDATE users SET full_name = ?, phone_number = ?, profile_picture = ?, password = ? WHERE id = ?",
      [full_name, phone_number, profile_picture, password, id]
    );
    const [updated] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    res.json({ success: true, user: updated[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
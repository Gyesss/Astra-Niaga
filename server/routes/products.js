import express from "express";
import db from "../db.js";

const router = express.Router();

/**
 * ENDPOINT: TAMBAH PRODUK BARU
 * Digunakan oleh seller untuk memasukkan barang ke marketplace.
 */
router.post("/add", async (req, res) => {
  const { name, description, price, stock, category_id, seller_id, image_url } =
    req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO products (name, description, price, stock, category_id, seller_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, description, price, stock, category_id, seller_id, image_url],
    );

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan!",
      productId: result.insertId,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Gagal menambahkan produk." });
  }
});

export default router;

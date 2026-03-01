import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3001; // Tetap di 3001 sesuai log terakhirmu

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "data.json");

app.use(express.json());

// Middleware CORS agar Frontend ICB Cinta Niaga bisa akses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Helper: Baca & Tulis
const readData = () => JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const writeData = (data) =>
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// API Routes
app.get("/api/products", (req, res) => {
  try {
    const data = readData();
    res.json(data.products || []);
  } catch (err) {
    res.status(500).json({ error: "Gagal memuat produk UMKM" });
  }
});

app.post("/api/products", (req, res) => {
  try {
    const data = readData();
    const newProduct = { id: Date.now(), ...req.body };
    data.products.push(newProduct);
    writeData(data);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Gagal menyimpan produk UMKM" });
  }
});

// Tambahkan ini di bawah app.post('/api/products', ...)
app.delete("/api/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = readData();
    const filteredProducts = data.products.filter((p) => p.id !== parseInt(id));

    if (data.products.length === filteredProducts.length) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    data.products = filteredProducts;
    writeData(data);
    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: "Gagal menghapus data" });
  }
});

// API: Ambil semua pesanan (Antrean)
app.get("/api/orders", (req, res) => {
  const data = readData();
  res.json(data.orders || []);
});

// API: Kirim Pesanan Baru (Checkout)
app.post("/api/orders", (req, res) => {
  const data = readData();
  const newOrder = { id: Date.now(), ...req.body, status: "pending" };
  if (!data.orders) data.orders = [];
  data.orders.push(newOrder);
  writeData(data);
  res.status(201).json(newOrder);
});

// API: ACC Pesanan (Pindah dari Orders ke Transactions)
app.post("/api/orders/acc/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const orderIndex = data.orders.findIndex((o) => o.id === parseInt(id));

  if (orderIndex === -1)
    return res.status(404).json({ error: "Order tidak ditemukan" });

  const acceptedOrder = {
    ...data.orders[orderIndex],
    status: "success",
    completedAt: new Date(),
  };

  // Pindahkan data
  if (!data.transactions) data.transactions = [];
  data.transactions.push(acceptedOrder);
  data.orders.splice(orderIndex, 1);

  writeData(data);
  res.json({ message: "Pesanan berhasil di-ACC" });
});

// API: Riwayat Transaksi
app.get("/api/transactions", (req, res) => {
  const data = readData();
  res.json(data.transactions || []);
});

app.listen(PORT, () => {
  console.log(
    `🚀 ASTRA NIAGA SERVER (ICB CINTA NIAGA) jalan di http://localhost:${PORT}`,
  );
});

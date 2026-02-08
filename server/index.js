import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import categoryRoutes from './routes/categories.js';

const app = express();
app.use(express.json());

// Tempat mendaftarkan rute nanti
// app.use('/api/products', productRoutes);

app.use(cors()); // Izinkan semua origin (untuk development)
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/categories', categoryRoutes);

app.get("/", (req, res) => {
  res.send("API Astra-Niaga siap digunakan!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server Astra-Niaga (ESM) jalan di http://localhost:${PORT}`);
});

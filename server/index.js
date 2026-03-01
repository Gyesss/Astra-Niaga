import express from "express";
import db from "./db.js";

const app = express();
app.use(express.json());

// Tempat mendaftarkan rute nanti
// app.use('/api/products', productRoutes);

app.get("/", (req, res) => {
  res.send("API Astra-Niaga siap digunakan!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server Astra-Niaga (ESM) jalan di http://localhost:${PORT}`);
});

idfm-proxy/
 ├── server.js
 └── package.json
Je te redonne les deux fichiers à copier ⬇️

server.js
js
Copier le code
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS permis pour tout (GitHub Pages inclus)
app.use(cors());

const API_KEY = process.env.IDFM_KEY;

app.get("/trip-updates", async (req, res) => {
  try {
    const url =
      "https://prim.iledefrance-mobilites.fr/marketplace/gtfs-rt-trip-updates/v2/gtfs-rt-trip-updates?key=" +
      API_KEY;

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    res.set("Content-Type", "application/octet-stream");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log("Proxy IDFM actif sur port " + PORT));

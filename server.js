import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.IDFM_KEY;

const IDFM_TRIP_UPDATES =
  "https://prim.iledefrance-mobilites.fr/marketplace/gtfs-rt-trip-updates/v2/gtfs-rt-trip-updates";

app.get("/trip-updates", async (req, res) => {
  try {
    const response = await fetch(`${IDFM_TRIP_UPDATES}?key=${API_KEY}`);
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/octet-stream");
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Proxy IDFM lancé sur port " + PORT);
});

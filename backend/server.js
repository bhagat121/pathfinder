const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dfs = require("./dfs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/run-dfs", (req, res) => {
  const { grid, startTile, endTile } = req.body;

  if (!grid || !startTile || !endTile) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  const { traversedTiles, path } = dfs(grid, startTile, endTile);
  res.json({ traversedTiles, path });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


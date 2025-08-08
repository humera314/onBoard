const express = require('express');
const fs = require('fs');
const cors = require('cors');
const csv = require('csv-parser');

const app = express();
app.use(cors());

app.get('/api/data', (req, res) => {
  const results = [];

  fs.createReadStream('../public/data/data.csv') // Adjust path if needed
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`CSV server running at http://localhost:${PORT}`);
});

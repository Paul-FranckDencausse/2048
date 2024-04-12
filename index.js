require('dotenv').config({ path: 'w3s-dynamic-storage/.env' });
const express = require("express");
const path = require('path');
const clientApp = express();
const port = process.env.PORT || 3000;

clientApp.use(express.static('dist'));
clientApp.use(express.json());
clientApp.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist', 'index.html'));
});
clientApp.listen(port, () => console.log('client listening on port 3000'));





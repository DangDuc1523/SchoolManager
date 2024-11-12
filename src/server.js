// server.js
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/angular-app')));

// Điều hướng cho các trang
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-app/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

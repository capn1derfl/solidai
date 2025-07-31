const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Basic route
app.get("/", (req, res) => {
  res.send("✅ SolidAI server is running successfully on Render!");
});

// Example API endpoint
app.get("/api/status", (req, res) => {
  res.json({ status: "online", timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SolidAI server listening on port ${PORT}`);
});

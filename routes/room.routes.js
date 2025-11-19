const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Room routes working");
});

module.exports = router;

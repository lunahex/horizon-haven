const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Payment routes working");
});

module.exports = router;

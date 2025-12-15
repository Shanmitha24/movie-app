const express = require("express");
const Favorite = require("../models/Favorite");
const auth = require("../middleware/auth");

const router = express.Router();

/* ADD FAVORITE */
router.post("/", auth, async (req, res) => {
  try {
    const fav = await Favorite.create({
      ...req.body,
      userId: req.userId,
    });
    res.status(201).json(fav);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* GET USER FAVORITES */
router.get("/", auth, async (req, res) => {
  try {
    const favs = await Favorite.find({ userId: req.userId });
    res.json(favs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* REMOVE FAVORITE */
router.delete("/:id", auth, async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;

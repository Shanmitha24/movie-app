const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  movieId: Number,
  title: String,
  poster_path: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Favorite", FavoriteSchema);

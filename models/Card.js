// Requires
const mongoose = require("mongoose");

// mongoose schema
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

// mongoose
const Card = mongoose.model("card", cardSchema);

// export the model
module.exports = Card;

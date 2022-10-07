const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.payload._id);
    if (!user) return res.status(404).send("user doesnt exists");
    else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send("Error in profile");
  }
});

module.exports = router;

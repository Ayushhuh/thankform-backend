const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/formdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const UserSchema = new mongoose.Schema({
  username: String,
});
const User = mongoose.model("User", UserSchema);

// API endpoint
app.post("/submit", async (req, res) => {
  const { username } = req.body;
  const user = new User({ username });
  await user.save();
  res.json({ message: `Thank you, ${username}` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

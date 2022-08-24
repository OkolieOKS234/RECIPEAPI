const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/recipeApi");

const recipeSchema = {
  name: String,
  category: String,
  source: String,
  ingredients: [
    {
      i1: String,
      i2: String,
      i3: String,
      i4: String,
      i5: String,
      i6: String,
      i7: String,
      i8: String,
      i9: String,
      i10: String,
      i11: String,
      i12: String,
    },
  ],
  steps: [
    {
      st1: String,
      st2: String,
      st3: String,
      st4: String,
      st5: String,
      st6: String,
      st7: String,
      st8: String,
      st9: String,
      st10: String,
    },
  ],
};

const Recipes = mongoose.model("Recipes", recipeSchema);

app.get("/snacks", (req, res) => {
  Recipes.find((err, foundrecipes) => {
    if (!err) {
      res.send(foundrecipes);
    } else {
      res.send("Error while fetching Api");
    }
  });
});

app.get("/foods", (req, res) => {});

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/profile", upload.single("avatar"), (req, res) => {
  console.log(req.file);
});
let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is running");
});

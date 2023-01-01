const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/users.js");
const articleRoutes = require("./routes/articles.js");
const authToken = require("./middlewares/authToken");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const app = express();
dotenv.config();

app.use(cors());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use("/user/posts", authToken);

app.use("/", postRoutes);
app.use("/", articleRoutes);
app.use("/", userRoutes);

mongoose.set("strictQuery", false);
const PORT = process.env.PORT || 5000;

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

main()
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Connected to server", PORT);
});

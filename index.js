const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/posts.js");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", postRoutes);

mongoose.set("strictQuery", false);

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://random:random123@cluster0.w0bqo42.mongodb.net/?retryWrites=true&w=majority"
  );
};

main()
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Connected to server");
});

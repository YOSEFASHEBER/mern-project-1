const express = require("express");
const { connectDB } = require("./config/db");
const productRouter = require("../routes/product.route");
const path = require("path");

require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const dir = path.resolve();
app.use(express.json());
app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dir, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dir, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`server started on port ${port}`);
});

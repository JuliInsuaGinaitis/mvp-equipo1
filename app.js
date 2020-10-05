const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  let file = path.resolve("views/index.html");
  res.sendFile(file);
});

app.get("/login", function (req, res) {
  let file = path.resolve("views/login.html");
  res.sendFile(file);
});

app.get("/register", function (req, res) {
  let file = path.resolve("views/register.html");
  res.sendFile(file);
});

app.get("/productCart", function (req, res) {
  let file = path.resolve("views/productCart.html");
  res.sendFile(file);
});

app.get("/productDetail", function (req, res) {
  let file = path.resolve("views/productDetail.html");
  res.sendFile(file);
});

app.get("*", (req, res) => {
  if (req.url.endsWith(".css")) {
    let file = path.resolve("style" + req.url);
    return res.sendFile(file);
  }
  let images = ["jpg", "jpeg", "gif", "png", "svg"];
  let ext = req.url.split(".")[1];
  if (images.includes(ext)) {
    let file = path.resolve("img" + req.url);
    return res.sendFile(file);
  }
});

app.listen(3000, () => console.log("Server running on port 3000.."));

// to test apis postman link - https://www.getpostman.com/collections/533015b93c10f9899037
// I didn't made routes/controllers folder as it is small project.

const express = require("express");
const {
  addUser,
  updateUser,
  deleteUser,
  getUser,
  login,
  auth,
} = require("./controllers");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", addUser);

app.patch("/user", updateUser);

app.delete("/user", deleteUser);

app.get("/user", getUser);

app.post("/login", login);

app.get("/islogin", auth, (req, res) => {
  res.json("logged in");
});

app.use((err, req, res, next) => {
  res.status(400).json({ message: err.message });
  console.log(err);
});

app.listen(3000);

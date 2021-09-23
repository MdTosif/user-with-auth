const Jwt = require("jsonwebtoken");
const { userModel } = require("./models/user");
const jwtSecret = "secret";

exports.addUser =  async (req, res, next) => {
    try {
      const { username, password, fullName, email } = req.body;
      const data = {};
      if (!username) throw new Error("username required");
      if (!password) throw new Error("password required");
      if (username) data.username = username;
      if (password) data.password = password;
      if (fullName) data.fullName = fullName;
      if (email) data.email = email;
      const newUser = await new userModel(data).save();
      res.send(newUser);
    } catch (e) {
      next(e);
    }
  }

exports.deleteUser = async (req, res, next) => {
    try {
      const { id } = req.body;
      if (!id) throw new Error("id required");
      const response = await userModel.deleteOne({ _id: id });
      res.send(response);
    } catch (e) {
      next(e);
    }
  }

exports.updateUser = async (req, res, next) => {
    try {
      const { username, password, fullName, email, id } = req.body;
      const data = {};
      if (!id) throw new Error("id required");
      if (username) data.username = username;
      if (password) data.password = password;
      if (fullName) data.fullName = fullName;
      if (email) data.email = email;
      const response = await userModel.updateOne({ _id: id }, { $set: data });
      res.send(response);
    } catch (e) {
      next(e);
    }
  }

exports.getUser =  async (req, res, next) => {
    try {
      const { username, fullName, email, id } = req.query;
      const data = {};
      if (id) data._id = id;
      if (username) data.username = username;
      if (fullName) data.fullName = fullName;
      if (email) data.email = email;
      const response = await userModel.find(data);
      res.send(response);
    } catch (e) {
      next(e);
    }
  }

exports.login =  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const data = {};
      if (!username) throw new Error("username required");
      if (!password) throw new Error("password required");
      if (username) data.username = username;
      if (password) data.password = password;
      let userData = await userModel.find(data).lean();
      console.log(userData);
      if (!userData) throw new Error("invalid username/password");
      userData = userData[0];
      const token = await Jwt.sign({ id: userData._id }, jwtSecret);
      res.json({ token });
    } catch (e) {
      next(e);
    }
  }

exports.auth = async (req, res, next) => {
    try {
      const token = req.headers.token;
      console.log(token);
      if (!token) throw new Error("please add token in header");
      const {id} = await Jwt.verify(token, jwtSecret);
      // console.log(data);
      // const { id } = JSON.parse(data);
      req.id = id;
      next();
    } catch (e) {
      next(e);
    }
  };
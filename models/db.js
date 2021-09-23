const mongoose = require("mongoose");

const mongodbURI = process.env.MONGO_URI || "mongodb://localhost/userdb";

mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

mongoose.connection.on("connecting", () => {
  console.log("trying to establish a connection to mongo");
});

mongoose.connection.on("connected", () => {
  console.log("connection established successfully");
});

mongoose.connection.on("error", (err) => {
  console.log(`connection to mongo failed ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongo db connection closed");
});

module.exports = mongoose;

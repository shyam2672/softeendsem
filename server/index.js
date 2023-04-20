const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const userModel = require()
const bodyParser=require("body-parser");
const User = require("./models/userModel");

// const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
const app = express();
// const socket = require("socket.io");
require("dotenv").config();
const authRoutes = require("./routes/userRoutes");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

// // user1 =  User.
// run1();

//  async function run1 () {
//   // console.log(req.body);
//     try {
//       const username="raj12345";
//       const email="raj12345";
//       const password="raj12345678";
//       const gender="female";

//       const user = await User.create({
//         email,
//         username,
//         gender,
//         password,
//         // password: hashedPassword,
//       });
//   console.log(user);

//       // delete user.password;
//       // return res.json({ status: true, user });
//     } catch (ex) {
//       console.log(ex);
//       // next(ex);
//     }
// };
// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });

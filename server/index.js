const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const userModel = require()
const bodyParser = require("body-parser");
const User = require("./models/userModel");
const socket = require("socket.io");
const utils = require("./utils.js");
const uniqueID = require("uniqid");
const messageRoutes = require("./routes/messages");
// require("./globals.js");

// const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
const app = express();
// const socket = require("socket.io");
require("dotenv").config();
const authRoutes = require("./routes/userRoutes");
const { off } = require("./models/friendrequests");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.json());
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/auth", authRoutes);


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

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = [];
global.randomonlineUsers = [];
global.availableUsers = [];
global.rooms = [];
global.queue = [];
const offlineMessages = {};

io.on("connection", (socket) => {
  global.chatSocket = socket;
  // console.log("user connected");
  // console.log(randomonlineUsers);
  socket.on("add-user", (userId) => {
    // console.log(userId);

    // console.log(userId.userId);
    onlineUsers[userId.userId] = socket.id;
    // console.log(onlineUsers);

    const messages = offlineMessages[userId.userId];
    // console.log(messages);
    // if (messages && messages.length > 0) {
    //   socket.emit("offlineMessages", { ashishrajprashantshyam: messages });
    //   delete offlineMessages[userId.userId];
    // }
    // console.log(onlineUsers);
  });

  socket.on("send-msg", (data) => {
    // console.log(data.to);

    // const sendUserSocket = onlineUsers[data.to];

    // console.log(data);
    // console.log(sendUserSocket);

    // console.log(sendUserSocket);
    // console.log(data.to);
    // if (sendUserSocket) {
      socket.broadcast.emit("msg-recieve", {
        message: data.message,
        from: data.from,
        to: data.to,
      });
    // } else {
    //   if (!offlineMessages[data.to]) {
    //     offlineMessages[data.to] = [];
    //   }
    //   offlineMessages[data.to].push({
    //     prashantrajprashantshyam: `"${data.from}"`,
    //     shyamrajprashantshyam: `"${data.message}"`,
    //   });
    //   console.log(offlineMessages[data.to]);
    // }
  });

  let windowID = socket;
  socket.emit("wait", {
    message: "Please wait...connecting you to stranger!",
  });
  //push the user to avilable users list
  availableUsers.push(socket);
  let resolveAfter5Seconds = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 5000);
    });
  };
  async function asyncCall() {
    let result = await resolveAfter5Seconds();

    //get index of randomly selected user from the available users list
    let selected = Math.floor(Math.random() * availableUsers.length);
    //store the user in Socket
    let socketsel = availableUsers[selected];

    //remove the randomly selected user from the available users list
    availableUsers.splice(selected, 1);

    // Make a user object and add it to the onlineUsers list and rooms too(maybe we can add to room once we have the partner.)
    // create an unique id here.
    // let uID = uniqueID();
    // console.log(uID);
    // rooms.push({ "roomID": uID, "isFilled": false });
    // // Maintain a global room array which would store the room ids.
    // socket.join(uID);
    // // emit the room id to the frontend side.
    // socket.emit('private ack', { "message": "Added to privateRoom", "roomID": uID });
    // socket.emit("ack", { id: socket.id, msg: "User connected" });
    // randomonlineUsers.push(socket);

    socket.on("privateRoom", (user) => {
      // console.log(user);
      let unfilledRooms = rooms.filter((room) => {
        if (!room.isFilled) {
          return room;
        }
      });

      // console.log(unfilledRooms);
      try {
        // join the existing room.
        socket.join(unfilledRooms[0].roomID);
        let index = rooms.indexOf(unfilledRooms[0]);
        rooms[index].isFilled = true;
        unfilledRooms[0].isFilled = true;
        unfilledRooms[0].user2 = user;
        // console.log(rooms);
        socket.emit("private ack", {
          message: "Added to privateRoom",
          roomID: unfilledRooms[0].roomID,
          isfilled: true,
        });
        socket.roomID = unfilledRooms[0].roomID;
        io.sockets.in(socket.roomID).emit("strangerConnected", {
          message: "You are connected with a stranger!",
          user1: unfilledRooms[0].user1,
          user2: user,
        });
      } catch (e) {
        // dont have unfilled rooms. Thus creating a new user.
        let uID = uniqueID();
        rooms.push({ roomID: uID, isFilled: false, user1: user, user2: "" });
        socket.join(uID);
        socket.roomID = uID;
        // console.log(rooms);

        socket.emit("private ack", {
          message: "Added to privateRoom",
          roomID: uID,
          isfilled: false,
        });
      }
    });
  }
  // socket.on("randomconnect", (data) => {
  asyncCall();
  // });
  // console.log("sdfrwsd");

  socket.on("sendMessage", (data) => {
    // let timeStamp = moment().format("LT");
    // console.log(data);
    io.sockets.in(data.room_id).emit("newMessage", {
      message: data.message,
      senderId: data.from,
      roomID: data.room_id,
      // timeStamp: timeStamp,
    });
  });

  socket.on("sendrequest", (data) => {
    // console.log(data);
    io.sockets.in(data.room).emit("receiverequest", {
      sendersocketId: windowID.id,
      senderid: data.from,
    });
  });

  socket.on("respondrequest", (data) => {
    io.sockets.in(data.room).emit("requestresponse", {
      sendersocketId: windowID.id,
      senderid: data.from,
      response: data.response,
    });
  });

  socket.on("disconnectprivate", (data) => {
    delete onlineUsers[data.userid];
  });

  // Disconnect the user
  socket.on("disconnectRandom", (data) => {
    // console.log("yes");
    let index = randomonlineUsers.indexOf(socket);
    randomonlineUsers.splice(index, 1);
    index = rooms.findIndex((x) => x.roomID == windowID.roomID);
    if (index >= 0) {
      if (rooms[index].isFilled == true) {
        let warning = {
          title: "Stranger is disconnected!",
          message: "Please click on 'New' button to connect to someone else.",
        };
        io.sockets.in(windowID.roomID).emit("alone", {
          warning: warning,
          roomID: windowID.roomID,
          randomid: data.userid,
        });
        rooms.splice(index, 1);
      } else {
        rooms.splice(index, 1);
      }
    }
  });
});
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

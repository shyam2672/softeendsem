const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    // console.log(messages);
    if (messages.length === 0) {
      return res.json({ status: false });
    }
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    // console.log(projectedMessages);

    res.json({ messages: projectedMessages, status: true });
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    // console.log(req.body);

    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    // console.log(data);
    if (data)
      return res.json({ msg: "Message added successfully.", status: "sent" });
    else
      return res.json({
        msg: "Failed to add message to the database",
        status: "not sent",
      });
  } catch (ex) {
    next(ex);
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const deletedCount = await Message.deleteMany({
      users: { $all: [from, to] },
    });

    if (deletedCount >= 0)
      return res.json({
        msg: "Messages deleted  successfully.",
        status: "deleted",
      });
    else
      return res.json({
        msg: "Failed to delete messages ",
        status: "not deleted",
      });
  } catch (ex) {
    next(ex);
  }
};

const Chat = require("../models/chatModel");
const { io } = require("../index"); // Adjust the path if necessary

const createUser = async (req, res) => {
  try {
    if (!req.body || !req.body.name || !req.body.password)
      return res
        .status(400)
        .json({ message: "Request body is missing name or password" });
    const { name, password } = req.body;
    const data = await Chat.newUser(name, password);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    if (!req.body || !req.body.name || !req.body.password)
      return res
        .status(400)
        .json({ message: "Request body is missing name or password" });
    const { name, password } = req.body;
    const result = await Chat.userLogin(name, password);
    if (result.error) {
      return res.status(401).json({ error: result.error });
    } else {
      return res
        .status(200)
        .json({ message: "Login successful", user: result.user });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const saveMessage = async (req, res) => {
  try {
    if (
      !req.body.message_id ||
      !req.body.sender_id ||
      !req.body.receiver_id ||
      !req.body.message
    ) {
      return res.status(400).json({
        message:
          "Request body is missing message_id || sender_id || receiver_id || message",
      });
    }
    const {
      message_id,
      sender_id,
      receiver_id,
      message,
      timestamp,
      group_id,
      group_type,
    } = req.body;
    const result = await Chat.saveMessage(
      message_id,
      sender_id,
      receiver_id,
      message,
      timestamp,
      group_id,
      group_type
    );
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const messagelist = async (req, res) => {
  try {
    const { page } = req.params;
    const result = await Chat.messagelist(page);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, userLogin, saveMessage, messagelist };

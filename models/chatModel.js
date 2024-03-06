const db = require("./dbConnection");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const crc = require("crc");
const { password } = require("../config/dbConfig");
const { io } = require("../index");

const newUser = async (name, password) => {
  try {
    const existingUser = await db.query("SELECT id FROM users WHERE name = ?", [
      name,
    ]);
    if (existingUser.length > 0) {
      throw new Error("Name already exists");
    }
    const id = uuidv4();
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const sql = "INSERT INTO users (id, name, password) VALUES (?,?,?)"; // SQL query to insert a new user
    const result = await db.query(sql, [id, name, hashedPassword]); // Execute the query with the user's name
    return result;
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
};

const userLogin = async (name, password) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE name = ?", [name]);
    if (user && user.length > 0) {
      const hashedPassword = user[0].password;
      if (bcrypt.compareSync(password, hashedPassword)) {
        console.log("Authentication successful");
        return { user: user[0] }; // Return the user object
      } else {
        // Incorrect password
        return { error: "Incorrect password" };
      }
    } else {
      // User not found
      return { error: "User not found" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { error: "An error occurred" };
  }
};

const saveMessage = async (
  message_id,
  sender_id,
  receiver_id,
  message,
  timestamp,
  group_id,
  group_type
) => {
  try {
    // Convert timestamp to MySQL format (YYYY-MM-DD HH:MM:SS)
    const formattedTimestamp = new Date(timestamp)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const sql =
      "INSERT INTO message (message_id, sender_id, receiver_id, message, timestamp, group_id, group_type) VALUES (?,?,?,?,?,?,?)";
    const result = await db.query(sql, [
      message_id,
      sender_id,
      receiver_id,
      message,
      formattedTimestamp,
      group_id,
      group_type,
    ]);
    return result;
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

const messagelist = async (page) => {
  try {
    const PAGE_SIZE = 10; // Number of messages per page
    const offset = (page - 1) * PAGE_SIZE; // Calculate offset based on the current page

    const sql = `
      SELECT *
      FROM message
      ORDER BY timestamp DESC
      LIMIT ${PAGE_SIZE} OFFSET ${offset};
    `;

    const messages = await db.query(sql);
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

module.exports = { newUser, userLogin, saveMessage, messagelist };

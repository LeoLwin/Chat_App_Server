const router = require("express").Router();
const {
  createUser,
  userLogin,
  saveMessage,
  messagelist,
} = require("../controllers/chatController");

router.route("/create").post(createUser);
router.route("/login").post(userLogin);
router.route("/saveMessage").post(saveMessage);
router.route("/messageList/:page").get(messagelist);

module.exports = router;

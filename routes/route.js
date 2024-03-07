const router = require("express").Router();
const {
  createUser,
  userLogin,
  saveMessage,
  filterMessagelist,
  messageList,
} = require("../controllers/chatController");

router.route("/create").post(createUser);
router.route("/login").post(userLogin);
router.route("/saveMessage").post(saveMessage);
router.route("/filterMessagelist/:page").get(filterMessagelist);
router.route("/messagelist").get(messageList);

module.exports = router;

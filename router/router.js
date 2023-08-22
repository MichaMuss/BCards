const express = require("express");
const cardsRestController = require("../cards/routes/cardsRestController");
const usersRestController = require("../users/routes/UsersRestController");
const { handleError } = require("../utils/handleErrors");
const router = express.Router();

router.use("/cards", cardsRestController);
router.use("/users", usersRestController);

router.use((req, res) => {
  handleError(res, 404, "Path not found");
});

module.exports = router;

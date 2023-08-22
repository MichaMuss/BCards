const express = require("express");
const { handleError } = require("../../utils/handleErrors");
//const { generateUserPassword } = require("../helpers/bcrypt");
const normalizeUser = require("../helpers/normalizeUser");
const auth = require("../../auth/authService");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changeUserBusinessStatus,
  deleteUser,
  toggleLockUser,
  renewPassword,
} = require("../models/usersAccessDataService");
const {
  validateRegistration, validatePassword,
} = require("../validations/userValidationService");
const { generateUserPassword } = require("../helpers/bcrypt");
const { getMyCards } = require("../../cards/models/cardsAccessDataService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let user = req.body;

    const { error } = validateRegistration(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    user = normalizeUser(user);
    user.password = generateUserPassword(user.password);
    user = await registerUser(user);
    return res.status(201).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = req.body;
    const token = await loginUser(user);
    return res.send(token);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/locker/:id", auth, async(req ,res) => {
  try{
    const { id } = req.params;
    let user = req.user;
    if(!user.isAdmin)
      return handleError(res, 403,
        "Authorization Error: You must be an admin user to perform this operation"
      );
      const toggledUser =  await toggleLockUser(id);
      
      return res.send(toggledUser);
  }catch(error){
      return handleError(res,error.status || 500, error.message)
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = req.user;
    if (!user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );

    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    let profileUser = await getUser(userId);
    let userCards = await getMyCards(userId);
    const profile= {...profileUser, cards: userCards,}
    return res.send(profile);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let _id = req.user._id;
    let isAdmin = req.user.isAdmin;

    if (_id !== id && !isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user or the registered user to see this user details"
      );

    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let user = req.body;
    let userInfo = req.user;
    if (!userInfo.isAdmin && userInfo._id != id) {
      handleError(
        res,
        403,
        "You can not edit user details if its not you or you not admin"
      );
    }
    user = normalizeUser(user);
    user = await updateUser(id, user);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/password/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let userInfo = req.user;
    const { password } = req.body;

    if (!userInfo.isAdmin && userInfo._id != id) {
      handleError(
        res,
        403,
        "You can not edit user details if its not you or you not admin"
      );
    }
    
    const { error } = validatePassword(password);

    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const encPass = generateUserPassword(password);

    const p = await renewPassword(id, encPass);

    return res.send(p);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let userInfo = req.user;
    if (!userInfo.isAdmin && userInfo._id != id) {
      handleError(
        res,
        403,
        "You can not edit user details if its not you or you not admin"
      );
    }
    
    const user = await changeUserBusinessStatus(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let userInfo = req.user;
    if (!userInfo.isAdmin && userInfo._id != id) {
      handleError(
        res,
        403,
        "You can not delete user if its not you or you not admin"
      );
    }
    const user = await deleteUser(id);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;

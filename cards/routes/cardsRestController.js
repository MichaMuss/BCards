const express = require("express");
const { handleError } = require("../../utils/handleErrors");
const {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
  getCardWithUserId,
} = require("../models/cardsAccessDataService");
const normalizeCard = require("../helpers/normalizeCard");
const validateCard = require("../validation/cardValidationService");
const auth = require("../../auth/authService");
const optionalAuth = require("../../auth/optionalAuth");
const router = express.Router();

router.get("/" ,optionalAuth,async (req, res) => {
  try {
    const cards = await getCards();
    cards.forEach(crd => {
        if(crd.user_id!=req.user?.id)
          crd.user_id="";
    });
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const card = await getMyCards(userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let card = req.body;
    const user = req.user;

    if (!user.isBusiness)
      return handleError(res, 403, "Authentication Error: Unauthorize user");

    const errorMessage = validateCard(card);
    if (errorMessage)
      return handleError(res, 400, "Validation error: " + errorMessage);

    card = await normalizeCard(card, user._id);

    card = await createCard(card);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let card = req.body;
    const cardId = req.params.id;
    const user = req.user;

    const storedCard = await getCardWithUserId(cardId);

    if(!storedCard)
      return handleError(res, 404,"Card not found");

    const userId = storedCard.user_id;
    
    if (user._id !== userId.toString() && !user.isAdmin) {
      const message =
        "Authorization Error: Only the user who created the business card can update its details";
      return handleError(res, 403, message);
    }

    const errorMessage = validateCard(card);
    if (errorMessage)
      return handleError(res, 400, "Validation error: " + errorMessage);

    card = await normalizeCard(card, userId);
    card = await updateCard(cardId, card);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const favId = req.user.favoriteIdentifier;
    const card = await likeCard(cardId, favId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const user = req.user;
    const card = await deleteCard(cardId, user);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;

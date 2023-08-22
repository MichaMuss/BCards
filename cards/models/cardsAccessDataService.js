const config = require("config");
const { createError } = require("../../utils/handleErrors");
const Card = require("./mongodb/card");

const DB = config.get("DB");

const createCard = async (normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      let card = new Card(normalizedCard);
      await card.save();
      return Promise.resolve(card);
    } catch (error) {
      return createError("Mongoose", error);
    }
  } else {
    Promise.resolve("get cards not in mongodb");
  }
};

const getCards = async () => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      return createError("Mongoose", error);
    }
  } else {
    Promise.resolve("get cards not in mongodb");
  }
};

const getCard = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findById(cardId,{user_id: 0});
      if (!card) throw new Error("Could not find this card in the database");
      return Promise.resolve(card);
    } catch (error) {
      return createError("Mongoose", error);
    }
  } else {
    Promise.resolve("get cards not in mongodb");
  }
};

const getCardWithUserId = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      const card = await Card.findById(cardId);
      if (!card) throw new Error("Could not find this card in the database");
      return Promise.resolve(card);
    } catch (error) {
      return createError("Mongoose", error);
    }
  } else {
    Promise.resolve("get cards not in mongodb");
  }
};

const getMyCards = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let cards = await Card.find({ user_id: userId });
      return Promise.resolve(cards);
    } catch (error) {
      return createError("Mongoose", error);
    }
  } else {
    Promise.resolve("get cards not in mongodb");
  }
};

const updateCard = async (cardId, normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findByIdAndUpdate(cardId, normalizedCard, {
        new: true,
      });
      if (!card) {
        throw new Error("The card with this id didnt found");
      }
      return Promise.resolve(card);
    } catch (error) {
      return createError("Mongoose", error);
    }
  } else {
    Promise.resolve("get cards not in mongodb");
  }
};

const likeCard = async (cardId, favId) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);
      if (!card)
        throw new Error("A card with this ID cannot be found in the database");
      if (card.likes.includes(favId)) {
        card = await Card.findByIdAndUpdate(
          cardId,
          { $pull: { likes: favId } },
          { new: true }
        );
      } else {
        card = await Card.findByIdAndUpdate(
          cardId,
          { $push: { likes: favId } },
          { new: true }
        );
      }
      return Promise.resolve(card);
    } catch (error) {
      return createError("Mongoose", error);
    }
  } else {
    Promise.resolve("get cards not in mongodb");
  }
};

const deleteCard = async (cardId, user) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);

      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      if (!user.isAdmin && user._id !== card.user_id.toString())
        throw new Error(
          "Authorization Error: Only the user who created the business card or admin can delete this card"
        );
      card = await Card.findByIdAndDelete(cardId);
      return Promise.resolve(card);
    } catch (error) {
      return createError("Mongoose", error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

exports.deleteCard = deleteCard;
exports.createCard = createCard;
exports.getCards = getCards;
exports.getCard = getCard;
exports.getCardWithUserId = getCardWithUserId;
exports.getMyCards = getMyCards;
exports.updateCard = updateCard;
exports.likeCard = likeCard;

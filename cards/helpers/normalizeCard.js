const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (card, userId) => {
  const image = {
    alt: card.image.alt || "Business card image",
    url:
      card.image.url ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
  };
  return {
    ...card,
    image: image,
    address: {
      ...card.address,
      state: card.address.state || "",
    },
    bizNumber: card.bizNumber || (await generateBizNumber()),
    user_id: userId,
  };
};

module.exports = normalizeCard;

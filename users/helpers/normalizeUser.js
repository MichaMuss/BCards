const DEFAULT_AVATAR_URL = "http://127.0.0.1:3000/assets/images/avatar.png";
const config = require("config");
const siteUrl = config.get("defaultSiteUrl");
const normalizeUser = (rawUser) => {
  const name = { ...rawUser.name, middle: rawUser.name.middle || "" };
  const image = {
    ...rawUser.image,
    url:
      rawUser.image.url || siteUrl + "/assets/images/avatar.png",
    alt: rawUser.image.alt || "User image",
  };
  const address = {
    ...rawUser.address,
    state: rawUser.address.state || "not defined",
  };
  const user = {
    ...rawUser,
    name,
    image,
    address,
  };

  return user;
};

module.exports = normalizeUser;

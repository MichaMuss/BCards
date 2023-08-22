const config = require("config");
const morganLogger = require("./loggers/morganLogger");

const LOGGER = config.get("LOGGER");

let usedLogger;
if (LOGGER === "morgan") {
  usedLogger = morganLogger;
}

module.exports = usedLogger;

const fs = require("fs");

function logMessage(message) {
  if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
  }

  fs.appendFileSync(
    "logs/github-execution.log",
    `${new Date().toISOString()} - ${message}\n`
  );
}

module.exports = logMessage;

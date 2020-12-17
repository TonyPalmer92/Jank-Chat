const dayjs = require("dayjs")();

function formatMessage(username, msg, msg_theme) {
  return {
    username,
    msg,
    msg_theme,
    time: dayjs.format("h:mm a"),
  };
}

module.exports = {
  formatMessage,
};

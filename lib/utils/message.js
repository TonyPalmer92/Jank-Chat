const dayjs = require("dayjs")();

function formatMessage(username, msg = null, msg_theme = "is-dark") {
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

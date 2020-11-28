const axios = require("axios");
const { cleanData } = require("../../lib/utils");

const endpoint = process.env.API_ENDPOINT;

/*
===============================================
*/

async function postMessage(req, res) {
  const data = cleanData(req.body);

  try {
    await axios
      .post(`${endpoint}/api/v1/message`, data)
      .then((result) => console.log("Result:", result.data.msg));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  postMessage,
};

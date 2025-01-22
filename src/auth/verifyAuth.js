const { findApiKey } = require("../services/apiKey");


const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const verifyApiKey = async (req, res, next) => {
  try {
    const key = req.get(HEADER.API_KEY);
    if (!key) {
      return res.status(403).json({
        error: "API key is required",
      });
    }
    const objectKey = await findApiKey(key);
    if (objectKey) {
      return res.status(403).json({
        error: "API key is required",
      });
    }
    req.objectKey = objectKey;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { verifyApiKey };

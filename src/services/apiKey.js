const APIKey = require('../models/apiKey');

const findApiKey = async (apiKey) => {
  const objectKey = await APIKey.findOne({ key: apiKey, status: true }).lean();
  return objectKey;
};

module.exports = { findApiKey };

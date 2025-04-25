require('dotenv').config();

const config = {
  JWT_SECRET: process.env.JWT_SECRET || '', // Default to an empty string if not set
   OPENAI_API_KEY: process.env.OPENAI_API_KEY || '', // Default to an empty string if not set


};

// Use CommonJS export
module.exports = config;

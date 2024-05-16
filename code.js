const crypto = require("crypto");

// Generate a random secret key of sufficient length (e.g., 32 characters)
const secretKey = crypto.randomBytes(32).toString("hex");

console.log("Generated secret key:", secretKey);

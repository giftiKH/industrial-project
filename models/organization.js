const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  fax: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["AACEB", "sub-city", "private-school", "public-school"], // Allowed organization types
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Organization", organizationSchema);

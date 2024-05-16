// controllers/organizationController.js
const Organization = require("../models/Organization");

// Add organization
exports.addOrganization = async (req, res) => {
  try {
    const organization = new Organization(req.body);
    await organization.save();
    res.status(201).json({ success: true, organization });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Edit organization
exports.editOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!organization) {
      return res
        .status(404)
        .json({ success: false, message: "Organization not found" });
    }
    res.json({ success: true, organization });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete organization
exports.deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await Organization.findByIdAndDelete(id);
    if (!organization) {
      return res
        .status(404)
        .json({ success: false, message: "Organization not found" });
    }
    res.json({ success: true, message: "Organization deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json({ success: true, organizations });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// controllers/organizationController.js

// Other controller functions...

// Get organizations by type
exports.getOrganizationsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const organizations = await Organization.find({ type });
    res.json({ success: true, organizations });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


exports.getOrganizationsByParent = async (req, res) => {
  try {
    const { parentId } = req.params;
    const organizations = await Organization.find({ parent: parentId });
    res.json({ success: true, organizations });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
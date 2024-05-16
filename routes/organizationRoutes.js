// routes/organizationRoutes.js
const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");

// Add organization
router.post("/add", organizationController.addOrganization);

// Edit organization
router.put("/:id", organizationController.editOrganization);

// Delete organization
router.delete("/:id", organizationController.deleteOrganization);

// Get all organizations
router.get("/organizations", organizationController.getAllOrganizations);

// Get organizations by type
router.get('/:type', organizationController.getOrganizationsByType);

// Get organizations by parent
router.get("/parent/:parentId", organizationController.getOrganizationsByParent);



module.exports = router;

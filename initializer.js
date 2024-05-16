const bcrypt = require("bcrypt");
const Organization = require("./models/Organization");
const User = require("./models/user");

async function initializeAACEB() {
  try {
    let aacebOrg = await Organization.findOne({ name: "AACEB" });
    if (!aacebOrg) {
      aacebOrg = new Organization({
        name: "AACEB",
        email: "aaceb@example.com",
        phone: "1234567890",
        fax: "1234567890",
        location: "AACEB Location",
        type: "AACEB",
      });
      await aacebOrg.save();
      console.log("AACEB organization initialized");
    } else {
      console.log("AACEB organization already exists");
    }
    return aacebOrg._id; // Return the ID of the AACEB organization
  } catch (error) {
    console.error("Error initializing AACEB organization:", error);
    throw error;
  }
}

async function initializeSuperAdmin() {
  try {
    const aacebOrgId = await initializeAACEB();
    const existingUser = await User.findOne({
      role: "super-admin",
      organization: aacebOrgId,
    });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("superadminpassword", 10); // Hash the password
      const superAdminUser = new User({
        organization: aacebOrgId,
        full_name: "Super Admin",
        email: "superadmin@example.com",
        password: hashedPassword, // Save the hashed password
        phone: "1234567890", 
        role: "super-admin",
      });
      await superAdminUser.save();
      console.log("Super Admin user initialized");
    } else {
      console.log("Super Admin user already exists");
    }
  } catch (error) {
    console.error("Error initializing Super Admin user:", error);
  }
}

async function initializeServer() {
  await initializeSuperAdmin();
}

module.exports = initializeServer;

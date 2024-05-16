const bcrypt = require("bcrypt");
const User = require("../models/user");

function isValidRole(role) {
  const validRoles = [
    "super-admin",
    "AACEB-staff",
    "admin",
    "sub-city-staff",
    "school-admin",
  ];
  return validRoles.includes(role);
}

// Add user
async function addUser(req, res) {
  try {
    const { created_by, role, ...userData } = req.body;

    // Ensure the role is valid
    if (!isValidRole(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create the user with hashed password
    const user = new User({ ...userData, password: hashedPassword, role });

    // Optionally set the creator
    if (created_by) {
      user.created_by = created_by;
    }

    await user.save();
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// Edit user
async function editUser(req, res) {
  try {
    const { id } = req.params;
    const { role, password, ...userData } = req.body;

    // Retrieve the current user's role from the request
    const currentUserRole = req.user.role;

    // Check if the current user's role has permission to edit the user's role
    if (role && currentUserRole !== "super-admin") {
      return res
        .status(403)
        .json({ success: false, message: "Permission denied" });
    }

    // Check if the new role is valid
    if (role && !isValidRole(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    // Hash the new password if it's being updated
    if (password) {
      userData.password = await bcrypt.hash(password, 10);
    }

    // Proceed with updating the user
    const user = await User.findByIdAndUpdate(
      id,
      { ...userData, role },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// Delete user
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

// Get user by ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

module.exports = {
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  getUserById,
};

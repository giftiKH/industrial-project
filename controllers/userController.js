const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token with user ID and role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "default_jwt_secret",
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return user information and token with success message
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        organization: user.organization,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        created_by: user.created_by,
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Logout function
function logoutUser(req, res) {
  // Since JWT tokens are stateless, logging out typically involves invalidating the token on the client side
  // You can simply send a success response back to the client indicating that the logout was successful
  res.status(200).json({ message: "Logout successful" });
}

// Get users by organization
async function getUsersByOrganization(req, res) {
  try {
    const { organizationId } = req.params;
    const users = await User.find({ organization: organizationId });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users by organization:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

// Get users by role
async function getUsersByRole(req, res) {
  try {
    const { role } = req.params;
    const users = await User.find({ role });
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users by role:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

module.exports = {
  loginUser,
  logoutUser,
  getUsersByOrganization,
  getUsersByRole,
};

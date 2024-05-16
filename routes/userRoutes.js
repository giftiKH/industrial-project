const express = require("express");
const router = express.Router();
const {
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userCRUDController");

const { loginUser, logoutUser } = require("../controllers/userController");
const {
  verifyToken,
  checkPermissions,
} = require("../middleware/authenticateJWT");

// Login and logout routes (public routes)
router.post("/login", loginUser);
router.post("/logout", logoutUser);
// Apply authentication middleware to routes that require authentication
router.use(verifyToken);

// Routes with role-based permissions
router.post(
  "/add",
  checkPermissions({
    post: ["super-admin", "admin"],
    "super-admin": ["super-admin"],
    admin: ["super-admin"],
    "AACEB-staff": ["super-admin"],
    "school-admin": ["admin"],
    "sub-city-staff": ["admin"],
  }),
  addUser
);

router.put(
  "/:id",
  checkPermissions({ put: ["super-admin", "admin"] }),
  editUser
);
router.delete(
  "/:id",
  checkPermissions({ delete: ["super-admin", "admin"] }),
  deleteUser
);
router.get(
  "/all-users",
  checkPermissions({ get: ["super-admin", "admin"] }),
  getAllUsers
);
router.get(
  "/:id",
  checkPermissions({ get: ["super-admin", "admin"] }),
  getUserById
);

module.exports = router;

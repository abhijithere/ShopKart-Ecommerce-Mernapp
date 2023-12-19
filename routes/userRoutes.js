import express from 'express';
import { authorizeRoles, isAuthenticatedUser } from "../utils/auth.js";
import { LogoutUser, deleteUserProfile, forgotPassword, getAllUser, getSingleUser, getUserDetails, loginUser, registerUser, resetPassword, updatePassword, updateProfile, updateUserRole } from '../controllers/UserController.js';
const router =express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/password/forgotpassword").post(forgotPassword)


router.route("/password/reset/:token").put(resetPassword)

router.route("/me").get(isAuthenticatedUser,getUserDetails)

router.route("/password/update").put(isAuthenticatedUser,updatePassword)

router.route("/me/update").put(isAuthenticatedUser,updateProfile)


router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser)
router.route("/admin/users/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser).put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUserProfile)



router.route("/logout").get(LogoutUser)






export default router
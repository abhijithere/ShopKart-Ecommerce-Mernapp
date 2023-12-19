import express from "express"
import { UpdateProduct, createProduct, createProductReview, deleteProduct, deleteReview, getAdminProducts, getAllProducts, getProsductDetails, getProsductReviews } from "../controllers/productController.js";
import { authorizeRoles, isAuthenticatedUser } from "../utils/auth.js";
const router =express.Router();



router.route("/products").get(getAllProducts);

router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),UpdateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
 
router.route("/products/:id").get(getProsductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews").get(getProsductReviews).delete(isAuthenticatedUser,deleteReview)


export default router
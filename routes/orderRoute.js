import express from 'express'
import { authorizeRoles, isAuthenticatedUser } from "../utils/auth.js";
import { deleteOrder, getOrderDetails, grtAllOrders, myOrders, newOrder, updateOrderStatus } from '../controllers/orderController.js';

const router =express.Router();

router.route("/order/new").post(isAuthenticatedUser,newOrder)

router.route("/order/:id").get(isAuthenticatedUser,getOrderDetails)

router.route("/orders/me").get(isAuthenticatedUser,myOrders)

router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),grtAllOrders)

router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrderStatus).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)


export default router
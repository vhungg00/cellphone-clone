import express from "express";
import {
  createOrder,
  GetAllOrder,
  getOrderById,
  orderIsDelivevered,
  orderIsPaid,
  userLoginOrders,
} from "../controllers/OrderController.js";
import { protect } from "../untils/until.js";

const OrderRouter = express.Router();

OrderRouter.post("/create", protect, createOrder);
OrderRouter.get("/all", protect, GetAllOrder);
OrderRouter.get("/", protect, userLoginOrders);
OrderRouter.get("/order_detail",protect, getOrderById);
OrderRouter.put("/:id/pay", protect, orderIsPaid);
OrderRouter.put("/:id/delivered", protect, orderIsDelivevered);

export default OrderRouter;

import express from "express";
import {
  createNewTypeProduct,
  deleteTypeProduct,
  getAllTypeProduct,
} from "../controllers/ListTypeProductController.js";
import  {isAdmin, protect, upload}  from "../untils/until.js";

const ListTypeProductRouter = express.Router();

ListTypeProductRouter.get("/", getAllTypeProduct);
ListTypeProductRouter.post(
  "/create",
  protect,
  isAdmin,
  upload.single("image"),
  createNewTypeProduct
);
ListTypeProductRouter.delete(
  "/delete/:id",
  protect,
  isAdmin,
  deleteTypeProduct
);

export default ListTypeProductRouter;

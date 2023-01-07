import express from "express";
import {
  AddProduct,
  BlogProduct,
  CommentProduct,
  DeleteProduct,
  deleteThumnail,
  filterProductByRandomField,
  filterProductByType,
  getAllProduct,
  getAllProductCategories,
  getProductbyCategory,
  getProductBySlug,
  paginationProduct,
  PinCommentProduct,
  RateProduct,
  RepCommentProduct,
  reviewProductByUser,
  searchProduct,
  UpdateProduct,
  updateThumnail,
} from "../controllers/ProductController.js";
import { isAdmin, isAuth, protect, upload } from "../untils/until.js";

const ProductRouter = express.Router();

ProductRouter.get("/all_product", getAllProduct);
ProductRouter.get("/search", searchProduct);
ProductRouter.get("/category/:slug", getProductbyCategory);
ProductRouter.get("/:slug", getProductBySlug);
ProductRouter.get("/:type", filterProductByType);
ProductRouter.get("/", getAllProductCategories);
ProductRouter.get(`/pagination/:page`, paginationProduct);
ProductRouter.post("/:id/review", protect, reviewProductByUser);

ProductRouter.post("/rate/:id", RateProduct);
ProductRouter.post("/filter/random", filterProductByRandomField);

ProductRouter.post("/comment/:id", CommentProduct);
ProductRouter.post("/pin/comment/:id", PinCommentProduct);
ProductRouter.post("/rep/comment/:id", RepCommentProduct);
ProductRouter.post(
  "/create",
  protect,
  isAdmin,
  upload.single("image"),
  AddProduct
);
ProductRouter.put(
  "/update/:id",
  protect,
  isAdmin,
  upload.single("image"),
  UpdateProduct
);

ProductRouter.post("/blog/:id", isAuth, isAdmin, BlogProduct);

ProductRouter.delete(
  "/delete/:id",
  protect,
  isAdmin,
  upload.single("image"),
  DeleteProduct
);

ProductRouter.post(
  "/thumnail/:id",
  protect,
  isAdmin,
  upload.array("image"),
  updateThumnail
);
ProductRouter.delete(
  "/delete/thumnail/:id",
  protect,
  isAdmin,
  upload.array("image"),
  deleteThumnail
);
export default ProductRouter;

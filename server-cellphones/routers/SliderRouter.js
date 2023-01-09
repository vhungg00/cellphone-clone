import express from "express";
import {
  createNewSlider,
  deleteSlider,
  getAllSlider,
} from "../controllers/SliderController.js";
import { isAdmin, protect, upload } from "../untils/until.js";

const SliderRouter = express.Router();

SliderRouter.get("/", getAllSlider);
SliderRouter.post("/create", protect, isAdmin, upload.single("image"), createNewSlider );
SliderRouter.delete("/delete/:id", protect, isAdmin, deleteSlider);

export default SliderRouter;

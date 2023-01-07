import express from "express";
import {
  createOptionByproperty,
  deleteSelectOption,
  getAllOptionByproperty,
  getSelectOptionById,
  UpdateSelectOption,
} from "../controllers/SelectListController.js";
import { isAdmin, protect } from "../untils/until.js";

const SelectListrouter = express.Router();

SelectListrouter.get("/", getAllOptionByproperty);
SelectListrouter.get("/detail/:id", getSelectOptionById);
SelectListrouter.delete("/delete/:id", protect, isAdmin, deleteSelectOption);
SelectListrouter.post("/create", protect, isAdmin, createOptionByproperty);
SelectListrouter.put("/update/:id", protect, isAdmin, UpdateSelectOption);

export default SelectListrouter;

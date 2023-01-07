import mongoose from "mongoose";

const Schema = mongoose.Schema

const SelectList = new Schema(
  {
    name: String,
    property: String,
    options: Array,
  },
  {
    timestamp: true,
  }
);

export const SelectListModel = mongoose.model("SelectList", SelectList);

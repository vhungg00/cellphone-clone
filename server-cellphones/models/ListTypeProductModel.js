import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ListTypeProductSchema = new Schema(
  {
    name: String,
    img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

export const ListTypeProductModel = mongoose.model(
  "ListTypeproduct",
  ListTypeProductSchema
);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SliderSchema = new Schema(
  {
    name: String,
    img: String,
    cloudinary_id: String,
  },
  {
    timestamps: true,
  }
);

export const SliderModel = mongoose.model(
  "slider",
  SliderSchema
);

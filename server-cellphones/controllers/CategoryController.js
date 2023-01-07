import { CategoryModel } from "../models/CategoryModel.js";
import expressAsyncHandler from 'express-async-handler'
import cloudinary from "cloudinary";

export const createCategory = expressAsyncHandler( async (req, res) => {
    let result = await cloudinary.uploader.upload(req.file.path, {
        folder: "dev_setups",
      })
  const newCategory = new CategoryModel({
    name: req.body.name,
    image: result.secure_url,
    slug: req.body.slug,
    cloudinary_id: result.public_id,
    status: req.body.status,
  });
  try {
    const savedCategory = await newCategory.save();
    res
      .status(200)
      .send({message:'New category create',data: savedCategory});
  } catch (err) {
    res.status(500).json(err);
  }
});


export const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ createdAt: -1 }).exec();
    res.status(200).send({ status: 200, success: true, data: categories, message: 'Gets category successfully'});
  } catch (err) {
    res.status(400).json(err);
  }
};
export const updateCategory = async (req, res) => {
  try {
    await cloudinary.uploader.destroy(product.cloudinary_id);
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
    }
    const updateCat = await CategoryModel.findByIdAndUpdate(req.params._id, {
      ...req.body,
      image: result?.secure_url || product.image,
      cloudinary_id: result?.public_id || product.cloudinary_id
    });
    res.status(200).send({message: success, data: updateCat});
  } catch (err) {
    res.status(203).send({ message: "Update faild" });
  }
};
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categoryproduct = await CategoryModel.findOneAndDelete(req.params._id);
    await cloudinary.uploader.destroy(categoryproduct.cloudinary_id)
    if(categoryproduct){
      await categoryproduct.remove()
      res.status(200).send({ message: "Delete category success!" });
    }else{
      res.send({msg: 'product not found'})
    }
  } catch (err) {
    res.status(203).send({ message: "Delete category faild" });
  }
})

export const get_category = expressAsyncHandler( async (req, res) => {
  try{
    return CategoryModel.find({})
  }catch(error) {
    res.status(400).send({success: false, message: "Error getting category" });
  }
})
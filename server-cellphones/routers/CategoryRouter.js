import express from 'express';
import { createCategory, deleteCategory, getAllCategory } from '../controllers/CategoryController.js';
import  {isAdmin, protect, upload}  from "../untils/until.js";
const CategoryRouter = express.Router();

CategoryRouter.get('/get-allcategory', getAllCategory)
CategoryRouter.post('/add-category',upload.single("image"),  protect, isAdmin, createCategory)
CategoryRouter.delete('/delete-category/:id', protect, isAdmin, deleteCategory)
CategoryRouter.post('/update-category/:id', upload.single("image"),  protect, isAdmin, createCategory)
export default CategoryRouter
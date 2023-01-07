import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
    name: { type: String, required: true},
    image: { type: String },
    slug: {type: String, required: true},
    cloudinary_id: { type: String },
    status: {type: String, default:'Còn bán'}
    },  
    { timestamps: true }
)
export const CategoryModel = mongoose.model('Category', CategorySchema)
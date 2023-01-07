import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


const replieCommentProduct = new Schema({
  content: {type: String},
  isAdmin: Boolean,
  nameUser: {type: String},
  byUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const commentProduct = new Schema({
  author: {type: String},
  status: String,
  isAdmin: Boolean,
  avatar: {type: String},
  content: {type:String},
  byUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  replies: [replieCommentProduct]
})

const image = new Schema({
  url: {type:String},
  title: {type:String},
  cloudinary_id: { type: String}
})

const color = new Schema({
  type:{type:String},
})

const Product = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    type: { type: String, required: true },
    image: { type: String },
    slug: {type: String, required: true},
    descriptions: { type: String},
    images:[image],
    colors: [color],
    category:{type: mongoose.Schema.Types.ObjectId,ref:'Category'},
    amount: Number,
    cloudinary_id: { type: String },
    rating: { type: Number },
    numReviews: { type: Number },
    blog: String,
    reviews: [reviewSchema],
    comments: [commentProduct],
    status: {type: String, default: 'Còn hàng'},
    os: String,
    ram: String,
    battery: String,
    rom: String,
    camera: String,
    special: String,
    design: String,
    screen: String,
  },
  {
    timestamps: true,
  }
);
Product.index({name: 'text'});

export const ProductModel = mongoose.model("Product", Product)
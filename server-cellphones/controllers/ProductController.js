import { ProductModel } from "../models/ProductModel.js";
import { CategoryModel } from "../models/CategoryModel.js";
import expressAsyncHandler from "express-async-handler";
import { PinComment } from "../untils/until.js";
import cloudinary from "cloudinary";
import path from "path";

// Get display getAllProduct categories
export const getAllProductCategories = expressAsyncHandler(
  async (req, res, next) => {
    const perPage = 10;
    let page = parseInt(req.query.page) || 1;
    const count = await ProductModel.countDocuments({});
    const pages = Math.ceil(count / perPage);
    try {
      const name_product = req.query.name;
      const products = await ProductModel.find(
        name_product ? { name: { $regex: name_product, $options: "si" } } : {}
      )
        .populate("category")
        .limit(perPage)
        .skip(perPage * page - perPage)
        .sort("-createdAt")
        .exec();

      res.status(200).send({
        status: 200,
        success: true,
        message: "get all products category",
        data: products,
        current: page,
        pages,
      });
    } catch {
      res.status(400).send({ success: false, message: "Error getting" });
    }
  }
);


export const reviewProductByUser = expressAsyncHandler( async (req, res) => {
  const { rating, comment } = req.body;
    const product = await ProductModel.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(201).send({status: 201, alreadyReviewed: true, success: true, message: 'Bạn đã đánh giá sản phẩm này!'});
      } else {
        const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;
  
        await product.save();
        res.status(201).json({ message: "Đã thêm đánh giá" });
      }
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
});

export const getAllProduct = expressAsyncHandler(async (req, res) => {
  const products = await ProductModel.find({});
  if(products) {
    res.status(200).send({status: 200, success: true, message: "Get all products", data: products})
  } else {
    res.status(400).send({status: 400, message: "product not found", data:[]});
  }
});

// get product method

export const getProductBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const perPage = 8;
    let page = parseInt(req.query.page) || 1;
    const count = await ProductModel.countDocuments({});
    const pages = Math.ceil(count / perPage);
    const result_find_product = await ProductModel.find({
      slug: req.query.slug,
    })
      .populate("category")
      .limit(perPage)
      .skip(perPage * page - perPage)
      .sort("-createdAt")
      .exec();
    if (result_find_product) {
      res.status(200).send({
        status: 200,
        success: true,
        pages: pages,
        current: page,
        data: result_find_product,
      });
    } else {
      res
        .status(403)
        .send({ status: 403, success: false, message: "Product not found" });
    }
  } catch (error) {
    res
      .status(400)
      .send({ status: 400, success: false, message: "Product not found" });
  }
});

export const filterProductByType = expressAsyncHandler(async (req, res) => {
  // ProductModel.find({type: req.params.type})
  //     .then(product => res.send(product))
  //     .catch(err => console.log(err))

  const filterProductByType = await ProductModel.find({
    type: req.params.type,
  }).limit(5);
  res.send(filterProductByType);
});

export const filterProductByRandomField = expressAsyncHandler(
  async (req, res) => {
    try {
      const result_products = await ProductModel.find(req.body);
      if (result_products) {
        res.status(200).send({ success: true, data: result_products });
      } else {
        res.status(200).send({ success: false, data: {} });
      }
    } catch (error) {
      res
        .status(400)
        .send({ success: false, error, message: "No product found !" });
    }
  }
);

export const test = (req, res) => {
  let result;

  let imageArray = [];
  //   for (let i = 0; i < req.files.length; i++) {
  //     imageArray[i] = req.files[i].filename;
  //   }
  switch (req) {
    case "req.body":
      result = req.body.name;
      break;
    case "file":
      result = req.file.path;
      break;
  }
};
export const AddProduct = expressAsyncHandler(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "dev_setups",
  });

  let colors = [];
  const imageArray = [];
  const product = new ProductModel({
    name: req.body.name,
    price: req.body.price,
    salePrice: req.body.salePrice,
    amount: req.body.amount,
    type: req.body.type,
    image: result.secure_url,
    info_product: req.body.info_product,
    slug: req.body.slug,
    images: imageArray,
    category: req.body.category,
    descriptions: req.body.descriptions,
    status: req.body.status,
    colors: colors,
    cloudinary_id: result.public_id,
    rating: 0,

    os: req.body.os,
    ram: req.body.ram,
    battery: req.body.battery,
    rom: req.body.rom,
    camera: req.body.camera,
    special: req.body.special,
    design: req.body.design,
    screen: req.body.screen,
  });
  const newProduct = await product.save();

  if (newProduct) {
    return res.status(200).send({
      status: 200,
      success: true,
      message: "New Product Created !",
      data: newProduct,
    });
  } else {
    res.send("error add product");
  }
});

export const searchProduct = expressAsyncHandler(async (req, res) => {
  const perPage = 5;
  let page = parseInt(req.query.page) || 1;
  try {
    const data = await ProductModel.find({
      name: { $regex: req.query.search, $options: "i" },
    })
      .sort("-createdAt")
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate("category")
      .exec();
    const count = await ProductModel.count({
      name: { $regex: req.query.search, $options: "i" },
    });
    res.status(200).send({
      status: 200,
      success: true,
      data,
      current: page,
      home:
        "/products/search?search=" +
        req.query.search +
        "&" +
        "page=" +
        req.query.page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
//GET: get a certain category by its slug (this is used for the categories navbar)
export const getProductbyCategory = expressAsyncHandler(async (req, res) => {
  const perPage = 8;
  let page = parseInt(req.query.page) || 1;
  try {
    const foundCategory = await CategoryModel.findOne({
      slug: req.query.slug,
    });
    if (foundCategory) {
      try {
        const allProduct = await ProductModel.find({
          category: foundCategory._id,
        })
          .sort("-createdAt")
          .skip(perPage * page - perPage)
          .limit(perPage)
          .populate("category")
          .exec();
        const count = await ProductModel.countDocuments({
          category: foundCategory.id,
        });
        res.status(200).send({
          status: 200,
          success: true,
          data: allProduct,
          current: page,
          home:
            "/products/category" +
            req.params.slug +
            "&" +
            "page=" +
            req.query.page,
          pages: Math.ceil(count / perPage),
        });
      } catch {
        res.status(400).send({
          status: 400,
          success: false,
          error: error,
          message: "Get product by category failed.1",
        });
      }
    } else {
      res.status(400).send({
        status: 400,
        success: false,
        error: error,
        message: "Get product by category failed.2",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      success: false,
      error: error,
      message: "Get product by category failed.3",
    });
  }
});

export const UpdateProduct = expressAsyncHandler(async (req, res) => {
  const find_product_by_id = await ProductModel.findById({_id: req.query.id});
  await cloudinary.uploader.destroy(find_product_by_id.cloudinary_id);
  let result;
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
  }
  try {
    if (find_product_by_id) {
      find_product_by_id.name = req.body.name;
      find_product_by_id.amount = req.body.amount;
      find_product_by_id.price = req.body.price;
      find_product_by_id.salePrice = req.body.salePrice;
      find_product_by_id.type = req.body.type;
      find_product_by_id.image = result?.secure_url || find_product_by_id.image;
      find_product_by_id.slug = req.body.slug;
      (find_product_by_id.category = req.body.category),
      find_product_by_id.status = req.body.status,
      find_product_by_id.description = req.body.description,
      (find_product_by_id.rating = 0);
      find_product_by_id.cloulinary_id = result?.public_id || find_product_by_id.cloulinary_id;

      find_product_by_id.os = req.body.os;
      find_product_by_id.ram = req.body.ram;
      find_product_by_id.battery = req.body.battery;
      find_product_by_id.rom = req.body.rom;
      find_product_by_id.camera = req.body.camera;
      find_product_by_id.special = req.body.special;
      find_product_by_id.design = req.body.design;
      find_product_by_id.screen = req.body.screen;

      const updateProduct = await find_product_by_id.save();
      if (updateProduct) {
        res.status(200).send({
          status: 400,
          success: true,
          data: updateProduct,
          message: "Update product success !",
        });
      } else {
        res.status(400).send({
          status: 400,
          success: false,
          error,
          message: "Update product failed",
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      success: false,
      error,
      message: "Update product failed",
    });
  }
});

export const DeleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    const deleteProduct = await ProductModel.findById({ _id: req.query.id });
    await cloudinary.uploader.destroy(deleteProduct.cloudinary_id);
    if (deleteProduct.cloudinary_id) {
      await deleteProduct.remove();
      res.status(200).send({
        status: 200,
        success: true,
        message: "Product deleted cloudinay_image and product successfully.",
      });
    } else if (!deleteProduct.cloudinary_id) {
      await deleteProduct.remove();
      res.status(200).send({
        status: 200,
        success: true,
        message: "Product deleted product successfully.",
      });
    } else {
      res.status(400).send({
        status: 400,
        success: false,
        message: "Delete Product failed",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ status: 400, success: false, message: "Delete Product failed" });
  }
});


export const paginationProduct = expressAsyncHandler(async (req, res) => {
  var perPage = 6;
  var page = req.params.page || 1;
  ProductModel.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, products) {
      ProductModel.countDocuments().exec(function (err, count) {
        if (err) return next(err);
        res.send({
          products: products,
          current: page,
          pages: Math.ceil(count / perPage),
        });
      });
    });
});

export const RateProduct = expressAsyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    const existsUser = product.reviews.find((x) => x.name === req.body.name);
    if (existsUser) {
      res.status(200).send({
        status: 200,
        success: true,
        message: "Bạn đã đánh giá sản phẩm này",
      });
    } else {
      product.reviews.push(req.body);
      const updateProduct = await product.save();
      res.status(200).send({
        status: 200,
        success: true,
        data: updateProduct,
        message: "Bạn đã đánh giá thành công",
      });
    }
  } else {
    res
      .status(403)
      .send({ status: 403, success: false, message: "product not found" });
  }
});

export const CommentProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      product.comments.push(req.body);
      const updateCommentProduct = await product.save();
      res.status(200).send({
        status: 200,
        success: true,
        data: updateCommentProduct,
        message: "Comment updated successfully",
      });
    } else {
      res
        .status(400)
        .send({ status: 400, success: false, message: "product not found" });
    }
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, success: false, message: "product not found" });
  }
});

export const updateThumnail = expressAsyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  const uploader = async (path) =>
    await cloudinary.uploader.upload(path, "Images");
  if (product) {
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      console.log(newPath);
      if (product.images.length > 10) {
        res.status(400).send({
          status: 400,
          success: false,
          messgage: "Quá số lượng ảnh tải lên",
        });
        break;
      } else {
        product.images.push({
          url: newPath.secure_url,
          cloudinary_id: newPath.public_id,
        });
      }
    }
    const update = await product.save();
    res.status(200).send({
      status: 200,
      success: true,
      message: "update successfully",
      data: update,
    });
  } else {
    res
      .status(403)
      .send({ status: 403, success: false, message: "product not found" });
  }
});

export const deleteThumnail = expressAsyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    console.log("product", product);
    if (product) {
      const temps = product.images;
      temps.forEach(
        async (temp) => await cloudinary.uploader.destroy(temp.cloudinary_id)
      );
      temps.splice(0, temps.length);
      const update = await product.save();
      res.status(200).send({
        success: true,
        message: "Successfully deleted",
        temps: update,
      });
    } else {
      res.status(400).send({ message: "no deleted product" });
    }
  } catch (err) {
    res.status(400).send({ message: "Product not found" });
  }
});

export const RepCommentProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const indexComment = product.comments.findIndex(
        (item) => item._id == req.body.idComment
      );
      product.comments[indexComment].replies.push(req.body);

      await product.save();
      res.status(200).send({status: 200, success: true, data: product, message: "Rep comments successfully"});
    } else {
      res.status(403).send({ status: 403, success: false, message: "product not found" });
    }
  } catch (err) {
    res
      .status(403)
      .send({ status: 403, success: false, message: "product not found" });
  }
});

export const PinCommentProduct = expressAsyncHandler(async (req, res) => {
  console.log(req.body, req.params.id);
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    const indexComment = product.comments.findIndex(
      (item) => item._id == req.body.idComment
    );
    product.comments[indexComment] = req.body;
    PinComment(product.comments, indexComment, 0);

    await product.save();
    res.send(product);
  } else {
    res.status(400).send({ message: "product not found" });
  }
});

export const BlogProduct = expressAsyncHandler(async (req, res) => {
  console.log(req.body.blogContent);
  const product = await ProductModel.findById({ _id: req.params.id });

  if (product) {
    product.blog = req.body.blogContent;
    await product.save();
    res.send(product);
  } else {
    res.send({ message: "product not found" });
  }
});

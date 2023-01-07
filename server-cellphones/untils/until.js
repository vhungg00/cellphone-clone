import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import {UserModel} from '../models/UserModel.js'
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_SECRET || "tavanhung",
    {
      expiresIn: "30d",
    }
  );
};

export const GenerateToken = (data, time) => {
  let token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: time,
  });
  return token;
};

export const DecodeToken = (token) => {
  let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return data;
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "tavanhung",
      (err, decode) => {
        if (err) {
          res.status(400).send({ message: "invalid token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "no token" });
  }
};
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log('token', token);
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await UserModel.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res
      .status(401)
      .send({message:'Not authorized, no token'})
    }
  }
  if (!token) {
    res
    .status(401)
    .send({message:'Not authorized, no token'})
  }
}

export const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers.authorization;
  if (!token)
    res.status(400).send({success: false, message: "A token requied for authentication" });
    try{
      const descode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      console.log(descode)
      req.user = descode
    }catch(error){
      res.status(400).send({message: "Token invalid"})
    }
    return next();
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "invalid admin token" });
  }
};

export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "./public/productImages"),
      function (err, success) {
        if (err) {
          throw err;
        }
      }
    );
  },
  fileName: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (err, success) {
      if (err) {
        throw err;
      }
    });
  },
});
export const uploads = multer({ storage: storage });

export function PinComment(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);

  return arr;
}

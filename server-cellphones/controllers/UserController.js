import { UserModel } from "../models/UserModel.js";
import { generateToken, GenerateToken } from "../untils/until.js";
import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import bcryptjs from "bcryptjs";

export const getAllUser = (req, res) => {
  UserModel.find({})
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
};

const securePassword = async (password) => {
  try {
    const passwordHash = bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (err) {
    res.status(400).send(err.message);
  }
};
export const registerUser = expressAsyncHandler(async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).send({ errors: errors.array() });
    return;
  }
  const spassword = await securePassword(req.body.password);
  const userExists = await UserModel.findOne({ email: req.body.email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: spassword,
    address: req.body.address,
    phone: req.body.phone,
    isAdmin: false,
  });

  if (user) {
    let accessToken = await GenerateToken({ _id: user._id }, "30d");
    const userdata = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: accessToken,
    };
    res
      .status(200)
      .send({ status: 200, success: true, message: "Register successful", data: userdata });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send({ errors: errors.array() });
    }
    let { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res
        .status(400)
        .send({
          status: 400,
          success: false,
          message: "Missing email or/and password",
        });
    }
    const user = await UserModel.findOne({ email: email });
    console.log("user", user);
    if (user) {
      const passwordMatch = await bcryptjs.compare(password, user.password);
      let accessToken = await GenerateToken({ _id: user._id }, "30d");
      if (passwordMatch === true) {
        const resultInfo = {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          address: user.address,
          phone: user.phone,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          token: accessToken,
        };
        const response = {
          status: 200,
          success: true,
          message: "login successful",
          data: resultInfo,
        };
        res.setHeader("AccessToken", accessToken);
        res.status(200).send(response);
      } else {
        res.status(400).send({
          status: 400,
          success: false,
          message: "Dang nhap that bai do sai tai khoan",
        });
      }
    } else {
      res.status(400).send({
        status: 400,
        success: false,
        message: "Dang nhap that bai do sai tai khoan",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ status: 400, success: false, message: "Login Fail" });
  }
});

export const DeleteUser = expressAsyncHandler(async (req, res) => {
  const user = await UserModel.findById({ _id: req.params.id });

  if (user) {
    await user.remove();
    res
      .status(200)
      .send({ status: 200, success: true, message: "user deleted" });
  } else {
    res
      .status(400)
      .send({ status: 400, success: false, message: "user not exists" });
  }
});

export const GetUserProfile = expressAsyncHandler( async (req,res) => {
  const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
});

// UPDATE PROFILE
export const UpdateProfile = expressAsyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  console.log('req.body: ', req.body)
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    console.log('hung', req.body);
      const spassword = await securePassword(req.body.password);

      if (req.body.password) {
        user.password = spassword;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
});

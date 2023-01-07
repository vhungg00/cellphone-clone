import expressAsyncHandler from "express-async-handler";
import { SelectListModel } from "../models/SelectListModel.js";

export const createOptionByproperty = expressAsyncHandler(async (req, res) => {
  const property = await SelectListModel.findOne({ property: req.body.property });
  if(property) {
    res.status(400);
    throw new Error("Select already exists");
  }
  try {
      const new_select = new SelectListModel({
        name: req.body.name,
        property: req.body.property,
        options: req.body.options,
      });
      if (new_select) {
        await new_select.save();
        res.status(200).send({status: 200,success: true, data: new_select, message: "Created successfully", });
      } else {
        res.status(400).send({status: 400,success: false, message: "Create failed"});
      }
  } catch (e) {
    res
      .status(400)
      .send({ status: 400, success: false, message: "Create fail" });
  }
});

export const getAllOptionByproperty = expressAsyncHandler(async (req, res) => {
  try {
    const selectList = await SelectListModel.find({});
    if (selectList) {
      res.status(200).send({
        status: 200,
        success: true,
        data: selectList,
        message: "Get selected list successfully !",
      });
    }
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, success: false, message: "Get SelectList failed" });
  }
});

export const UpdateSelectOption = expressAsyncHandler(async (req, res) => {
  const _update = await SelectListModel.findById({ _id: req.query.id });
  try {
    if (_update) {
      _update.name = req.body.name;
      _update.property = req.body.property;
      _update.options = req.body.options;

      const _updat_select = await _update.save();
      if (_updat_select) {
        res.status(200).send({
          status: 200,
          success: true,
          data: _updat_select,
          message: "Update selected list successfully !",
        });
      } else {
        res
          .status(400)
          .send({ status: 400, success: false, message: "Update falied" });
      }
    } else {
      res
        .status(400)
        .send({ status: 400, success: false, message: "Update falied" });
    }
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, success: false, message: "Update falied" });
  }
});

export const getSelectOptionById = expressAsyncHandler(async (req, res) => {
  try {
    const get_id_select = await SelectListModel.findById({ _id: req.query.id });
    if (get_id_select) {
      res.status(200).send({
        status: 200,
        success: true,
        data: get_id_select,
        message: "Get selected successfully !",
      });
    } else {
      res
        .status(400)
        .send({ status: 400, success: false, message: "Get falied" });
    }
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, success: false, message: "Get falied" });
  }
});

export const deleteSelectOption = expressAsyncHandler(async (req, res) => {
  try {
    const delete_select = await SelectListModel.findById({ _id: req.query.id });
    if (delete_select) {
      await delete_select.remove();
      res.status(200).send({ status: 200, success: true });
    } else {
      res
        .status(400)
        .send({ status: 400, success: false, message: "Delete failed" });
    }
  } catch (err) {
    res
      .status(400)
      .send({ status: 400, success: false, message: "Delete failed" });
  }
});

import { OrderModel } from "../models/OrderModel.js";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";

import querystring from "qs";
import sha256 from "sha256";
import dateFormat from "dateformat";

const tmnCode = process.env.VNP_TMN_CODE;
const secretKey = process.env.VNP_HASH_SECRET;
const url = process.env.VNP_URL;
const returnUrl = process.env.VNP_RETURN_URL;

export const createPayment = expressAsyncHandler(async (req, res) => {
  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const order = new OrderModel({
    order_code: "",
    to_ward_code: req.body.to_ward_code,
    to_district_id: req.body.to_district_id,
    cancelOrder: false,

    orderItems: req.body.orderItems,
    shippingAddress: {
      province: req.body.shippingAddress.province,
      district: req.body.shippingAddress.district,
      ward: req.body.shippingAddress.ward,
      detail: req.body.shippingAddress.more,
      name: req.body.shippingAddress.name,
      phone: req.body.shippingAddress.phone,
    },
    paymentMethod: req.body.paymentMethod,
    paymentResult: req.body.paymentResult
      ? {
          id: req.body.paymentResult.id,
          status: req.body.paymentResult.status,
          update_time: req.body.paymentResult.update_time,
          email_address: req.body.paymentResult.payer.email_address,
        }
      : "",
    totalPrice: req.body.totalPrice,
    status: req.body.status ? req.body.status : "pendding",
    name: req.body.name,
    user: req.body.user,
  });

  order.save();
  let amount = req.body.totalPrice;
  let vnpUrl = url;
  const date = new Date();

  const createDate = dateFormat(date, "yyyymmddHHmmss");
  const orderId = order._id.toString();
  // var orderId = dateFormat(date, 'HHmmss');

  var locale = "vn";
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "4";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;

  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Nap tien cho thue bao 0123456789";
  vnp_Params["vnp_OrderType"] = "billpayment";
  vnp_Params["vnp_Amount"] = amount*100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params["vnp_BankCode"] = "NCB";

  vnp_Params = sortObject(vnp_Params);

  var signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false });

  var secureHash = sha256(signData);

  vnp_Params["vnp_SecureHashType"] = "SHA256";
  vnp_Params["vnp_SecureHash"] = secureHash;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });

  res.status(200).json({ code: "00", data: vnpUrl });
});

export const returnPayment = expressAsyncHandler(async (req, res) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    vnp_Params = sortObject(vnp_Params);
    const signData =
      secretKey + querystring.stringify(vnp_Params, { encode: false });

    const checkSum = sha256(signData);

    const id = vnp_Params.vnp_TxnRef;

    // res.status(200).json({ code: vnp_Params.vnp_ResponseCode });
    if (secureHash === checkSum) {
      if (vnp_Params.vnp_ResponseCode == "00") {
        res.status(200).json({ code: vnp_Params.vnp_ResponseCode });
      } else {
        const DeleteOrder = await OrderModel.findById({ _id: id });
        await DeleteOrder.remove();
        res.status(200).json({ code: vnp_Params.vnp_ResponseCode });
      }
    } else {
      res.status(200).json({ code: "97" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const inpPayment = async (req, res) => {
  let vnp_Params = req.query;
  const secureHash = vnp_Params.vnp_SecureHash;

  delete vnp_Params.vnp_SecureHash;
  delete vnp_Params.vnp_SecureHashType;

  vnp_Params = sortObject(vnp_Params);

  const signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false });

  const checkSum = sha256(signData);

  const id = vnp_Params.vnp_TxnRef;
  
  if (secureHash === checkSum) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
};

function sortObject(o) {
  var sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}

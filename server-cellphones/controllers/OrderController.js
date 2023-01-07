import { OrderModel } from "../models/OrderModel.js";
import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();


/* create a new order start
*/


export const clientCancelOrder = expressAsyncHandler(async (req, res) => {
  const updateOrder = await OrderModel.findById({_id: req.params.id})

   if(updateOrder){
    updateOrder.cancelOrder = true
    await updateOrder.save()
   }
   res.send(updateOrder)
});

export const updateOrder = expressAsyncHandler(async (req, res) => {
  let updateOrder = await OrderModel.findById({ _id: req.params.id });

  if (updateOrder) {
    let items = [];
    updateOrder.orderItems.map((x) => {
      let item = {};
      item.name = x.name;
      item.quantity = parseInt(x.qty);
      item.price = x.salePrice;

      items.push(item);
    });
    const orderGhn = {
      payment_type_id: 2,

      to_name: updateOrder.name,
      to_phone: updateOrder.shippingAddress.phone,
      to_address: `${updateOrder.shippingAddress.province}, ${updateOrder.shippingAddress.district}, ${updateOrder.shippingAddress.ward}, ${updateOrder.shippingAddress.detail}`,
      to_ward_code: updateOrder.to_ward_code,
      to_district_id: updateOrder.to_district_id,

      weight: 200,
      length: 1,
      width: 19,
      height: 10,

      service_id: 0,
      service_type_id: 2,

      note: "",
      required_note: "KHONGCHOXEMHANG",

      cod_amount: updateOrder.paymentMethod === "payOnline" ? 0 : updateOrder.totalPrice,
      items,
    };

    try {
      const { data } = await axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
        orderGhn,
        {
          headers: {
            shop_id: process.env.SHOP_ID,
            Token: process.env.TOKEN_GHN,
          },
        }
      );

      const order_code = data.data.order_code;
      console.log("order_code: ", order_code);

      updateOrder.order_code = order_code;
      await updateOrder.save();
      res.send(updateOrder);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send({ msg: "product not found" });
  }
});

export const PrintOrderGhn = expressAsyncHandler(async (req, res) => {
  console.log('print order')
  const Order = await OrderModel.findById({ _id: req.params.id });
  if (Order) {
    let token;
    try {
      const { data } = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token",
        {
          headers: {
            Token: process.env.TOKEN_GHN,
          },
          params: {
            order_codes: Order.order_code,
          },
        }
      );

      token = data.data.token;
      Order.token = token;
      console.log(Order, token);
      await Order.save();

      const result = await axios.get(
        `https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${token}`,
        {
          headers: {
            Token: process.env.TOKEN_GHN,
          },
        }
      );
      console.log("result: ", result.config.url);

      res.send(result.config.url);
    } catch (error) {
      console.log(error);
    }
    
  } else {
    res.send({message: 'order not found'})
  }
});


export const GetAllOrder = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({}).sort({ createdAt: -1 });
  if (Order) {
    res.status(200).send({status: 200, success: true, message: 'Get All Order', data: Order});
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const GetAllOrderPaypal = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({ paymentMethod: "payOnline" }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const GetAllOrderPendding = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    $or: [{ status: "pendding" }, { paymentMethod: "payOnline" }],
  }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const GetAllOrderShipping = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({ status: "shipping" }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const GetAllOrderPaid = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({ status: "paid" }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const DeleteOrder = expressAsyncHandler(async (req, res) => {
  const deleteOrder = await OrderModel.findById({_id: req.params.id});

  if (deleteOrder) {
    await deleteOrder.remove();
    res.send({ message: "product deleted" });
  } else {
    res.send("error in delete order");
  }
});

export const ShippingProduct = expressAsyncHandler(async (req, res) => {
  console.log("shipping");
  const status = "shipping";
  const Order = await OrderModel.findById({ _id: req.params.id });
  if (Order) {
    Order.status = status;
    await Order.save();
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

export const PaidProduct = expressAsyncHandler(async (req, res) => {
  console.log("paid");
  const status = "paid";
  const Order = await OrderModel.findByIdAndUpdate(
    { _id: req.params.id },
    { status: status }
  );
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order" });
  }
});

// --------------------    user

export const GetOrderByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({ user: req.params.id }).sort({
    createdAt: -1,
  });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const GetOrderPaypalByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    user: req.params.id,
    paymentMethod: "payOnline",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const GetOrderPenddingByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    user: req.params.id,
    status: "pendding",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const GetOrderShippingByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    user: req.params.id,
    status: "shipping",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const GetOrderPaidByUser = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    user: req.params.id,
    status: "paid",
  }).sort({ createdAt: -1 });
  if (Order) {
    res.send(Order);
  } else {
    res.status(401).send({ message: "no order by user" });
  }
});

export const GetAllOrderInAMonth = expressAsyncHandler(async (req, res) => {
  const Order = await OrderModel.find({
    createdAt: {
      $gte: new Date(2021, 7, 11),
      $lt: new Date(2021, 7, 16),
    },
  });

  if (Order) {
    res.send(Order);
  } else {
    res.status(400).send({ message: "no product in a month" });
  }
})

export const createOrder = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new OrderModel({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).send({success: true, data: createOrder});
  }
});

// ADMIN GET ALL ORDERS
export const adminGetAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await OrderModel.find({})
  .sort({ _id: -1 })
  .populate("user", "id name email");
res.json(orders);
});

// USER LOGIN ORDERS
export const userLoginOrders = expressAsyncHandler(async (req, res) => {
  const order = await OrderModel.find({ user: req.user._id }).sort({ _id: -1 });
  if(order) {
    res.status(201).send({
      status: 201,
      success: true,
      message: 'List my orders successfully',
      data: order,
    })
  } else {
    res.status(201).send({ message: 'Not my order list!' })
  }
});

// GET ORDER BY ID
export const getOrderById = expressAsyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.query.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(201).send({
      status: 201,
      success: true,
      message: "Order was successfully",
      data: order
    })
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// ORDER IS PAID

export const orderIsPaid = expressAsyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
});

// ORDER IS PAID
export const orderIsDelivevered = expressAsyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.status(200).send({ status: 200, success: true, message: "Update order successfully", data: updatedOrder});
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
});
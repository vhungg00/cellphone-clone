import expressAsyncHandler from "express-async-handler";
import { ConversationModel } from "../models/ConversationModel.js";
import { MessageModel } from "../models/MessageModel.js";

export const getAllConversation = expressAsyncHandler(async (req, res) => {
  const allConversation = await ConversationModel.find().sort({ updatedAt: -1} )
  res.send(allConversation)
})

export const getMessageByConversation = (req, res) => {
  ConversationModel.findOne({$or: [ {idUser: req.query.idUser}, {_id: req.query.idConversation}]})
    .then(user => {
      if (!user) return;
      MessageModel.find({ idConversation: user._id })
        .populate('idConversation')
        .exec((err, messages) => {
          if (!messages) {
              return res.status(400).json({
                  message: 'Thất bại'
              })
          }
          return res.status(200).json({
              messageList: messages
          })
          
      })
  })
}

export const createSaveMessage = expressAsyncHandler(async (req, res) => {
  try {
    const messageText = new MessageModel({
      sender: req.body.sender,
      message: req.body.message,
      idConversation: req.body.idConversation,
    });
    const createMessage = await messageText.save();
    if (createMessage) {
      res.status(200).send({
        status: 200,
        success: true,
        message: "Save message successfully!",
        data: createMessage,
      });
    } else {
      res
        .status(400)
        .send({
          status: 400,
          success: false,
          message: "Create message failed",
        });
    }
  } catch (e) {
    res.status(400).send({ message: "Error creating" });
  }
});

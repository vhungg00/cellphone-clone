import { Server } from "socket.io";
import { ConversationModel } from "../../models/ConversationModel.js";

export const ConnectSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://cellphone-clone-client.vercel.app",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });
  // khi client connect to server
  io.on("connection", (socket) => {
    io.removeAllListeners();
    console.log(socket.id, "connected");
    socket.on("join_conversation", (idUser) => {
      ConversationModel.findOne({ idUser }).then((conversation) => {
        if (!conversation) return;

        const idConversation = String(conversation._id);
        socket.join(idConversation);
      });
    });
    //admin join conversation
    socket.on("admin_join_conversation", (idConversation) => {
      // const conversation = await ConversationModel.findByIdAndUpdate({
      //   _id: idConversation
      // }
      // ,{
      //   seen: true
      // })
      socket.join(idConversation);
    });

    // create and join room
    socket.on("create_conversation", (currentUser) => {
      console.log("curentUser: ", currentUser);
      const conversation = new ConversationModel({
        idUser: currentUser._id,
        nameConversation: currentUser.name,
      });

      conversation.save().then((data) => {
        socket.join(String(data._id));
        socket.emit("response_room", data);
      });
    });

    // chat
    socket.on("chat", async (data) => {
      const { _id, sender, message, idConversation } = data;
      const conversation = await ConversationModel.updateOne(
        {
          _id: idConversation,
        },
        {
          lastMessage: message,
        }
        // {new: true}
      );
      io.emit("lastMessage", conversation);
      const payload = {
        idConversation,
        sender,
        message,
        _id,
      };
      io.to(idConversation).emit("newMessage", payload);
      const conver = await ConversationModel.findOne({ _id: idConversation });
      io.emit("show-me", conver);
    });
    socket.on("disconnect", () => {
      io.emit("user-leave", "Ban ay da roi khoi cuoc tro chuyen");
    });
  });
};

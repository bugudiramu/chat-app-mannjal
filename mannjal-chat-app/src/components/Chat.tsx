import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import "../App.css";
import { setSocketConnected } from "../redux/connectionSlice";
import { addMessage } from "../redux/messageSlice";
import { AppDispatch, RootState } from "../redux/store";
import ChatMessage from "./ChatMessage";
import { CONNECTION_STATE } from "../enums";

const socket = io("http://localhost:3001");

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [replyMessage, setReplyMessage] = useState<{
    clientId: string;
    text: string;
  } | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector((state: RootState) => state.messages.messages);
  const isSocketConnected = useSelector(
    (state: RootState) => state.connection.isSocketConnected
  );

  useEffect(() => {
    socket.on("connect", () => {
      dispatch(setSocketConnected(true));
    });

    socket.on("disconnect", () => {
      dispatch(setSocketConnected(false));
    });

    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, [dispatch]);

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const messageToSend = {
      clientId: socket.id,
      text: newMessage,
      replyTo: replyMessage,
    };
    socket.emit("message", messageToSend);
    setNewMessage("");
    setReplyMessage(null);
  };

  return (
    <>
      <div className="chat-header">
        {isSocketConnected
          ? CONNECTION_STATE.CONNECTED
          : CONNECTION_STATE.NOT_CONNECTED}
      </div>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              isSent={msg.clientId === socket.id}
            />
          ))}
        </div>
        {replyMessage && (
          <div className="reply-preview">
            Replying to: <strong>{replyMessage.clientId}</strong>:{" "}
            {replyMessage.text}
          </div>
        )}
        <form>
          <div className="chat-input-container">
            <input
              className="chat-input"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="chat-send-button"
              onClick={(e) => sendMessage(e)}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;

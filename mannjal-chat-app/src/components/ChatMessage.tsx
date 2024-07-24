import React from "react";

interface ChatMessageProps {
  message: { clientId: string; text: string };
  isSent: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isSent }) => {
  return (
    <div className={`chat-message ${isSent ? "sent" : "received"}`}>
      <strong>{message.clientId}:</strong> {message.text}
    </div>
  );
};

export default ChatMessage;

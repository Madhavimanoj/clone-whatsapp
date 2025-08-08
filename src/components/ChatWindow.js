import { useEffect, useRef } from "react";

const ChatWindow = ({ chat, typing }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

 const formatTime = (isoTime) => {
  const time = new Date(isoTime?.$date || isoTime); 
  return isNaN(time.getTime()) ? "Invalid Date" : time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};


  return (
    <>
      {chat.messages.map((msg, index) => (
        <div
          key={index}
          className={`message-bubble ${msg.direction === "outgoing" ? "you" : "other"}`}
        >
          <div>{msg.message}</div>
          <div className="timestamp">
            <span className="meta">
              {formatTime(msg.timestamp)}{" "}
              <span style={{ color: msg.status === "read" ? "blue" : "gray" }}>
                {msg.status}
              </span>
            </span>
          </div>
        </div>
      ))}
      {typing && (
        <div className="typing-indicator">
          <em>Typing...</em>
        </div>
      )}

      <div ref={scrollRef} />
      

    </>
  );
};

export default ChatWindow;

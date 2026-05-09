import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I am LightEdge AI. Ask me about signup, dashboard, funds, orders, holdings, positions, pricing, or support.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async (event) => {
    event.preventDefault();

    const cleanQuestion = question.trim();
    if (!cleanQuestion || loading) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: cleanQuestion },
    ]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: cleanQuestion }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get answer.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", text: data.answer },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            error.message ||
            "Sorry, I could not answer right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="ai-chat-button" onClick={() => setOpen(!open)}>
        AI
      </button>

      {open && (
        <div className="ai-chat-panel">
          <div className="ai-chat-header">
            <div>
              <strong>LightEdge AI</strong>
              <span>Project assistant</span>
            </div>

            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${
                  message.role === "user" ? "user" : "assistant"
                }`}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="ai-message assistant">Thinking...</div>
            )}
          </div>

          <form className="ai-chat-form" onSubmit={askQuestion}>
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about LightEdge..."
            />
            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}

      <style>{`
        .ai-chat-button {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 2000;
          width: 54px;
          height: 54px;
          border: none;
          border-radius: 50%;
          background: #387ed1;
          color: #fff;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(56, 126, 209, 0.35);
        }

        .ai-chat-panel {
          position: fixed;
          right: 22px;
          bottom: 88px;
          z-index: 2000;
          width: min(360px, calc(100vw - 32px));
          height: 480px;
          background: #fff;
          border: 1px solid #e5eaf1;
          border-radius: 10px;
          box-shadow: 0 18px 50px rgba(15, 23, 42, 0.18);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .ai-chat-header {
          padding: 14px;
          background: #f8fafc;
          border-bottom: 1px solid #e5eaf1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ai-chat-header strong {
          display: block;
          color: #202124;
        }

        .ai-chat-header span {
          display: block;
          margin-top: 2px;
          color: #7a8190;
          font-size: 12px;
        }

        .ai-chat-header button {
          border: none;
          background: transparent;
          font-size: 24px;
          cursor: pointer;
          color: #555;
        }

        .ai-chat-messages {
          flex: 1;
          padding: 14px;
          overflow-y: auto;
          background: #ffffff;
        }

        .ai-message {
          max-width: 86%;
          padding: 10px 12px;
          border-radius: 10px;
          margin-bottom: 10px;
          font-size: 13px;
          line-height: 1.45;
          white-space: pre-wrap;
        }

        .ai-message.assistant {
          background: #f1f5f9;
          color: #202124;
        }

        .ai-message.user {
          background: #387ed1;
          color: #fff;
          margin-left: auto;
        }

        .ai-chat-form {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-top: 1px solid #e5eaf1;
          background: #fff;
        }

        .ai-chat-form input {
          flex: 1;
          border: 1px solid #d8e0ea;
          border-radius: 8px;
          padding: 10px;
          outline: none;
          font-size: 13px;
        }

        .ai-chat-form button {
          border: none;
          border-radius: 8px;
          padding: 0 14px;
          background: #387ed1;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }

        .ai-chat-form button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}

export default Chatbot;

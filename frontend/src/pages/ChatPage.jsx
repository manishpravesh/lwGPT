import { useEffect, useRef, useState } from "react";
import { sendChatToBackend } from "../api/sendChatToBackend";
import { useAuth } from "../context/AuthContext";

const ChatPage = () => {
  const [inputData, setInputData] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  const bottomRef = useRef(null);

  /* ---------- Auto scroll ---------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------- Load chats for sidebar ---------- */
  const { authReady, isAuth } = useAuth();
  useEffect(() => {
    if (authReady && isAuth) {
      fetchChats();
    }
  }, [authReady, isAuth]);

  const fetchChats = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/chats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        console.error("fetchChats failed:", res.status);
        setChats([]); // always an array
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setChats(data);
      } else {
        console.error("fetchChats returned non-array:", data);
        setChats([]);
      }
    } catch (err) {
      console.error("fetchChats error:", err);
      setChats([]);
    }
  };
  /* ---------- Load selected chat ---------- */
  const loadChat = async (chatId) => {
    const res = await fetch(`http://localhost:5000/api/chats/${chatId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    setActiveChatId(chatId);
    setMessages(
      data.messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
      }))
    );
  };

  /* ---------- Send message ---------- */
  const handleSend = async () => {
    if (!inputData.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputData,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputData("");
    setIsTyping(true);

    const typingId = Date.now() + 1;

    setMessages((prev) => [
      ...prev,
      {
        id: typingId,
        role: "system",
        content: "Thinking…",
      },
    ]);

    try {
      const { reply, chatId } = await sendChatToBackend(
        userMessage.content,
        activeChatId
      );
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingId
            ? { ...msg, role: "assistant", content: reply }
            : msg
        )
      );
      // first message → new chat
      if (!activeChatId) {
        setActiveChatId(chatId);
        fetchChats();
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingId
            ? {
                ...msg,
                role: "system",
                content: "Something went wrong or usage limit reached.",
              }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const deletChat = async (chatId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/chats/${chatId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        setChats(chats.filter((c) => c.id !== chatId));
        if (activeChatId === chatId) {
          setActiveChatId(null);
          setMessages([]);
        }
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
    }
  };

  return (
    <div className="flex h-screen bg-n-8">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={loadChat}
        onNewChat={() => {
          setActiveChatId(null);
          setMessages([]);
        }}
        onDeleteChat={deletChat}
      />
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="border-b border-n-6 bg-n-8 backdrop-blur-md px-8 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-color-1 via-color-5 to-color-2 bg-clip-text text-transparent">
            Legal Assistant Chat
          </h1>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-n-2 text-lg font-semibold mb-2">
                  Start a new conversation
                </p>
                <p className="text-n-3 text-sm">
                  Ask anything about Indian laws and legal assistance
                </p>
              </div>
            </div>
          )}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Area - Floating */}
        <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-n-8 via-n-8 to-n-8/80 backdrop-blur-lg px-8 py-6 shadow-2xl border-t border-n-6">
          <SearchChat
            inputData={inputData}
            setInputData={setInputData}
            handleSend={handleSend}
            isTyping={isTyping}
          />
        </div>
      </div>
    </div>
  );
};

/* ---------- Message Bubble Component ---------- */
const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="px-4 py-2 rounded-full bg-n-6 text-n-3 text-sm italic">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-gradient-to-br from-color-1 to-color-5 text-n-8 rounded-br-sm shadow-lg"
            : "bg-gradient-to-br from-n-7 to-n-8 text-n-1 border border-n-6 rounded-bl-sm"
        }`}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {formatMessage(message.content)}
        </div>
      </div>
    </div>
  );
};

/* ---------- Format Message with Simple Markdown ---------- */
const formatMessage = (content) => {
  return content.split("\n").map((line, idx) => (
    <div key={idx} className="mb-2 last:mb-0">
      {formatLine(line)}
    </div>
  ));
};

const formatLine = (line) => {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const italicRegex = /\*(.*?)\*/g;
  const codeRegex = /`(.*?)`/g;

  let result = [];
  let lastIndex = 0;
  let matchArray;

  // Handle bold
  const boldMatches = [...line.matchAll(boldRegex)];
  if (boldMatches.length > 0) {
    result = [];
    lastIndex = 0;
    boldMatches.forEach((match, idx) => {
      result.push(line.substring(lastIndex, match.index));
      result.push(
        <strong key={`bold-${idx}`} className="font-bold">
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    });
    result.push(line.substring(lastIndex));
    line = result;
  }

  return line;
};

/* ---------- Search/Input Component ---------- */
const SearchChat = ({ inputData, setInputData, handleSend, isTyping }) => {
  return (
    <div className="flex gap-3 mx-auto max-w-4xl w-full">
      <div className="flex-1 flex items-center rounded-2xl bg-n-7 border border-n-6 backdrop-blur-md hover:border-color-1/50 transition-all px-4 py-2">
        <input
          className="w-full bg-transparent outline-none text-n-1 placeholder-n-4 text-sm"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Ask for legal assistance..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={isTyping}
        />
      </div>
      <button
        onClick={handleSend}
        disabled={isTyping}
        className="px-6 py-2 rounded-2xl bg-gradient-to-r from-color-1 to-color-5 text-n-8 font-semibold hover:from-color-2 hover:to-color-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isTyping ? "..." : "Send"}
      </button>
    </div>
  );
};

/* ---------- Sidebar Component ---------- */
const Sidebar = ({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={`${
        isExpanded ? "w-72" : "w-20"
      } h-full bg-n-8 border-r border-n-6 flex flex-col transition-all duration-300 shadow-xl`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="self-end p-3 text-n-3 hover:text-color-1 transition-colors"
      >
        {isExpanded ? "←" : "→"}
      </button>

      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className={`mx-3 mb-4 p-3 rounded-xl bg-gradient-to-r from-color-1 to-color-5 text-n-8 font-semibold hover:from-color-2 hover:to-color-1 transition-all ${
          !isExpanded && "flex justify-center"
        }`}
      >
        {isExpanded ? "+ New Chat" : "+"}
      </button>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-2">
        {isExpanded && (
          <p className="text-n-4 text-xs font-semibold uppercase tracking-wider px-2 mb-3">
            Chat History
          </p>
        )}
        {chats.length === 0
          ? isExpanded && (
              <p className="text-n-4 text-xs text-center py-4">No chats yet</p>
            )
          : chats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
                onSelect={() => onSelectChat(chat.id)}
                onDelete={() => onDeleteChat(chat.id)}
                isExpanded={isExpanded}
              />
            ))}
      </div>

      {/* Footer */}
      <div className="border-t border-n-6 p-3 text-center">
        <p className="text-n-4 text-xs">{isExpanded && "Legal AI Assistant"}</p>
      </div>
    </div>
  );
};

/* ---------- Chat Item Component ---------- */
const ChatItem = ({ chat, isActive, onSelect, onDelete, isExpanded }) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div
      className={`group relative ${
        isActive
          ? "bg-gradient-to-r from-color-1/30 to-color-5/30 border border-color-1/50"
          : "bg-n-7 hover:bg-n-6 border border-n-6"
      } rounded-xl p-3 cursor-pointer transition-all ${
        !isExpanded && "flex justify-center"
      }`}
    >
      <div onClick={onSelect} className="flex-1 min-w-0">
        <p className="text-n-1 text-sm font-medium truncate">
          {isExpanded ? chat.title || "New chat" : "•"}
        </p>
        {isExpanded && (
          <p className="text-n-3 text-xs truncate">
            {new Date(chat.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
      {isExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="opacity-0 group-hover:opacity-100 ml-2 text-n-4 hover:text-color-3 transition-all"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ChatPage;

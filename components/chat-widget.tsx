"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChatDotsFill, BsSendFill, BsX, BsRobot } from "react-icons/bs";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "model";
  text: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "System Online. ⚡ Ask me anything about Parth's skills, projects, or experience." },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      // Only send actual conversation history (skip the initial system message)
      const conversationHistory = messages.slice(1).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: conversationHistory }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.response || "Connection error." }]);
    } catch (error) {
      console.error("Chat widget error:", error);
      setMessages((prev) => [...prev, { role: "model", text: "Error: Neural link severed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      
      {/* 1. The Chat Window (Glassmorphism) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[350px] sm:w-[400px] h-[500px] bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse absolute top-0 right-0" />
                    <BsRobot className="text-purple-400 text-xl" />
                </div>
                <div>
                    <h3 className="font-semibold text-white text-sm">Parth AI</h3>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
                <BsX size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-purple-600/80 text-white rounded-br-none border border-purple-500/50"
                        : "bg-white/5 text-gray-200 rounded-bl-none border border-white/10"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                        li: ({children}) => <li className="ml-2">{children}</li>,
                        strong: ({children}) => <strong className="font-semibold text-purple-300">{children}</strong>,
                        code: ({children}) => <code className="bg-black/30 px-1.5 py-0.5 rounded text-xs">{children}</code>,
                        a: ({href, children}) => <a href={href} className="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none border border-white/10 flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-white/5 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 bg-black/20 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 transition placeholder-white/30"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-full transition-all shadow-lg shadow-purple-900/20"
              >
                <BsSendFill size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="group relative w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 opacity-20 group-hover:opacity-40 transition-opacity" />
        {isOpen ? (
            <BsX size={28} className="text-white relative z-10" />
        ) : (
            <BsChatDotsFill size={24} className="text-white relative z-10" />
        )}
      </motion.button>
    </div>
  );
}
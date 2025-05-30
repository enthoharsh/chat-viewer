"use client";

import Script from "next/script";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [senders, setSenders] = useState([]);
  const [selectedSender, setSelectedSender] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [mainUser, setMainUser] = useState(null);
  const [showSenderPopup, setShowSenderPopup] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // ignore errors here
    }
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split("\n");

    const parsedChats = [];
    const regex = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(\d{1,2}:\d{2})\s?(?:AM|PM|am|pm)?\s?-\s([^:]+):\s(.+)$/;

    lines.forEach((line) => {
      const match = line.match(regex);
      if (match) {
        const [_, date, time, sender, message] = match;
        parsedChats.push({ date, time, sender, message });
      } else if (parsedChats.length > 0) {
        parsedChats[parsedChats.length - 1].message += "\n" + line;
      }
    });

    const uniqueSenders = [...new Set(parsedChats.map((chat) => chat.sender))];

    setSenders(uniqueSenders);
    setChats(parsedChats);
    setFilteredChats(parsedChats);
    setShowSenderPopup(true);

    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleMainUserSelection = (sender) => {
    setMainUser(sender);
    setShowSenderPopup(false);
  };

  useEffect(() => {
    const filtered = chats.filter((chat) => {
      const matchSender = selectedSender === "All" || chat.sender === selectedSender;
      const matchSearch = searchTerm === "" || chat.message.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSender && matchSearch;
    });
    setFilteredChats(filtered);
  }, [searchTerm, selectedSender, chats]);

  const groupByDate = (messages) => {
    return messages.reduce((acc, msg) => {
      if (!acc[msg.date]) acc[msg.date] = [];
      acc[msg.date].push(msg);
      return acc;
    }, {});
  };

  const groupedChats = groupByDate(filteredChats);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-blue-50 text-black"}>
      <Script
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3554718393816462"
        crossOrigin="anonymous"
      />

      <div className="mb-6 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-center text-sm shadow-md">
        <h1>WhatsApp Chat Viewer - View, Filter & Analyze Your Chats Online</h1>
        📂 <strong>Please upload your exported WhatsApp chat (.txt file)</strong>
        <br />
        To use this tool, first export your chat from WhatsApp and upload the .txt file here.
        <br />
        <span className="text-xs">
          Go to WhatsApp {'>'} Chat {'>'} Export Chat {'>'} Without Media {'>'} Save as .txt file
        </span>
      </div>

      <div className="min-h-screen flex flex-col px-4 py-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">📱 WhatsApp Chat Viewer</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm border px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            className="border rounded px-4 py-2 text-sm shadow-sm"
          />

          {senders.length > 0 && (
            <select
              value={selectedSender}
              onChange={(e) => setSelectedSender(e.target.value)}
              className="border px-4 py-2 rounded shadow-sm text-sm"
            >
              <option value="All">All Senders</option>
              {senders.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}

          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded text-sm shadow-sm flex-1"
          />
        </div>

        {showSenderPopup && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Who is the sender (You)?</h2>
              <div className="grid grid-cols-2 gap-4">
                {senders.map((sender, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleMainUserSelection(sender)}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    {sender}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div
          ref={chatContainerRef}
          className="rounded-lg p-4 shadow-inner dark:shadow-none h-[70vh] overflow-y-auto space-y-6 transition-colors duration-300"
        >
          {Object.entries(groupedChats).map(([date, msgs], index) => (
            <div key={index}>
              <div className="sticky top-0 z-10 text-center font-semibold text-gray-500 dark:text-gray-300 backdrop-blur-md bg-white/70 dark:bg-gray-900/60 py-2 rounded">
                📅 {date}
              </div>
              <div className="space-y-2">
                {msgs.map((chat, idx) => (
                  <div
                    key={idx}
                    className={`flex ${chat.sender === mainUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`rounded-2xl p-4 max-w-[75%] shadow-md whitespace-pre-line text-sm ${
                        chat.sender === mainUser
                          ? "bg-blue-600 text-white text-right"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-left"
                      }`}
                    >
                      <div className="font-semibold text-xs opacity-80 mb-1">
                        {chat.sender === mainUser ? "(You)" : chat.sender}
                      </div>
                      <div>{chat.message}</div>
                      <div className="text-xs opacity-60 mt-1">{chat.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ margin: "20px 0" }}>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-3554718393816462"
            data-ad-slot="2523183959"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>

      <footer className="backdrop-blur-md bg-white/10 text-gray-300 text-sm py-4 w-full mt-2">
        <div className="max-w-4xl mx-auto px-4 text-center text-black dark:text-white">
          Tool with ❤️ by{" "}
          <a
            href="https://github.com/enthoharsh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Harsh
          </a>{" "}
          | © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

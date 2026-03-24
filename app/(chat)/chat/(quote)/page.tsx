"use client";
import { useRef } from "react";
import { useState,useEffect } from "react";
import { IoIosReturnLeft } from "react-icons/io";

import { ChatMessage } from "../components/chat-message";
import { ChatPrompt } from "../components/chat-prompt";
import Link from "next/link";

export type Message = {
  content: string;
  role: "user" | "system" | "assistant";
};

const Page = () => {
  const [chatProcessing, setChatProcessing] = useState(false);
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const endOfChatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLog]);

  useEffect(() => {
    const init = async () => {
      setChatProcessing(true);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: [{ role: "user", content: 'hi' }],
          }),
        });
        
        const data = await response.json();
  
        if (response.ok) {
          setChatLog((prev) => [
            ...prev,
            { role: "assistant", content: data.reply || "No reply received." },
          ]);
        } else {
          console.error("Error:", data.message || "Something went wrong.");
        }
        setChatProcessing(false);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    };
  
    // init();
  }, []);
  

  const handleQuiz = async () => {
  }
    const handleSubmit = async (newMessage: string) => {
    setChatProcessing(true);

    const messageLog: Message[] = [
      ...chatLog,
      { role: "user", content: newMessage },
    ];
    setChatLog(messageLog);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageLog }),
      });

      const data = await response.json();
      if (response.ok) {
        setChatLog((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setChatProcessing(false);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-[#F4FBF9]">
      <Link href="/" className="top-10 absolute left-10 flex gap-1 items-center"><IoIosReturnLeft /> Back</Link>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="pt-4 md:pt-10">
            {chatLog.length > 0 && (
              <div className="relative mx-auto max-w-3xl px-8">
                {chatLog.map((message, index) => (
                  <div key={index}>
                    <ChatMessage message={message} />
                    {index % 2 !== 0 && !(index === chatLog.length - 1) && (
                      <div className="border-b border-gray-900 mb-10"></div>
                    )}
                  </div>
                ))}
                <div ref={endOfChatRef} />
              </div>
            )}
          </div>
        </div>
        <div className="inset-x-0 bottom-0 w-full">
          <div className="mx-auto mb-5 max-w-3xl sm:px-4">
            <ChatPrompt
              isLoading={chatProcessing}
              onSubmit={handleSubmit}
              handleQuiz={handleQuiz}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

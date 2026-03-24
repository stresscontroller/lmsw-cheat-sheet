"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus } from "react-icons/fa";
import { LuTrash } from "react-icons/lu";
import { removeThread } from '@/lib/openAI';

interface Thread {
    id: string;
    title: string;
}

export default function Sidebar() {
    const router = useRouter();
    const [threads, setThreads] = useState<Thread[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

    useEffect(() => {
        const storedThreads = localStorage.getItem('threads');
        const parsedThreads: Thread[] = storedThreads ? JSON.parse(storedThreads) : [];
        if (!Array.isArray(parsedThreads)) {
            console.error("Parsed threads is not an array:", parsedThreads);
            setThreads([]);
        } else {
            setThreads(parsedThreads);
        }

        const storedActiveThreadId = localStorage.getItem('activeThreadId');
        if (storedActiveThreadId) {
            setActiveThreadId(storedActiveThreadId);
        }
    }, [router]);

    async function createChat() {
        setIsLoading(true);
        try {
            const response = await fetch('/api/openai/thread', {
                method: 'GET',
              });
          
              if (!response.ok) {
                throw new Error('Failed to create vector store');
              }
          
              const data = await response.json();
              const title = `Chat ${threads.length + 1}`;
              const newThread = {
                id: data.thread.id,
                title: title
            };
            setThreads(prevThreads => [...prevThreads, newThread]);
            const storedThreads = localStorage.getItem('threads');

            const existingThreads: Thread[] = storedThreads ? JSON.parse(storedThreads) : [];
            // Ensure existingThreads is an array
        if (!Array.isArray(existingThreads)) {
            console.error("Parsed threads is not an array:", existingThreads);
            setThreads([]);
        } else {
            existingThreads.push(newThread);

            localStorage.setItem('threads', JSON.stringify(existingThreads));
            localStorage.setItem('activeThreadId', newThread.id);

        }
        
            
            router.push(`/chatbot/${data.thread.id}`);
        } catch (error) {
            console.error("Error creating chat:", error);
        } finally {
            setIsLoading(false);
        }
    }

    function moveChat(thread: Thread) {
        setActiveThreadId(thread.id);
        localStorage.setItem('activeThreadId', thread.id);
        router.push(`/chatbot/${thread.id}`);
    }

    async function removeChat(threadId: string) {
        const storedThreads = localStorage.getItem('threads');
        const existingThreads: Thread[] = storedThreads ? JSON.parse(storedThreads) : [];
        const updatedThreads = existingThreads.filter(thread => thread.id !== threadId);
        localStorage.setItem('threads', JSON.stringify(updatedThreads));
        await removeThread(threadId);
        setThreads(prevThreads => prevThreads.filter(thread => thread.id !== threadId));
    }

    return (
        <div className="z-50 footer py-10 px-4 mr-3 md:mr-0 flex flex-col items-center bg-[#ffffff] text-sm h-screen border-r-none md:border-r border-[#bac2cc]">
            <h2 className="text-[24px] font-semibold">Chats</h2>
            <button className="mt-[40px] rounded-xl w-full px-5 py-3 text-[16px] bg-blue-100 flex gap-[25px] items-center justify-center" onClick={createChat}>
                <FaPlus />New Chat
            </button>
            <ul className="mt-[20px] w-full flex flex-col gap-[15px]">
                {Array.isArray(threads) && threads.map(thread => (
                    <li key={thread.id} onClick={() => moveChat(thread)} className={`w-full py-2 rounded-xl flex items-center justify-between px-5 cursor-pointer ${activeThreadId === thread.id ? 'bg-blue-100' : 'bg-[#f5f5f5]'}`}>
                        <span>{thread.title}</span>
                        <LuTrash className="text-danger cursor-pointer" onClick={() => removeChat(thread.id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

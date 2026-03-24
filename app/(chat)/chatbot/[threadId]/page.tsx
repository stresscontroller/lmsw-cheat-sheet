'use client';
import { useState, useCallback, useEffect, useReducer } from 'react'
import { useParams } from 'next/navigation';
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  useDisclosure,
} from "@heroui/react";

import { OpenAIMessage } from '@/types';
import Sidebar from '@/app/(chat)/chatbot/_components/Sidebar';
import { Navbar } from '@/app/(chat)/chatbot/_components/Navbar';
import { Chat } from '@/app/(chat)/chatbot/_components/Chat';
import { createMessage, listMessages, runThread } from '@/lib/openAI';

interface PageProps {
  params: Promise<{ threadId: string }>;
}

type State = {
  messages: OpenAIMessage[]
  isLoading: boolean
}

type Action =
  | { type: 'ADD_MESSAGE'; message: OpenAIMessage }
  | { type: 'UPDATE_LAST_MESSAGE'; content: string }
  | { type: 'SET_LOADING'; isLoading: boolean }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.message] }
    case 'UPDATE_LAST_MESSAGE':
      const updatedMessages = [...state.messages]
      updatedMessages[updatedMessages.length - 1].content = action.content
      return { ...state, messages: updatedMessages }
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading }
    default:
      return state
  }
}

export default function Page({ params }: PageProps) {
  const { threadId } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const [assistantId, setAssistantId] = useState<string>('asst_s1POvWutRe7RO9I6yA8R6MJ2');
  const handleOpen = () => {
    onOpen();
    setIsOpenDrawer(!isOpenDrawer);
  };
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    isLoading: false,
  })

  useEffect(() => {
    if (threadId) {
      fetchMessages();
    }
  }, [threadId]);

  const fetchMessages = useCallback(async () => {
    const { threadId } = await params;

    const messages = await listMessages(threadId)
    messages.forEach(message => dispatch({ type: 'ADD_MESSAGE', message }))
  }, [params])
  
  async function handleSubmit(input: string) {
    const { threadId } = await params;

    if (!input.trim()) return;
    const userMessage: OpenAIMessage = {
      content: input,
      role: 'user',
    }
    dispatch({ type: 'ADD_MESSAGE', message: userMessage })
    dispatch({ type: 'SET_LOADING', isLoading: true })

    await createMessage(threadId, userMessage)
    const stream = await runThread(threadId, assistantId)

    dispatch({ type: 'ADD_MESSAGE', message: { role: 'assistant', content: '_Generating response..._' } })
    for await (const v of stream) {
      if (v && v.text !== '') {
        dispatch({ type: 'UPDATE_LAST_MESSAGE', content: v.text })
      }
    }
    dispatch({ type: 'SET_LOADING', isLoading: false })
  };

  return (
    <div className="flex flex-row w-screen h-screen bg-[#F4FBF9]">
    <div className="w-[400px] hidden md:block">
      <Sidebar />
    </div>
    <Drawer isOpen={isOpen} backdrop="blur" placement="left" onOpenChange={onOpenChange} className="rounded-none">
      <DrawerContent className="rounded-none">
        <DrawerBody>
          <Sidebar />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    <div className="flex flex-col w-full bg-[#f0f4f7] ">
      <Navbar
        isOpenDrawer={isOpenDrawer}
        openDrawer={handleOpen}
      />
      <Chat messages={state.messages} handleSubmit={handleSubmit} isLoading={state.isLoading} />
    </div>
  </div>
  );
}

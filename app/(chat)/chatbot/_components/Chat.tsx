'use client'
import React, { useEffect, useRef } from 'react';

import { OpenAIMessage as Message } from '@/types'
import { ChatMessage } from './ChatMessage'
import { ChatPrompt } from './ChatPrompt'
import { IoAttachOutline } from "react-icons/io5";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import Dropzone from './Dropzone';
import { attachFiles, createAssistant, createFile, createMessage, createThread, createVectorStore, runThread, updateAssistant } from '@/lib/openAI';

interface ChatProps {
  messages: Message[]
  handleSubmit: (input: string) => void
  isLoading: boolean
  className?: string
}

export function Chat({ messages, handleSubmit, isLoading }: ChatProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const endOfChatRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  async function uploadFiles(files: FileList) {
    return await Promise.all(
      Array.from(files).map(file => {
        const formData = new FormData()
        formData.append('file', file)
        return createFile(formData)
      }),
    )
  }

  async function handleFilesLoaded(files: FileList) {
    const fileList = await uploadFiles(files)
    const vectorStore = await createVectorStore();
    await attachFiles(
      vectorStore.id,
      fileList.map(file => file.id),
    )
    const thread = await createThread();
    const ass = await createAssistant(vectorStore.id);
    await createMessage(thread.id, {
      content: 'please send me content of file that I attached',
      role: 'user',
    })
    await runThread(thread.id, ass.id)

  }

  

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <Modal backdrop="blur" size="lg" isOpen={isOpen} onClose={onClose} isDismissable={false}
            >
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1">Chat</ModalHeader>
                            <ModalBody>
                                <Dropzone onLoad={handleFilesLoaded}  />
                            </ModalBody>
                        </div>
                    )}
                </ModalContent>
            </Modal>
      <div className="flex-1 overflow-y-auto">
        <div className='pt-4 md:pt-10'>
          {messages.length > 0 && (
            <div className="relative mx-auto max-w-3xl px-8">
              {messages.map((message, index) => (
                <div key={`msg-${index}-${message.content.length}`}>
                  <ChatMessage message={message} />
                  {index % 2 !== 0 && !(index === messages.length - 1) && (
                    <div className="mb-12"></div>
                  )}
                </div>
              ))}
              <div ref={endOfChatRef} />

            </div>
          )}
        </div>
      </div>
      <div className="inset-x-0 bottom-0 w-full bg-[#fcfdff] py-[24px] px-[30px] flex gap-[42px] border-t border-[#dee0e3]">
        <div className=''>
          <button className='flex items-center cursor-pointer p-2 rounded-full shadow-lg border-1 border-gray-200' onClick={()=>{onOpen()}}><IoAttachOutline className='text-[26px]' /></button>
        </div>
        <div className="w-full">
          <ChatPrompt
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

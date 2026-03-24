"use client";
import React, { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
} from "@heroui/react";
import { useRouter } from 'next/navigation'

import { IoIosKey } from "react-icons/io";
import { IoMdLock } from "react-icons/io";
import { createAssistant, createThread, createVectorStore } from "@/lib/openAI";
interface Thread {
    id: string
    title: string
}

const Page = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [submitting, setSubmitting] = useState<boolean>(false);
    const router = useRouter()

    useEffect(() => {
        onOpen();
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const formEntries = new FormData(e.currentTarget as HTMLFormElement);
        const formData = {
            password: formEntries.get("password") as string
        };

        try {
            const response = await fetch(`/api/openai`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: formData.password }),
            });
            const data = await response.json();
            if (data.status === 'ok') {
                const storedThreads = localStorage.getItem('threads')
                if (storedThreads) {
                    const localThread: Thread[] = JSON.parse(storedThreads);
                    localStorage.setItem('activeThreadId', localThread[localThread.length - 1].id);
                    router.push(`/chatbot/${localThread[localThread.length - 1].id}`);
                } else {
                    const thread = await createThread();
                    const title = `Chat 1`;
                    const newThread = [{
                        id: thread.id,
                        title: title
                    }];
                    localStorage.setItem('threads', JSON.stringify(newThread));
                    localStorage.setItem('activeThreadId', thread.id);

                    router.push(`/chatbot/${thread.id}`);
                }
            }

        } catch (error) {
        }
        setSubmitting(false);
    };

    return (
        <div className="flex flex-row w-screen h-screen bg-[#F4FBF9]">
            <Modal backdrop="blur" size="lg" isOpen={isOpen} onClose={onClose} isDismissable={false}
            >
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1">Chat</ModalHeader>
                            <ModalBody>
                                <Input
                                    endContent={
                                        <IoIosKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="OpenAI API Key"
                                    isRequired
                                />
                                <Input
                                    endContent={
                                        <IoMdLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    name="password"
                                    label="Password"
                                    type="password"
                                    isRequired
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-primary text-white" disabled={submitting}>
                                    {submitting ? "Processing..." : "Submit"}
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Page;

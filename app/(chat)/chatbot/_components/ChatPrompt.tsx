"use client";

import { useCallback, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { useEnterSubmit } from "@/hooks/useEnterSubmit";
import { Textarea } from "@heroui/react";
import { IoIosSend } from "react-icons/io";

export function ChatPrompt({
  isLoading,
  onSubmit,
}: {
  isLoading: boolean;
  onSubmit: (input: string) => void;
}) {
  const [input, setInput] = useState("");
  const { formRef, onKeyDown } = useEnterSubmit(isLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input?.trim()) return;

    onSubmit(input);
    setInput("");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row gap-[24px]">
        <Textarea
          isRequired
          className="w-full border rounded-[12px]"
          label=""
          labelPlacement="outside"
          placeholder="Your message ..."
          minRows={6}
          value={input}
          onValueChange={setInput}
        />
        <div className="flex justify-end md:block">
          <button
            className="rounded-full p-2 bg-blue-500 shadow-lg"
            type="submit"
            disabled={isLoading || input?.trim() === ""}
          >
            {" "}
            {isLoading ? (
              <BiLoaderCircle className="text-[26px] animate-spin text-white" />
            ) : (
              <IoIosSend className="text-[26px] text-white" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

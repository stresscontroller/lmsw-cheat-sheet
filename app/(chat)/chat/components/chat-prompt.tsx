"use client";

import { useCallback, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import Textarea from "react-textarea-autosize";
import { useEnterSubmit } from "@/hooks/useEnterSubmit";

export function ChatPrompt({
  isLoading,
  onSubmit,
  handleQuiz,
}: {
  isLoading: boolean;
  onSubmit: (input: string) => void;
  handleQuiz: () => void;
}) {
  const [input, setInput] = useState("");
  const { formRef, onKeyDown } = useEnterSubmit(isLoading);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input?.trim()) return;

    onSubmit(input);
    setInput("");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="flex max-h-60 flex-col  gap-1 rounded-2xl border  p-2">
        <Textarea
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[54px] w-full resize-none bg-transparent p-4 pr-[40px] focus-within:outline-none"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={handleInputChange}
        />

        <div className="flex justify-between">
          <div></div>
          <button
            className="rounded-full px-4 py-2 disabled:opacity-50"
            type="submit"
            disabled={isLoading || input?.trim() === ""}
          >
            {" "}
            {isLoading ? (
              <BiLoaderCircle className="size-6 animate-spin" />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

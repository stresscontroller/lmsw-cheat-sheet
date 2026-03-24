import { FC, memo } from "react";
import { Message } from "@/types";
import { IconOpenAI, IconUser } from "@/components/icons";

export interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: FC<ChatMessageProps> = memo(
  ({ message: { role, content } }) => {
    const getRoleStylesAndIcon = () => {
      if (role === "user") {
        return {
          iconClassName: "bg-background",
          Icon: IconUser,
        };
      }
      return {
        iconClassName: "bg-primary text-primary-foreground",
        Icon: IconOpenAI,
      };
    };

    const { iconClassName, Icon } = getRoleStylesAndIcon();

    return (
      <div className="relative mb-4 flex items-start">
        <div
          className={`${iconClassName} flex size-8 shrink-0 select-none items-center justify-center rounded-2xl border`}
        >
          <Icon />
        </div>
        <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
          <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
            {content}
          </div>
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

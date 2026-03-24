import { SVGProps } from "react";
import { Product } from "@/sanity.types";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type OpenAIMessage = {
  content: string;
  role: "user" | "assistant";
};

export type Message = {
  content: string;
  role: "user" | "system" | "assistant";
};

// Alert
export interface AlertProps {
  message: string;
  type: "success" | "danger" | "warning";
  description?: React.ReactNode;
  duration?: number;
}

// Product
interface BookMarkList {
  order?: number;
  answer?: string;
  isRight?: boolean;
  _key: string;
}

export interface BookMarkProps {
  cheatSheetId: string | string[] | undefined; // Allow undefined
  isDisplay: boolean;
  // list: BookMarkList[];
  pageAction: (pageNumber: number) => void;
  dispalyAction: (isDisplay: boolean) => void;
  currentPage: number;
}

export interface ChapterProps {
  runningHead: string;
  body: Product["body"];
  controlParentNextBtn: (config: boolean) => void;
}

export interface QuizAnswer {
  order: number;
  answer: string;
  reason: string;
  isRight: boolean;
}

export interface QuizProps extends ChapterProps {
  pageNumber: number;
  answerList: QuizAnswer[];
}

export interface TreeNode {
  _id: string;
  title: string;
  children?: TreeNode[];
  start: number,
  end: number
}

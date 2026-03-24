import React, { useState } from "react";

import { BookMarkProps, TreeNode } from "@/types";
import { mainBookMark, mini1BookMark, mini2BookMark, mini3BookMark, mini4BookMark } from "@/config/bookmark";

const TreeNodeComponent: React.FC<{
  node: TreeNode;
  isLast: boolean;
  prefix: string;
  currentPage: number;
  start: number;
  end: number;
  pageAction: (pageNumber: number) => void;
}> = ({ node, isLast, prefix, currentPage, start, end, pageAction }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  // Line styling
  const connector = isLast ? "└─ " : "├─ ";
  const newPrefix = prefix + (isLast ? "   " : "│  ");

  return (
    <>
      <div
        className=" whitespace-pre font-mono p-1 flex flex-row"
      >
        <span onClick={() => hasChildren && setExpanded(!expanded)}>
          {prefix}{connector}{hasChildren && (expanded ? "▼ " : "▶ ")}
        </span>
        <span className="cursor-pointer" onClick={() => hasChildren && setExpanded(!expanded)}>{hasChildren && (expanded ? "▼ " : "▶ ")}</span>
        <span onClick={() => pageAction(start)} className={`cursor-pointer hover:bg-gray-200 p-1 ${currentPage >= start && currentPage <= end ? "bg-gray-300" : ""}`}>{node.title}</span>
      </div>
      {hasChildren && expanded && (
        <>
          {node.children!.map((child, index, arr) => (
            <TreeNodeComponent
              key={child._id}
              node={child}
              isLast={index === arr.length - 1}
              prefix={newPrefix}
              currentPage={currentPage}
              start={child.start}
              end={child.end}
              pageAction={pageAction}
            />
          ))}
        </>
      )}
    </>
  );
};

const Sidebar = (props: BookMarkProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (order: number) => {
    // setActiveIndex(index);
    props.pageAction(order);
  };

  let selectedData: TreeNode[] = [];

  switch (props.cheatSheetId) {
    case "main":
      selectedData = mainBookMark;
      break;
    case "mini-1":
      selectedData = mini1BookMark;
      break;
    case "mini-2":
      selectedData = mini2BookMark;
      break;
    case "mini-3":
      selectedData = mini3BookMark;
      break;
    case "mini-4":
      selectedData = mini4BookMark;
      break;
    default:
      selectedData = [];
  }
  return (
    <div className="overflow-hidden">
      <div
        className={`overflow-y-auto bg-gray-100 fixed h-screen transition-all duration-100 shadow-2xl z-10 ${props.isDisplay ? "w-72" : "w-0 overflow-hidden"} lg:w-72 h-[calc(100vh-46px)] md:h-[calc(100vh-80px)]`}
      >
        <div className="flex flex-col relative">
          <button
            className="bg-gray-200 text-black font-bold p-2 rounded absolute top-2 right-2 block lg:hidden"
            onClick={() => props.dispalyAction(!props.isDisplay)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="mt-[55px] lg:mt-0">
            <div className="tree text-[18px]">
              {selectedData.map((node, index) => (
                <TreeNodeComponent
                  key={node._id}
                  node={node}
                  isLast={index === selectedData.length - 1}
                  prefix=""
                  currentPage={props.currentPage}
                  start={node.start}
                  end={node.end}
                  pageAction={handleItemClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

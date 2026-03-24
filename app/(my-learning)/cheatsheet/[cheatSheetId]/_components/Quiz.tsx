import { PortableText } from "@portabletext/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiZoomIn } from "react-icons/bi";
import { BiZoomOut } from "react-icons/bi";
import { TbZoomReset } from "react-icons/tb";

import { QuizProps } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { ShowAlert } from "@/components/alert";

export default function Quiz(props: QuizProps) {
  const [zoomLevel, setZoomLevel] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [highlight, setHighlight] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      props.controlParentNextBtn(true);
      setSelectedAnswers([]);
      setHighlight(false);
    };
    init();
  }, [props.pageNumber]);

  const zoomIn = () => setZoomLevel((z) => Math.min(z + 1, 3));
  const zoomOut = () => setZoomLevel((z) => Math.max(z - 1, -3));
  const resetZoom = () => setZoomLevel(0);

  const calcFontSize = (base: number, step: number) => {
    return `${base + step * zoomLevel}px`;
  };

  const handleClick = (index: number, isRight: boolean) => {
    if (highlight) {
      return;
    }
    setSelectedAnswers([index]);
  };

  const handleSubmit = () => {
    const correctAnswers = props.answerList
      .map((answer, index) => (answer.isRight ? index : null))
      .filter((index): index is number => index !== null);

    const isAllCorrectSelected = correctAnswers.every((answer) => selectedAnswers.includes(answer));
    const isAnyIncorrectSelected = selectedAnswers.some((answer) => !correctAnswers.includes(answer));

    if (isAllCorrectSelected && selectedAnswers.length === correctAnswers.length) {
      props.controlParentNextBtn(false);

      const allCorrectReasons = props.answerList
        .map((answer, index) => {
          if (answer.isRight && answer.reason) {
            const letter = String.fromCharCode(65 + index);
            return `${answer.reason}`;
          }
          return null;
        })
        .filter((r): r is string => !!r);

      ShowAlert({
        message: `You are right!`,
        type: "success",
        duration: 15000,
        description: (
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
            {allCorrectReasons.map((r, i) => (
              <p key={i}>{r}</p>
            ))}
          </ul>
        ),
      });
      setHighlight(true);
    } else if (isAnyIncorrectSelected) {
      const selectedReasons = selectedAnswers
        .map((index) => {
          const answer = props.answerList[index];
          if (answer?.reason) {
            const letter = String.fromCharCode(65 + index);
            return `${answer.reason}`;
          }
          return null;
        })
        .filter((r): r is string => !!r);

      ShowAlert({
        message: `You are wrong. Please try again.`,
        type: "warning",
        // description: (
        //   <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
        //     {selectedReasons.map((r, i) => (
        //       <p key={i}>{r}</p>
        //     ))}
        //   </ul>
        // ),
      });
      setSelectedAnswers([]);
    } else {
      ShowAlert({
        message: "Please select.",
        type: "danger",
      });
    }
  };


  return (
    <div className="px-[20px] md:px-[40px] lg:px-[60px]">
      <div className="flex gap-2 justify-end my-4">
        <button onClick={zoomOut} className="text-2xl"><BiZoomOut /></button>
        <button onClick={resetZoom} className="text-2xl"><TbZoomReset /></button>
        <button onClick={zoomIn} className="text-2xl"><BiZoomIn /></button>
      </div>
      <div className="font-inter text-[16px] pt-[20px] lg:pt-0 pb-[20px] underline decoration-1 underline-offset-8 text-slate-500">
        {props.runningHead}
      </div>
      <div className="flex flex-wrap">
        <PortableText
          value={props.body ?? []}
          components={{
            block: {
              h1: ({ children }) => (
                <div style={{ fontSize: calcFontSize(60, 5), fontWeight: "bold", width: "100%" }}>
                  {children}
                </div>
              ),
              h2: ({ children }) => (
                <div style={{ fontSize: calcFontSize(50, 5), fontWeight: "bold", width: "100%" }}>
                  {children}
                </div>
              ),
              h3: ({ children }) => (
                <div style={{ fontSize: calcFontSize(42, 4), fontWeight: "bold", width: "100%" }}>
                  {children}
                </div>
              ),
              h4: ({ children }) => (
                <div style={{ fontSize: calcFontSize(36, 4), fontWeight: "bold", width: "100%" }}>
                  {children}
                </div>
              ),
              h5: ({ children }) => (
                <div style={{ fontSize: calcFontSize(30, 3), fontWeight: "bold", width: "100%" }}>
                  {children}
                </div>
              ),
              h6: ({ children }) => (
                <h6 style={{ fontSize: calcFontSize(26, 3), fontWeight: "bold", width: "100%" }}>
                  {children}
                </h6>
              ),
              normal: ({ children }) => (
                <div style={{ fontSize: calcFontSize(18, 2), width: "100%" }}>
                  {children}
                </div>
              ),
            },
            marks: {
              strong: ({ children }) => <strong>{children}</strong>,
              italic: ({ children }) => <em>{children}</em>,
              underline: ({ children }) => (
                <span style={{ textDecoration: "underline" }}>{children}</span>
              ),
              strike: ({ children }) => (
                <span style={{ textDecoration: "line-through" }}>
                  {children}
                </span>
              ),
              code: ({ children }) => (
                <code
                  style={{
                    backgroundColor: "#f4f4f4",
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                >
                  {children}
                </code>
              ),
              customClass: ({ children, value }) => (
                <div className={value.className}>
                  {children}
                </div>
              ),
              link: ({ value, children }) => {
                const { href, blank } = value;
                return (
                  <Link href={href} target={blank ? "_blank" : "_self"} rel={blank ? "noopener noreferrer" : ""} className="text-blue-500 underline">
                    {children}
                  </Link>
                );
              },
            },
            types: {
              image: ({ value }) => (
                <div className={value.className}>
                  <Image
                    src={urlFor(value.asset).url()}
                    alt={value.altText || ""}
                    layout="responsive"
                    width={1}
                    height={1}
                  />
                </div>
              ),
              section: ({ value }) => (
                <div className={value.className}>
                  {value.html && (
                    <div dangerouslySetInnerHTML={{ __html: value.html }} />
                  )}
                  {!value.html && (
                    <PortableText
                      value={value.content}
                      components={{
                        block: {
                          h1: ({ children }) => (
                            <div style={{ fontSize: calcFontSize(60, 5), fontWeight: "bold" }}>
                              {children}
                            </div>
                          ),
                          h2: ({ children }) => (
                            <div style={{ fontSize: calcFontSize(50, 5), fontWeight: "bold" }}>
                              {children}
                            </div>
                          ),
                          h3: ({ children }) => (
                            <div style={{ fontSize: calcFontSize(42, 4), fontWeight: "bold" }}>
                              {children}
                            </div>
                          ),
                          h4: ({ children }) => (
                            <div style={{ fontSize: calcFontSize(36, 4), fontWeight: "bold" }}>
                              {children}
                            </div>
                          ),
                          h5: ({ children }) => (
                            <div style={{ fontSize: calcFontSize(30, 3), fontWeight: "bold" }}>
                              {children}
                            </div>
                          ),
                          h6: ({ children }) => (
                            <h6 style={{ fontSize: calcFontSize(26, 3), fontWeight: "bold" }}>
                              {children}
                            </h6>
                          ),
                          normal: ({ children }) => (
                            <div style={{ fontSize: calcFontSize(18, 2) }}>
                              {children}
                            </div>
                          ),
                        },
                        marks: {
                          strong: ({ children }) => <strong>{children}</strong>,
                          italic: ({ children }) => <em>{children}</em>,
                          underline: ({ children }) => (
                            <span style={{ textDecoration: "underline" }}>
                              {children}
                            </span>
                          ),
                          strike: ({ children }) => (
                            <span style={{ textDecoration: "line-through" }}>
                              {children}
                            </span>
                          ),
                          code: ({ children }) => (
                            <code
                              style={{
                                backgroundColor: "#f4f4f4",
                                padding: "2px 4px",
                                borderRadius: "4px",
                              }}
                            >
                              {children}
                            </code>
                          ),
                          customClass: ({ children, value }) => (
                            <div className={value.className}>
                              {children}
                            </div>
                          ),
                          link: ({ value, children }) => {
                            const { href, blank } = value;
                            return (
                              <Link href={href} target={blank ? "_blank" : "_self"} rel={blank ? "noopener noreferrer" : ""} className="text-blue-500 underline">
                                {children}
                              </Link>
                            );
                          },
                        },
                        types: {
                          image: ({ value }) => (
                            <div className={value.className}>
                              <Image
                                src={urlFor(value.asset).url()}
                                alt={value.altText || ""}
                                layout="responsive"
                                width={1}
                                height={1}
                              />
                            </div>
                          ),
                        },
                      }}
                    />
                  )}
                </div>
              ),
            },
          }}
        />
      </div>
      <div className="flex flex-col items-start gap-5 mt-[40px] ml-[30px]">
        {props.answerList.map((list, index) => {
          const letterIndex = String.fromCharCode(65 + index);
          const isSelected = selectedAnswers.includes(index);
          const isCorrect = list.isRight && highlight;

          return (
            <div
              className="flex cursor-pointer text-[16px]"
              key={index}
              onClick={() => handleClick(index, list.isRight)}
            >
              <p
                className={`w-14 py-4 flex items-center justify-center 
                    ${isSelected ? "bg-gray-700" : "bg-gray-200"}
                    ${isCorrect ? "bg-green-200" : ""}`}
              >
                {letterIndex}
              </p>
              <p
                className={`flex px-4 items-center border-y-2 border-r-2 w-11/12 
                   ${isSelected ? "border-gray-700" : "border-gray-200"}
                   ${isCorrect ? "border-green-200" : ""}`}
              >
                {list.answer}
              </p>
            </div>
          );
        })}
        {!highlight && (
          <button
            onClick={handleSubmit}
            className="mt-[1.5rem] w-36 text-white font-medium shadow-lg text-md px-8 py-3 mt-8 text-center bg-gray-700 hover:bg-gray-800"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

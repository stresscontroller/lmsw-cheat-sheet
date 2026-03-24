"use client";
import React, { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { BiZoomIn } from "react-icons/bi";
import { BiZoomOut } from "react-icons/bi";
import { TbZoomReset } from "react-icons/tb";

import { urlFor } from "@/sanity/lib/image";
import { ChapterProps } from "@/types";

export default function Chapter(props: ChapterProps) {
  const [zoomLevel, setZoomLevel] = useState(0);

  useEffect(() => {
    const init = async () => {
      props.controlParentNextBtn(false);
    };
    init();
  }, [props.controlParentNextBtn]);

  const zoomIn = () => setZoomLevel((z) => Math.min(z + 1, 3));
  const zoomOut = () => setZoomLevel((z) => Math.max(z - 1, -3));
  const resetZoom = () => setZoomLevel(0);

  const calcFontSize = (base: number, step: number) => {
    return `${base + step * zoomLevel}px`;
  };

  return (
    <div className="px-[20px] md:px-[30px] lg:px-[40px]">
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
    </div>
  );
}

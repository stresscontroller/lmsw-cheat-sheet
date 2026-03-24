"use client";
import { useEffect, useState } from "react";

interface AccordionProps {
    title: string;
    id: string;
    active?: boolean;
    content: string;
}

export default function Accordion({
    title,
    id,
    active = false,
    content
}: AccordionProps) {
    const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
    useEffect(() => {
        setAccordionOpen(active);
    }, [active]);

    return (
        <div className="py-5 border-b flex hover:bg-[#D2E8FF4D] faq-item">
            <div className="w-0 lg:w-2/12"></div>
            <div className="w-full lg:w-8/12 px-4">
                <h2>
                    <button
                        className="flex items-start justify-between w-full text-left font-semibold py-2 text-[#161616]"
                        onClick={(e) => {
                            e.preventDefault();
                            setAccordionOpen(!accordionOpen);
                        }}
                        aria-expanded={accordionOpen}
                        aria-controls={`accordion-text-${id}`}
                    >
                        <span className="text-2xl font-ibm font-bold">{title}</span>
                        <svg
                            className="faq-item-btn shrink-0 ml-8"
                            width="16"
                            height="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center transition duration-200 ease-out ${accordionOpen && "!rotate-180"}`}
                            />
                            <rect
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                                className={`transform origin-center rotate-90 transition duration-200 ease-out ${accordionOpen && "!rotate-180"}`}
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id={`accordion-text-${id}`}
                    role="region"
                    aria-labelledby={`accordion-title-${id}`}
                    className={`faq-list-child grid text-lg overflow-hidden transition-all duration-300 ease-in-out ${accordionOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                    <div className="overflow-hidden">
                        <div className="pb-3 text-[#161616]" dangerouslySetInnerHTML={{
                            __html: content || "",
                        }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

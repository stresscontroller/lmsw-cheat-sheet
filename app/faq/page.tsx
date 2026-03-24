"use client";
import React, { useEffect, useState } from "react";

import { Faq } from "@/sanity.types";

import Loading from "@/components/loading";
import Accordion from "@/components/accordion";

export default function Page() {
  const [faqs, setFAQs] = useState<Faq[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const faqres = await fetch("/api/sanity?endpoint=faq", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const faqdata = await faqres.json();
      if (faqdata.length > 0) {
        setFAQs(faqdata);
      }

      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-[#161616] pt-[40px]">
      <div className="flex flex-col items-center" id="faq">
        <p className="text-cblue text-[20px] font-bold">FAQs</p>
        <h3 className="mt-[20px] text-[32px] md:text-[45px] lg:text-[60px] text-[#161616] font-bold text-center">You are probably wondering...</h3>
        <div className="mt-[60px] w-full border-t">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              title={faq.title ?? ""}
              id={`faq-${index}`}
              active={faq.active ?? false}
              content={faq.content ?? ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

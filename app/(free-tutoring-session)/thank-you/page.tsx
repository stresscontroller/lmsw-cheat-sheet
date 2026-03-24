"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Thanks_page } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

import Loading from "@/components/loading";
import { fbq } from '@/lib/fbq';

export default function Page() {
  const [uiData, setUIData] = useState<Thanks_page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem('fbq_lead')) {
      fbq('track', 'Lead');
      sessionStorage.setItem('fbq_lead', 'true');
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("/api/sanity?endpoint=thanks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.length > 0) {
          const arrData: Thanks_page[] = [];
          data.map((row: Thanks_page) => {
            arrData.push(row);
          });
          setUIData(arrData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    init();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-[10px] text-xl min-h-[calc(100vh-350px)] flex flex-col justify-center pb-[30px]">
      {uiData &&
        uiData.map((row, index) => {
          switch (row.type) {
            case "Enroll":
              return (
                <div key={index} className="flex flex-col gap-[20px] items-center">
                  {row.image?.asset?._ref ? (
                    <Image
                      src={urlFor(row.image?.asset?._ref).url()}
                      width={1000}
                      height={1000}
                      alt={row._type || ""}
                      className="w-auto max-h-[500px]"
                    />
                  ) : null}
                  <h3 className="text-[30px] md:text-[50px] leading-[50px] font-poppins text-center font-bold">{row.title}</h3>
                  <div className="mt-[20px] text-[16px] text-center" dangerouslySetInnerHTML={{ __html: row.description || "" }}></div>
                </div>
              );
            default:
              return null;
          }
        })}
    </div>
  );
}

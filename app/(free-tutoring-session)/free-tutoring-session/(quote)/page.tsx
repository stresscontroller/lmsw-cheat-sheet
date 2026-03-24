"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Free_signup_form } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

import Loading from "@/components/loading";
import { PartialDashedLine } from "@/components/shapes";
import BookingMeetingForm from "../_components/BookingMeetingForm";

export default function FreeTutoringSession() {
  const [uiData, setUIData] = useState<Free_signup_form | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("/api/sanity?endpoint=free-signup", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.length > 0) {
          setUIData(data[0]);
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
    <>
      {uiData ? (
        <div className="flex flex-wrap">
          <div className="bg-[#D2E8FF4D] w-full lg:w-6/12 flex justify-center lg:justify-end pl-5 py-[30px] lg:py-[70px]">
            <div className="max-w-xl">
              <div className="flex flex-col">
                <h1 className="text-[30px] font-bold">
                  {uiData.title}
                </h1>
                <div
                  className="mt-[20px] pr-[20px]"
                  dangerouslySetInnerHTML={{ __html: uiData.description || "" }}
                ></div>
              </div>
              <div className="w-full hidden sm:block">
                <div className="h-[260px] xl:h-[300px] w-[90%] min-[1768px]:h-[calc(290px)] min-[1768px]:w-[calc(290px/.546)] relative my-12 mr-auto">
                  {uiData.image?.asset?._ref ? (
                    <Image
                      src={urlFor(uiData.image?.asset?._ref).url()}
                      fill
                      sizes="100"
                      alt="Image of a smiling student holding a laptop next to a form titled ‘Get Real LMSW Exam Help—For Free,’ offering a free 20-minute tutoring session with personalized feedback and live question breakdowns."
                      className="absolute overflow-clip w-[200px] h-[200px]"
                    />
                  ) : null}
                  <PartialDashedLine className="z-10 absolute top-[160px] -right-[50px] h-[130px] lg:h-[200px] lg:-bottom-[130px] xl:-bottom-[100px] lg:-right-[50px] xl:-right-[50px] transform scale-125 -rotate-90 opacity-85" />

                  <div className="absolute bottom-[0rem] left-[.2rem] h-[4.25rem] w-[4.25rem] xl:h-[5rem] xl:w-[5rem] z-10">
                    <Image
                      src={"/images/gifs/docs-icon.gif"}
                      alt="ui illustration"
                      fill
                      className="h-full w-full object-contain"
                      unoptimized
                    />
                  </div>

                  <div className="absolute top-[7rem] -right-9 h-[4.25rem] w-[4.25rem] xl:h-[5rem] xl:w-[5rem] z-10">
                    <Image
                      src={"/images/gifs/id-card_icon_2.gif"}
                      alt="ui illustration"
                      fill
                      className="h-full w-full object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-full lg:w-6/12 flex items-center justify-center lg:justify-start pl-5 lg:pl-[80px] pr-5 py-[30px] lg:py-0">
            <BookingMeetingForm leadStatus="Lead Sign Up" />
          </div>
        </div>
      ) : null}
    </>
  );
}
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Button } from "@heroui/react";

import { About_page } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

import Loading from "@/components/loading";

export default function Page() {
  const [uiData, setUIData] = useState<About_page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("/api/sanity?endpoint=about-us", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.length > 0) {
          const arrData: About_page[] = [];
          data.map((row: About_page) => {
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
    <div className="flex flex-col items-center justify-center text-[#161616]">
      <div className="flex flex-col pt-[30px] lg:pt-[70px] gap-[50px] md:gap-[80px] lg:gap-[150px] w-full justify-center items-center">
        {uiData &&
          uiData.map((row, index) => {
            switch (row.order) {
              case 1:
                return (
                  <div
                    key={index}
                    className="px-10 xl:px-0 max-w-6xl flex flex-col"
                  >
                    <h3 className="hidden md:block md:text-[45px] lg:text-[55px] font-bold">
                      {row.title}
                    </h3>
                    <div className="mt-[36px]">
                      <div>
                        <Image
                          src="/images/author-tablet.png"
                          width={1000}
                          height={1000}
                          alt="Photo of Shifti Kamal, creator of the LMSW Cheat Sheet, next to her quote: ‘I didn’t just pass the LMSW exam—I reverse-engineered it,’ with three additional images of diverse students studying on laptops below."
                          className="block md:hidden mb-8"
                        />
                        {row.image?.file?.asset?._ref ? (
                          <Image
                            src={urlFor(row.image?.file?.asset?._ref ?? '').url()}
                            width={1000}
                            height={1000}
                            alt={row.image.altText || "Photo of Shifti Kamal, creator of the LMSW Cheat Sheet, next to her quote: ‘I didn’t just pass the LMSW exam—I reverse-engineered it,’ with three additional images of diverse students studying on laptops below."}
                            className="hidden lg:block float-right pl-[50px] pb-[50px] w-[50%] h-[50%]"
                          />
                        ) : null}
                        <Image
                          src="/images/author-tablet.png"
                          width={1000}
                          height={1000}
                          alt="Photo of Shifti Kamal, creator of the LMSW Cheat Sheet, next to her quote: ‘I didn’t just pass the LMSW exam—I reverse-engineered it,’ with three additional images of diverse students studying on laptops below."
                          className="hidden md:block lg:hidden float-right pl-[20px] pb-[20px] w-[58%] h-[58%]"
                        />
                        <h3 className="block md:hidden text-[32px] font-bold mb-6">
                          {row.title}
                        </h3>
                        <span
                          className="mt-6 text-[18px] lg:text-[21px]"
                          dangerouslySetInnerHTML={{
                            __html: row.description || "",
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                );
              case 2:
                return (
                  <div
                    key={index}
                    className="flex flex-wrap px-10 xl:px-0 max-w-6xl"
                  >
                    <div>
                      <div className="relative">
                        <div className="absolute right-0 md:left-0 h-[9vw] w-[9vw] md:h-[4rem] md:w-[4rem] lg:h-[4rem] lg:w-[4rem] xl:h-[4.8rem] xl:w-[4.8rem] z-10">
                          <Image
                            src={"/images/gifs/medal_icon.gif"}
                            alt=""
                            fill
                            className="h-full w-full object-contain"
                            unoptimized
                          />
                        </div>
                        <Image
                          src={"/images/win-mobile.png"}
                          width={1000}
                          height={1000}
                          alt="Three students shown studying in different settings—one writing in a notebook, one using a laptop at a desk, and one with hand on head concentrating—placed beside supportive messaging about exam stress and encouragement."
                          className="block md:hidden float-left pb-[50px] w-[100%] h-[100%]"
                        />
                        <Image
                          src={"/images/win-tablet.png"}
                          width={1000}
                          height={1000}
                          alt="Three students shown studying in different settings—one writing in a notebook, one using a laptop at a desk, and one with hand on head concentrating—placed beside supportive messaging about exam stress and encouragement."
                          className="hidden md:block lg:hidden float-left pr-[50px] pb-[50px] w-[53%] h-[53%]"
                        />
                        <Image
                          src={"/images/win-desktop.png"}
                          width={1000}
                          height={1000}
                          alt="Three students shown studying in different settings—one writing in a notebook, one using a laptop at a desk, and one with hand on head concentrating—placed beside supportive messaging about exam stress and encouragement."
                          className="hidden lg:block float-left pr-[50px] pb-[50px] w-[53%] h-[53%]"
                        />
                        <span
                          className="mt-6 text-[18px] lg:text-[21px]"
                          dangerouslySetInnerHTML={{
                            __html: row.description || "",
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                );
              case 3:
                return (
                  <div
                    key={index}
                    className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 px-10 xl:px-0 max-w-6xl"
                  >
                    <div>
                      <div className="relative">
                        {row.image?.file?.asset?._ref ? (
                          <Image
                            src={urlFor(row.image?.file?.asset?._ref ?? '').url()}
                            width={1000}
                            height={1000}
                            alt={row.image.altText || "Student in a cozy rust-colored sweater working on a laptop, next to the headline: ‘Life After the LMSW?’ with text about post-exam goals, creative passions, and living a life aligned with purpose"}
                            className="float-right pl-0 md:pl-[50px] pb-[50px] w-[100%] h-[100%] md:w-[55%] md:h-[55%]"
                          />
                        ) : null}
                        <div className="absolute right-[0%] top-[0%] h-[12vw] w-[12vw] md:h-[4rem] md:w-[4rem] lg:h-[5rem] lg:w-[5rem] xl:h-[6rem] xl:w-[6rem] z-10">
                          <Image
                            src={"/images/gifs/hands_icon.gif"}
                            alt="Student in a cozy rust-colored sweater working on a laptop, next to the headline: ‘Life After the LMSW?’ with text about post-exam goals, creative passions, and living a life aligned with purpose"
                            fill
                            className="h-full w-full object-contain"
                            unoptimized
                          />
                        </div>
                        <h1 className="text-[32px] md:text-[45px] lg:text-[55px] font-bold leading-none">
                          {row.title}
                        </h1>
                        <div className="mt-[40px] text-[18px] lg:text-[21px]" dangerouslySetInnerHTML={{ __html: row.description ?? "" }} />
                      </div>
                    </div>
                  </div>
                );
              case 4:
                return (
                  <div
                    key={index}
                    className="flex flex-wrap px-10 xl:px-0 max-w-6xl"
                  >
                    <div>
                      <div className="relative">
                        {row.image?.file?.asset?._ref ? (
                          <Image
                            src={urlFor(row.image?.file?.asset?._ref ?? '').url()}
                            width={1000}
                            height={1000}
                            alt={row.image.altText || "Smiling student studying with a laptop in a home office, next to headline: ‘Need a Little Extra Help?’ outlining what’s covered in 1:1 strategy sessions, including test-day prep and question breakdowns"}
                            className="float-left pl-0 md:pr-[50px] pb-[50px] w-[100%] h-[100%] md:w-[53%] md:h-[53%]"
                          />
                        ) : null}
                        <div className="absolute left-[0%] top-[0%] h-[12vw] w-[12vw] md:h-[4rem] md:w-[4rem] lg:h-[5rem] lg:w-[5rem] xl:h-[6rem] xl:w-[6rem] z-10">
                          <Image
                            src={"/images/gifs/computer_icon.gif"}
                            alt=""
                            fill
                            className="h-full w-full object-contain"
                            unoptimized
                          />
                        </div>
                        <h1 className="text-[32px] md:text-[45px] lg:text-[55px] font-bold leading-none">
                          {row.title}
                        </h1>
                        <div className="mt-[40px] text-[18px] lg:text-[21px]" dangerouslySetInnerHTML={{ __html: row.description ?? "" }} />
                      </div>
                    </div>
                  </div>
                );
              case 5:
                return (
                  <div
                    key={index}
                    className="w-full flex flex-col md:flex-row bg-cnavy text-white"
                  >
                    <div className="w-full md:w-7/12 flex justify-center px-[40px] py-[50px] lg:py-[100px]">
                      <div className="w-full max-w-[650px]">
                        <h3 className="font-poppins text-[32px] md:text-[45px] lg:text-[55px] font-bold">
                          {row.title}
                        </h3>
                        <div className="mt-[30px] flex flex-col xl:flex-row gap-4 xl:gap-8">
                          <Button
                            as={NextLink}
                            href="/enroll-now"
                            size="lg"
                            radius="full"
                            className="font-semibold bg-corange"
                          >

                            ENROLL NOW
                          </Button>
                          <Button
                            as={NextLink}
                            href="/free-tutoring-session"
                            size="lg"
                            radius="full"
                            className="font-semibold bg-white"
                          >
                            FREE TUTORING SESSION
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-5/12 h-96 md:h-auto relative overflow-visible">
                      <Image
                        aria-hidden
                        src={"/images/landing_sec4_mobile.png"}
                        alt=""
                        fill
                        className="h-full w-full absolute object-cover md:hidden"
                      />
                      <Image
                        aria-hidden
                        src={"/images/landing_sec4_tablet.png"}
                        alt=""
                        fill
                        className="h-full w-full absolute object-cover hidden md:block lg:hidden"
                      />
                      <Image
                        aria-hidden
                        src={"/images/landing_sec4_desktop.png"}
                        alt=""
                        fill
                        className="h-full w-full absolute object-cover hidden lg:block z-20"
                      />
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
}

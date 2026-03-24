"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Button } from "@heroui/react";

import { MyLearning } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

import Loading from "@/components/loading";

export default function Page() {
  const [uiData, setUIData] = useState<MyLearning[]>([]);
  const [loading, setLoading] = useState(true);
  const [flyer, setFlyer] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("/api/sanity?endpoint=my-learning", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.length > 0) {
          const arrData: MyLearning[] = [];
          data.map((row: MyLearning) => {
            arrData.push(row);
          });
          setUIData(arrData);
        }
      } catch (error) {
        console.error("Error : ", error);
      }
      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return <Loading />;
  }


  return (
    <div className="flex flex-col items-center justify-center text-[#161616] border-t-2 border-white">
      {uiData && uiData.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)).map((row, index) => {
        switch (row.order) {
          case 1:
            return (
              <div
                key={index}
                className="bg-cnavy w-full text-white py-[100px] flex flex-col items-center"
              >
                <h1
                  className="font-bold text-[32px] md:text-[45px] lg:text-[55px] text-center"
                  dangerouslySetInnerHTML={{
                    __html: row.title || "",
                  }}
                ></h1>
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: row.description || "",
                  }}
                ></div>
              </div>
            );
          case 2:
            return (
              <div key={index} className="flex flex-col-reverse md:flex-row gap-10 w-full justify-between bg-[#F2F8FF] pb-[50px] md:pb-0">
                <div className="px-[20px] md:px-[50px] md:py-[50px] w-full md:w-[55%] lg:w-[60%] lg:py-28">
                  <h3 className="text-[32px] md:text-[45px] lg:text-[55px] font-semibold mt-2">
                    {row.title}
                  </h3>
                  <div
                    className="text-lg font-extraligt mt-8"
                    dangerouslySetInnerHTML={{
                      __html: row.description || "",
                    }}>
                  </div>
                  <div className="mt-12 flex justify-center md:justify-start">
                    <Button
                      as={NextLink}
                      href="/cheatsheet/main"
                      size="lg"
                      radius="full"
                      className="font-bold text-lg bg-corange font-karla"
                    >
                      START STUDYING NOW
                    </Button>

                  </div>
                </div>
                <div className="w-full h-[300px] md:h-auto md:w-[50%] relative">
                  <Image
                    aria-hidden
                    src={"/images/landing_sec4_mobile.png"}
                    alt="ui illustration"
                    fill
                    className="h-full w-full absolute object-cover md:hidden"
                  />
                  <Image
                    aria-hidden
                    src={"/images/landing_sec4_tablet.png"}
                    alt="ui illustration"
                    fill
                    className="h-full w-full absolute object-cover hidden md:block lg:hidden"
                  />
                  <Image
                    aria-hidden
                    src={"/images/in.png"}
                    alt="ui illustration"
                    fill
                    className="h-full w-full absolute object-cover hidden lg:block"
                  />
                </div>
              </div>
            );
          case 3:
            return (
              <div key={index} className="flex flex-col md:flex-row gap-10 justify-center items-center bg-white py-[100px] px-[20px]">
                <div className="w-full md:w-6/12">
                  <Image
                    src={urlFor(row.image?.file?.asset?._ref ?? '').url()}
                    alt={row.image?.altText || ""}
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className="w-full md:w-6/12">
                  <h3 className="text-[32px] md:text-[45px] lg:text-[55px] font-semibold mt-2">
                    {row.title}
                  </h3>
                  <div
                    className="text-lg mt-8"
                    dangerouslySetInnerHTML={{
                      __html: row.description || "",
                    }}
                  ></div>
                  <div className="flex justify-center md:justify-start mt-12">
                    <div className="relative">
                      <Button
                        className="group inline-flex items-center justify-center font-semibold text-lg bg-corange"
                        size="lg"
                        radius="full"
                        onPress={() => setFlyer(!flyer)}
                      >
                        <span className="text-lg font-bold font-karla">ACCESS QUICK-REFERENCE GUIDES</span>
                        <svg
                          className={
                            flyer === true
                              ? "transform rotate-180 ml-2 h-5 w-5 transition ease-out duration-200"
                              : "transform rotate-0 transition ease-out duration-200 ml-2 h-5 w-5"
                          }
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                      <div
                        onMouseLeave={() => setFlyer(false)}
                        className={
                          flyer
                            ? " block translate-y-0 transition ease-out duration-200 absolute z-10 -ml-4 mt-3 transform w-[320px] left-[20px]"
                            : " hidden translate-y-1 absolute z-10 -ml-4 mt-3 transform w-[320px] left-[20px]"
                        }
                      >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid bg-white py-4">
                            <div className="p-3 flex flex-col gap-1">
                              <NextLink
                                href="/cheatsheet/mini-1"
                                className="text-base font-medium text-gray-700 hover:bg-gray-200 rounded-lg p-2"
                              >
                                1) Psych Meds Snapshot: LMSW Review
                              </NextLink>
                              <NextLink
                                href="/cheatsheet/mini-2"
                                className="text-base font-medium text-gray-700 hover:bg-gray-200 rounded-lg p-2"
                              >
                                2) Crisis Management Mastery: Breakdown & Strategy
                              </NextLink>
                              <NextLink
                                href="/cheatsheet/mini-3"
                                className="text-base font-medium text-gray-700 hover:bg-gray-200 rounded-lg p-2"
                              >
                                3) DSM Diagnostic Circle: Full Series (Parts 1–3)
                              </NextLink>
                              <NextLink
                                href="/cheatsheet/mini-4"
                                className="text-base font-medium text-gray-700 hover:bg-gray-200 rounded-lg p-2"
                              >
                                4) Social Policy & Legal Essentials: Rapid Review
                              </NextLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          case 4:
            return (
              <div key={index} className="w-full px-[20px] pb-[50px]">
                <div className="w-full bg-gradient-to-r from-[#02076f] to-[#02013c] flex flex-col-reverse md:flex-row justify-between rounded-xl">
                  <div className="w-full md:w-[50%] px-[20px] md:px-[50px] py-[50px] text-white">
                    <p className="text-[20px] text-corange font-bold">
                      PREMIUM SESSION
                    </p>
                    <h3 className="text-[32px] md:text-[45px] lg:text-[55px] font-semibold mt-2">
                      {row.title}
                    </h3>
                    <div className="flex gap-[8px] text-cpeach">
                      <span className="text-[32px]">$70</span>
                      <span className="mt-2">/</span>
                      <span className="mt-2">sessions</span>
                    </div>
                    <div
                      className="text-lg font-extraligt mt-3"
                      dangerouslySetInnerHTML={{
                        __html: row.description || "",
                      }}
                    >
                    </div>
                    <div className="flex justify-center md:justify-start mt-12">
                      <Button
                        as={NextLink}
                        href="/schedule-call"
                        size="lg"
                        radius="full"
                        className="font-bold text-lg bg-corange font-karla"
                      >
                        BOOK YOUR SESSION
                      </Button>
                    </div>
                  </div>
                  <div className="md:h-auto md:w-[50%] flex gap-[10px] items-center">
                    <div className="w-full h-auto pt-[50px] md:pt-0 px-[20px] md:px-0">
                      {row.image?.file?.asset?._ref ? (
                        <Image
                          src={urlFor(row.image?.file?.asset?._ref ?? '').url()}
                          width={900}
                          height={900}
                          alt={row.image.altText || ""}
                          className="w-full h-full"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </div >
  );
}

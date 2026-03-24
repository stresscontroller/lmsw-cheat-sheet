"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { Button } from "@heroui/react";

import { Home_page } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

import { DashedLine, PartialDashedLine } from "@/components/shapes";
import Loading from "@/components/loading";
import Benefit from "./(home)/_components/Benefit";
import Process from "./(home)/_components/Process";
import Feedback from "./(home)/_components/Feedback";
import Inside from "./(home)/_components/Inside";
import PopUp from "./(home)/_components/PopUp";

const ONE_DAY = 24 * 60 * 60 * 1000;

export default function Home() {
  const [uiData, setUIData] = useState<Home_page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("lastPopupShown");
    const now = Date.now();

    if (!lastShown || now - parseInt(lastShown, 10) > ONE_DAY) {
      const delay = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("lastPopupShown", now.toString());
      }, 800);

      return () => clearTimeout(delay);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/sanity?endpoint=home", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.length > 0) {
          const arrData: Home_page[] = [];
          data.map((row: Home_page) => {
            arrData.push(row);
          });
          setUIData(arrData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    setLoading(false);
    init();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap w-full mt-0">
      <PopUp isOpen={showPopup} onClose={() => setShowPopup(false)} />
      <div className="w-full border-t-2 border-white justify-center flex flex-col text-[#161616]">
        {uiData &&
          uiData.map((row, index) => {
            switch (row.order) {
              case 1:
                return (
                  <div
                    key={index}
                    className="bg-cnavy min-h-[90vh] flex justify-center py-[90px] xl:py-[150px] px-[20px]"

                  >
                    <div className="w-full max-w-[1200px] flex flex-col lg:flex-row gap-[50px] lg:gap-[20px] justify-center items-center">
                      <div className="w-full lg:w-6/12 xl:w-7/12 flex justify-center text-white">
                        <div className="w-[750px] space-y-[30px] xl:space-y-[50px]">
                          <h1
                            className="text-center md:text-start text-[32px] md:text-[45px] lg:text-[55px] leading-none font-bold"
                          >
                            {row.title}
                          </h1>
                          <div className="text-center md:text-start text-[16px] lg:text-[21px]">
                            {row.description}
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <Button
                              as={NextLink}
                              href="/enroll-now"
                              size="lg"
                              radius="full"
                              className="text-[18px] bg-corange font-bold"
                            >
                              ENROLL NOW
                            </Button>
                            <Button
                              as={NextLink}
                              href="/free-tutoring-session"
                              size="lg"
                              radius="full"
                              className="text-[18px] bg-white font-bold">
                              FREE TUTORING SESSION
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 xl:w-5/12 flex justify-center">
                        <Image
                          aria-hidden
                          src={urlFor(row.image?.file?.asset?._ref ?? '').url()}
                          alt={row.image?.altText || "Mockups of The LMSW Cheat Sheet displayed on desktop, tablet, and phone screens with diverse student photos, under headline: ‘The Smartest Way to Pass."}
                          width={1000}
                          height={1000}
                          className="w-[650px] lg:w-full"
                        />
                      </div>
                    </div>
                  </div>
                );
              case 2:
                return (
                  <Inside key={index} />
                );
              case 3:
                return (
                  <div key={index} className="flex justify-center bg-gradient-to-r from-[#fff9f7] to-[#f1f8ff] py-[50px] md:py-[80px] lg:py-[150px] px-[20px]">
                    <div className="w-full max-w-[1200px]">
                      <div className="flex flex-col-reverse md:flex-row items-center gap-[50px]">
                        <div className="flex flex-col items-center text-[18px]">
                          <Image
                            aria-hidden
                            src={"/images/author.png"}
                            alt="Photo of Shifti Kamal next to her quote: ‘I didn’t just pass the LMSW exam—I reverse-engineered it.’ Below is a three-step student journey: Step 1 Free tutoring, Step 2 Cheat Sheet + Deep Dives, and Step 2 Premium Session"
                            width={1000}
                            height={1000}
                            className="w-[420px] lg:w-[700px]"
                          />
                          <p className="text-corange mt-[15px] font-bold font-poppins">SHIFTI KAMAL, LMSW</p>
                          <p className="mt-[10px] font-poppins">Author</p>
                        </div>
                        <div className="text-[32px] md:text-[45px] lg:text-[55px] font-bold leading-none">
                          “I didn’t just pass the LMSW exam<span className="text-corange">—I reverse-engineered it</span>.”
                        </div>
                      </div>
                      <div className="mt-[50px] md:mt-[80px] mt-[150px] w-full flex justify-center">
                        <div className="w-full flex flex-col items-center">
                          <p className="text-[20px] text-center text-cnavy font-bold">
                            {row.type}
                          </p>
                          <h1
                            className="mt-[20px] text-[#161616] text-[32px] md:text-[45px] lg:text-[55px] text-center font-bold"
                            dangerouslySetInnerHTML={{
                              __html: row.title || "",
                            }}
                          ></h1>
                          <Process />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              case 4:
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row w-full justify-between bg-cnavy gap-[50px] md:gap-0"
                  >
                    <div className="w-full md:w-7/12 px-[20px] py-[30px] lg:py-[60px] flex justify-center">
                      <div className="w-full max-w-[650px]">
                        <p className="text-[20px] text-cpeach font-bold">
                          {row.type}
                        </p>
                        <h3 className="mt-[20px] text-white text-[32px] md:text-[45px] lg:text-[55px] mt-2 font-semibold leading-none">
                          {row.title}
                        </h3>

                        <div className="text-slate-200 text-lg font-extraligt mt-8" dangerouslySetInnerHTML={{
                          __html: row.description || "",
                        }}>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-4 xl:gap-8 mt-12">
                          <Button
                            as={NextLink}
                            href="/enroll-now"
                            size="lg"
                            radius="full"
                            className="font-bold text-lg bg-corange"
                          >
                            ENROLL NOW
                          </Button>
                          <Button
                            as={NextLink}
                            href="/free-tutoring-session"
                            color="secondary"
                            size="lg"
                            radius="full"
                            className="font-bold text-lg bg-cnavy text-white border-2 border-white"
                          >
                            FREE TUTORING SESSION
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-5/12 h-96 md:h-auto relative">
                      <Image
                        aria-hidden
                        src={"/images/landing_sec4_mobile.png"}
                        alt="Screenshot of four LMSW Cheat Sheet pages displayed at an angle, next to the headline: ‘Studying harder won’t save you—studying smarter will,’ with bullet points highlighting strategy over memorization"
                        fill
                        className="h-full w-full absolute object-cover md:hidden"
                      />
                      <Image
                        aria-hidden
                        src={"/images/landing_sec4_tablet.png"}
                        alt="Screenshot of four LMSW Cheat Sheet pages displayed at an angle, next to the headline: ‘Studying harder won’t save you—studying smarter will,’ with bullet points highlighting strategy over memorization"
                        fill
                        className="h-full w-full absolute object-cover hidden md:block lg:hidden"
                      />
                      <Image
                        aria-hidden
                        src={"/images/landing_sec4_desktop.png"}
                        alt="Screenshot of four LMSW Cheat Sheet pages displayed at an angle, next to the headline: ‘Studying harder won’t save you—studying smarter will,’ with bullet points highlighting strategy over memorization"
                        fill
                        className="h-full w-full absolute object-cover hidden lg:block"
                      />
                    </div>
                  </div>
                );
              case 5:
                return (
                  <div key={index} className="w-full flex flex-col gap-[50px] md:gap-[80px] lg:gap-[150px] bg-gradient-to-r from-[#fff9f7] to-[#f1f8ff] py-[50px] md:py-[80px] lg:py-[130px]">
                    <div
                      className="w-full flex justify-center px-10 text-cnavy px-[20px]"
                    >
                      <div className="w-full max-w-[1200px] flex flex-col items-center bg-[#E8F3FF] rounded-2xl pt-[40px]">
                        <p className="text-[20px] text-center text-cblue font-bold">
                          {row.type}
                        </p>
                        <h1 className="text-[32px] md:text-[45px] lg:text-[55px] text-center mt-[20px] px-[20px] font-bold">
                          {row.title}
                        </h1>
                        <div className="flex flex-col lg:flex-row">
                          {row.lists &&
                            row.lists.map((list, index) => (
                              <Benefit key={index} {...list} />
                            ))}
                        </div>
                      </div>
                    </div>
                    <Feedback />
                    <div
                      className="w-full px-[20px] flex justify-center"
                    >
                      <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-[15px] relative h-full">
                        <div className="w-full lg:w-7/12 flex justify-center">
                          <div className="w-full">
                            <p className="text-cblue text-[20px] font-bold">Unlock Your Success with Free 1:1 Support</p>
                            <h1 className="mt-4 font-bold text-[32px] md:text-[45px] lg:text-[55px] leading-none text-cblue">
                              Book a <span className="text-corange">free 20-minute</span> tutoring session with an LMSW who’s been there.
                            </h1>
                            <div className="mt-10 hidden md:flex">
                              <Button
                                as={NextLink}
                                href="/free-tutoring-session"
                                size="lg"
                                radius="full"
                                className="font-bold text-lg bg-corange z-40"
                              >
                                FREE TUTORING SESSION
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="w-11/12 md:w-full lg:w-5/12 h-[28rem] md:h-auto lg:h-[28rem] relative mx-auto">
                          <DashedLine className="hidden lg:block absolute lg:top-[95px] xl:top-[95px] right-0 h-full float-end scale-125 lg:h-[300px] xl:h-[330px]" />
                          <PartialDashedLine className="h-[200px] top-[10px] sm:top-[120px] md:h-[400px] md:-top-[65px] lg:hidden absolute  right-8 float-end scale-75" />
                          {row.image?.file?.asset?._ref ? (
                            <Image
                              src={urlFor(row.image?.file?.asset?._ref ?? '').url()}
                              alt={row.image.altText || "Photos of two students on laptops next to headline: ‘Book a free 20-minute tutoring session with an LMSW who’s been there,’ with a call-to-action button below."}
                              width={1000}
                              height={1000}
                              className="absolute w-full z-40"
                            />
                          ) : null}
                          <div className="absolute top-[20px] right-[120px] md:top-[2rem] lg:top-[33px] lg:right-[180px] xl:top-[30px] h-10 w-10  lg:h-12 lg:w-12">
                            <Image
                              src={"/images/gifs/calendar_icon.gif"}
                              alt=""
                              fill
                              className="absolute h-full w-full object-contain"
                              unoptimized
                            />
                          </div>

                          <div className="absolute bottom-[140px] left-14 md:bottom-[50px] lg:bottom-[5px] lg:left-48 xl:-bottom-[30px] xl:left-[220px] h-10 w-10 lg:h-12 lg:w-12">
                            <Image
                              src={"/images/gifs/id-card_icon_1.gif"}
                              alt=""
                              fill
                              className="h-full w-full object-contain"
                              unoptimized
                            />
                          </div>
                        </div>

                        <div className="md:hidden mx-10">
                          <Button
                            as={NextLink}
                            href="/free-tutoring-session"
                            color="secondary"
                            size="lg"
                            radius="full"
                            className="font-bold text-lg border-2 border-white z-40"
                          >
                            FREE TUTORING SESSION
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })}
      </div>
    </div>
  )
}
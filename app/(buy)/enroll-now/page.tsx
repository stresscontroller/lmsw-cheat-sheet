"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

import { Enrollnow_page } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

import Loading from "@/components/loading";
import Inside from "@/app/(home)/_components/Inside";
import Feedback from "@/app/(home)/_components/Feedback";

export default function Page() {
  const [uiData, setUIData] = useState<Enrollnow_page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("/api/sanity?endpoint=enroll-now", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.length > 0) {
          const arrData: Enrollnow_page[] = [];
          data.map((row: Enrollnow_page) => {
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
    <div className="flex flex-col items-center justify-center text-[#161616] py-[30px] lg:py-[70px]">
      <div className="w-full flex flex-col items-center gap-[50px] md:gap-[80px] lg:gap-[150px]">
        {uiData && uiData.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)).map((row, index) => {
          switch (row.order) {
            case 1:
              return (
                <div
                  key={index}
                  className="w-full max-w-[1200px] flex flex-col-reverse lg:flex-row gap-4 lg:gap-8 px-[20px]"
                >
                  <div className="w-full lg:w-1/2">
                    <h3 className="text-[32px] md:text-[45px] lg:text-[55px] font-bold leading-none">
                      {row.title}
                    </h3>
                    <div
                      className="mt-3 lg:mt-6 text-lg"
                      contentEditable={false}
                      dangerouslySetInnerHTML={{
                        __html: row.description || "",
                      }}
                    ></div>
                    <div className="mt-6 flex flex-row gap-4 justify-center md:justify-start">
                      <Button
                        as={NextLink}
                        href="/check-out"
                        size="lg"
                        radius="full"
                        className="font-karla font-bold bg-corange"
                      >
                        Buy And Enroll Now
                      </Button>
                    </div>
                  </div>
                  <div className="relative w-full sm:w-[70%] mx-auto lg:w-1/2 my-auto">
                    <div className="absolute -top-5 lg:-top-24 -right-4 lg:-right-0 block select-none">
                      <p className="text-lg font-semibold ml-5 leading-10">
                        Price:
                      </p>
                      <p className="text-[20px] lg:text-[30px] bg-corange py-1 px-2 md:py-[5px] md:px-8 rounded-full font-bold">
                        {row.price}
                      </p>
                    </div>
                    {row.image?.asset?._ref ? (
                      <Image
                        src={urlFor(row.image?.asset?._ref).url()}
                        width={1000}
                        height={1000}
                        alt="Visual mockups of the LMSW Cheat Sheet on various devices, with price tag $149.95, next to headline: ‘Master the LMSW Exam—Without the Stress,’ and bullet points highlighting pattern recognition, anti-memorization strategies, and proven study habits."
                        className="rounded-xl w-full"
                      />
                    ) : null}
                  </div>
                </div>
              );
            case 2:
              return (
                <Inside key={index} />
              );
            case 3:
              return (
                <div key={index} className="w-full max-w-[1200px] flex flex-wrap px-[20px]">
                  <h3 className="text-[32px] md:text-[45px] lg:text-[60px] md:hidden md:mb-[20px] pb-5">
                    {row.title}
                  </h3>
                  <div className="w-full max-md:h-[60vw] md:w-[40%] lg:w-1/2 relative flex mx-auto items-center">
                    <div className="relative">
                      <Image
                        src={"/images/enroll-desktop.png"}
                        width={1000}
                        height={1000}
                        alt="Two students studying: one working on a laptop with a coffee mug, and one seated at a desk with a book and laptop, next to headline: ‘Why it Works,’ highlighting LMSW Cheat Sheet’s strategy-based exam prep"
                        className="lg:pr-7 bock md:hidden lg:block z-10"
                      />
                      <Image
                        src={"/images/enroll-tablet.png"}
                        width={1000}
                        height={1000}
                        alt="Two students studying: one working on a laptop with a coffee mug, and one seated at a desk with a book and laptop, next to headline: ‘Why it Works,’ highlighting LMSW Cheat Sheet’s strategy-based exam prep"
                        className="hidden md:block lg:hidden"
                      />
                      <div className="absolute top-0 right-[0rem] lg:right-[1.7rem] h-[11.2vw] w-[11.2vw] md:h-[4.2rem] md:w-[4.2rem] lg:h-[3.8rem] lg:w-[3.8rem] xl:h-[4.5rem] xl:w-[4.5rem] z-10">
                        <Image
                          src={"/images/gifs/money_icon.gif"}
                          alt=""
                          fill
                          className="h-full w-full object-contain"
                          unoptimized
                        />
                      </div>
                      <div className="md:hidden lg:block absolute bottom-0 left-[25%] h-[11.2vw] w-[11.2vw] md:h-[4.2rem] md:w-[4.2rem] lg:h-[3.8rem] lg:w-[3.8rem] xl:h-[4.5rem] xl:w-[4.5rem] z-10">
                        <Image
                          src={"/images/gifs/doc-check_icon.gif"}
                          alt=""
                          fill
                          className="h-full w-full object-contain"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex-1 lg:w-1/2 pr-0 md:pl-8 mt-6 md:mt-0">
                    <h3 className="text-[32px] md:text-[45px] lg:text-[55px] font-bold hidden md:block">
                      {row.title}
                    </h3>
                    <div
                      className="mt-6"
                      dangerouslySetInnerHTML={{
                        __html: row.description || "",
                      }}
                    ></div>
                    <div className="mt-6 flex flex-row gap-4 justify-center md:justify-start">
                      <Button
                        as={NextLink}
                        href="/check-out"
                        size="lg"
                        radius="full"
                        className="font-bold bg-corange"
                      >
                        Buy And Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              );
            case 4:
              return (
                <div key={index} className="w-full mb-[50px] md:mb-[80px] lg:mb-[150px] ">
                  <Feedback />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
      <h3 className="w-full text-center text-[32px] md:text-[45px] lg:text-[55px] text-center font-bold max-w-[700px] mb-[30px]">
        LMSW Cheat Sheet vs. Other Study Guides
      </h3>
      <Table aria-label="Example static collection table" className="w-full max-w-[1200px] px-[20px]">
        <TableHeader className="!bg-transparent" >
          <TableColumn><span className="text-xl text-black">What Matters</span></TableColumn>
          <TableColumn><span className="text-xl text-black">LMSW Cheat Sheet</span></TableColumn>
          <TableColumn><span className="text-xl text-black">Other Study Guides</span></TableColumn>
        </TableHeader>
        <TableBody className="bg-red-500">
          <TableRow key="1">
            <TableCell>
              <div className="flex gap-[10px] items-center">
                <Image
                  src={"/images/icons/enrollnow-table-1.svg"}
                  width={45}
                  height={45}
                  alt=""
                />
                <span className="font-bold">How You Study</span>
              </div>
            </TableCell>
            <TableCell>
              <p><span className="text-success text-[20px]">✓</span> Step-by-step strategy for breaking down questions</p>
            </TableCell>
            <TableCell>
              <p><span className="text-danger text-[20px]">✗</span> Memorize hundreds of pages with no clear approach</p>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>
              <div className="flex gap-[10px] items-center">
                <Image
                  src={"/images/icons/enrollnow-table-2.svg"}
                  width={45}
                  height={45}
                  alt=""
                  className=""
                />
                <span className="font-bold">What You Learn</span>
              </div>
            </TableCell>
            <TableCell>
              <p><span className="text-success text-[20px]">✓</span> Pattern recognition & test logic to predict correct answers</p>
            </TableCell>
            <TableCell>
              <p><span className="text-danger text-[20px]">✗</span> Too much content, not enough strategy—leads to second-guessing</p>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>
              <div className="flex gap-[10px] items-center">
                <Image
                  src={"/images/icons/enrollnow-table-3.svg"}
                  width={45}
                  height={45}
                  alt=""
                  className=""
                />
                <span className="font-bold">Time & Efficiency</span>
              </div>
            </TableCell>
            <TableCell>
              <p><span className="text-success text-[20px]">✓</span> Short & targeted—built for busy schedules</p>
            </TableCell>
            <TableCell>
              <p><span className="text-danger text-[20px]">✗</span> Takes months—too much material, not enough focus</p>
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>
              <div className="flex gap-[10px] items-center">
                <Image
                  src={"/images/icons/enrollnow-table-4.svg"}
                  width={45}
                  height={45}
                  alt=""
                  className=""
                />
                <span className="font-bold">Support & Guidance</span>
              </div>
            </TableCell>
            <TableCell>
              <p><span className="text-success text-[20px]">✓</span> Includes a free 1:1 tutoring session to fine-tune your weaknesses</p>
            </TableCell>
            <TableCell>
              <p><span className="text-danger text-[20px]">✗</span> No personalized help—just read and hope for the best</p>
            </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>
              <div className="flex gap-[10px] items-center">
                <Image
                  src={"/images/icons/enrollnow-table-5.svg"}
                  width={45}
                  height={45}
                  alt=""
                  className=""
                />
                <span className="font-bold">Test Day Readiness</span>
              </div>
            </TableCell>
            <TableCell>
              <p><span className="text-success text-[20px]">✓</span> Recognize trick questions instantly and feel in control</p>
            </TableCell>
            <TableCell>
              <p><span className="text-danger text-[20px]">✗</span> Overwhelmed, second-guessing every answer</p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

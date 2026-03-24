"use client";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { Product } from "@/sanity.types";
import { useParams } from 'next/navigation';

import Loading from "@/components/loading";
import Chapter from "../_components/Chapter";
import BookMark from "../_components/BookMark";
import Quiz from "../_components/Quiz";
import { fbq } from '@/lib/fbq';

import { QuizAnswer } from "@/types";

export default function Page() {
  const { cheatSheetId } = useParams();

  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [isBookMarkDisplay, setBookMarkDisplay] = useState(false);

  useEffect(() => {
    const hasFired = sessionStorage.getItem('fbq_viewcontent');
    if (!hasFired && cheatSheetId === "main") {
      fbq('track', 'ViewContent');
      sessionStorage.setItem('fbq_viewcontent', 'true');
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(`/api/sanity?endpoint=${cheatSheetId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error : ", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleDisableNextButton = (config: boolean) => {
    setNextButtonDisabled(config);
  };

  const renderBody = () => {
    const page = product.find((p) => p.pageNumber === currentPage);

    if (page) {
      if (page.type === "chapter") {
        return (
          <>
            <Chapter
              runningHead={page.runningHead ?? ""}
              body={page.body}
              controlParentNextBtn={handleDisableNextButton}
            />
          </>
        );
      } else if (page.type === "quiz") {
        const answersList: QuizAnswer[] = [];
        page.answerList?.map((list) => {
          answersList.push({
            order: list.order ?? 0,
            answer: list.answer ?? "",
            reason: list.reason ?? "",
            isRight: list.isRight ?? false,
          });
        });
        return (
          <>
            <Quiz
              pageNumber={page.pageNumber ?? 0}
              runningHead={page.runningHead ?? ""}
              body={page.body}
              answerList={answersList}
              controlParentNextBtn={handleDisableNextButton}
            />
          </>
        );
      }
    } else {
      return <h1>Invalid Page</h1>;
    }
  };

  const handleNext = () => {
    if (currentPage < product.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col relative">
      <button
        className="absolute block lg:hidden bg-gray-200 text-black font-bold mt-2 ml-5 py-2 p-2 rounded"
        onClick={() => setBookMarkDisplay(!isBookMarkDisplay)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <BookMark
        cheatSheetId={cheatSheetId}
        isDisplay={isBookMarkDisplay}
        pageAction={setCurrentPage}
        dispalyAction={setBookMarkDisplay}
        currentPage={currentPage}
      />
      <div className="flex flex-col flex-1 !overflow-hidden">
        <div
          className={`flex-1 lg:ml-72 overflow-y-auto ${isBookMarkDisplay ? "opacity-25" : ""}`}
        >
          <div className="h-[calc(100vh-140px)]">
            {renderBody()}
          </div>
        </div>
        <div className="lg:ml-72 text-center flex justify-center items-center gap-6 h-10">
          <button
            className="text-[22px] text-slate-800 disabled:text-slate-400"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>

          <div className="font-inter text-[16px]">{currentPage}</div>
          <button
            className="text-[22px] text-slate-800 disabled:text-slate-400"
            onClick={handleNext}
            disabled={nextButtonDisabled || currentPage === product.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

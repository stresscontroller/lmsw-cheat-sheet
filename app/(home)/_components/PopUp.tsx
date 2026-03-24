import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TailwindModal({ isOpen, onClose }: ModalProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`p-[40px] fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-500 ${isOpen ? "animate-popup" : "scale-90 opacity-0"}
      `}
    >
      <div
        className={`flex flex-col-reverse sm:flex-row relative w-full max-w-[350px] sm:max-w-[550px] shadow-xl overflow-hidden transform transition-all duration-300 ease-out ${isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-[15px] text-gray-400 transition text-[24px]"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="w-full sm:w-7/12 bg-white p-[24px] flex flex-col justify-between relative">
          <Image
            aria-hidden
            src="/images/icons/pop-up.svg"
            alt=""
            width={1000}
            height={1000}
            className="absolute -top-[38px] right-[45px] sm:top-[20px] sm:-right-[42px] w-[75px] sm:w-[90px]"
          />
          <div>
            <h2 className="mt-[20px] sm:top-0 text-center sm:text-left text-[24px] sm:text-[30px] text-cblue font-bold leading-none">
              New LMSW Exam Format Just Dropped
            </h2>
            <p className="text-center sm:text-left mt-[10px] font-poppins">2 locked sections. 1 scheduled break. No going back.</p>
          </div>
          <div className="flex flex-col gap-[10px] items-center sm:items-start">
            <h4 className="text-center sm:text-left text-[20px] text-cblue font-bold">
              We’re fully updated.
            </h4>
            <p className="text-center sm:text-left font-poppins">Book a free 1:1 tutoring session to prep the smart way.</p>
            <Button
              as={NextLink}
              href="/free-tutoring-session"
              radius="full"
              className="text-[18px] bg-corange font-bold"
            >
              BOOK FREE SESSION
            </Button>
          </div>
        </div>
        <div className="w-full sm:w-5/12">
          <Image
            aria-hidden
            src="/images/pop-up.png"
            alt=""
            width={1000}
            height={1000}
            className="object-cover w-full h-[250px] sm:h-full"
          />
        </div>
      </div>
    </div>
  );
}

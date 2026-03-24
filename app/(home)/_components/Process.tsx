import Image from "next/image";
import { Button } from "@heroui/react";
import NextLink from "next/link";

export default function Process() {
  return (
    <div className="flex flex-col lg:flex-row gap-[20px] justify-center items-center mt-[30px] sm:mt-[50px] w-full">
      <div
        className={`flex flex-col items-center max-w-[420px] w-full h-full px-4 py-16 bg-[#E8F3FF] rounded-2xl text-black`}
      >
        <Image
          aria-hidden
          src="/images/gifs/process-1.gif"
          alt="Window icon"
          width={1000}
          height={1000}
          className="w-[180px]"
          unoptimized
        />
        <span
          className={`bg-white border rounded-full border-black px-4 text-[18px] font-semibold mt-[32px]`}
        >
          Step 1
        </span>
        <div className="text-[35px] text-center font-bold mt-[36px] mb-[42px]">
          Free tutoring
        </div>
        <div className="text-[20px] text-center">
          Start with personalized 1:1 Support
        </div>
        <Button
          as={NextLink}
          href="/free-tutoring-session"
          size="lg"
          radius="full"
          className="text-[18px] bg-cblue text-white font-bold mt-[55px]"
        >
          TRY FREE TUTORING
        </Button>
      </div>
      <div
        className={`flex flex-col items-center max-w-[420px] w-full h-full px-4 py-16 bg-[#E8F3FF] rounded-2xl text-black`}
      >
        <Image
          aria-hidden
          src="/images/gifs/process-2.gif"
          alt="Window icon"
          width={1000}
          height={1000}
          className="w-[180px]"
          unoptimized
        />
        <span
          className={`bg-white border rounded-full border-black px-4 text-[18px] font-semibold mt-[28px]`}
        >
          Step 2
        </span>
        <div className="text-[35px] text-center font-bold leading-none my-[28px]">
          Cheat Sheet + <br />Deep Dives
        </div>
        <div className="text-[20px] text-center">
          Everything you need to pass
        </div>
        <Button
          as={NextLink}
          href="/enroll-now"
          size="lg"
          radius="full"
          className="text-[18px] bg-cblue text-white font-bold mt-[58px]"
        >
          ENROLL NOW
        </Button>
      </div>
      <div
        className={`relative flex flex-col items-center max-w-[420px] w-full h-full px-4 py-16 bg-cblue rounded-2xl text-white`}
      >
        <div className="bg-corange p-6 absolute -right-6 -top-6 rounded-full">
          <Image
            aria-hidden
            src="/images/icons/diamond.png"
            alt="Window icon"
            width={1000}
            height={1000}
            className="w-[70px]"
          />
        </div>
        <Image
          aria-hidden
          src="/images/gifs/process-3.gif"
          alt="Window icon"
          width={1000}
          height={1000}
          className="w-[180px]"
          unoptimized
        />
        <span
          className={`bg-white text-black border rounded-full border-black px-4 text-[18px] font-bold mt-[32px]`}
        >
          Step 3
        </span>
        <div className="text-[35px] text-center font-bold mt-[36px] mb-[28px]">
          Premium session
        </div>
        <div className="text-[20px] text-center">
          Get my full attention. <br />
          Let's pass together.
        </div>
        <Button
          as={NextLink}
          href="/my-learning"
          size="lg"
          radius="full"
          className="text-[18px] text-cblue bg-white font-bold mt-[40px]"
        >
          Premium session
        </Button>
      </div>
    </div >
  );
}

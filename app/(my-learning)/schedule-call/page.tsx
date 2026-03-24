"use client";
import React from "react";

// import BookingMeetingForm from "@/app/(free-tutoring-session)/free-tutoring-session/_components/BookingMeetingForm";

export default function FreeTutoringSession() {
    return (
        <div className="flex flex-col py-[50px] min-h-[calc(100vh-350px)] justify-center items-center p-[20px]">
            <h2 className="font-bold text-[20px] ">
                Due to limited availability, tutoring spots open by invite only. Check your inbox for details.
            </h2>
            {/* <h3 className="text-center text-[30px] md:text-[40px] text-slate-800 my-[24px] font-bold">
                Schedule a call
            </h3>
            <div className="w-full flex items-center justify-center px-[12px]">
                <BookingMeetingForm leadStatus="Lead Sign Up" />
            </div> */}
        </div>
    );
};

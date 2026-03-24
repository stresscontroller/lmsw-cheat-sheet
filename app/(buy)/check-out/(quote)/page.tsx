"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdLock } from "react-icons/io";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Enrollnow_page } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

import CheckoutForm from "../_components/CheckoutForm";
import Loading from "@/components/loading";

export default function Page() {

  const [uiData, setUIData] = useState<Enrollnow_page | null>(null);
  const [loading, setLoading] = useState(true);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );
  const [clientSecret, setClientSecret] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);

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
          setUIData(data[1]);
        }
      } catch (error) {
        console.error("Error : ", error);
      }

      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 14995, currency: "usd" }),
      });
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);

      setLoading(false);
    };
    init();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {uiData ? (
        <div className="flex flex-wrap min-h-[calc(100vh-350px)] text-black">
          <div className="w-full md:w-5/12 p-6 md:p-12">
            <div className="min-h-[600px]">
              <h3 className="text-[30px] md:text-[40px] lg:text-[3vw] font-bold">Checkout</h3>
              {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm/>
                </Elements>
              )}
            </div>
          </div>
          <div className="w-full md:w-7/12 p-6 md:p-12  flex flex-col gap-6 justify-center items-center bg-[#D2E8FF4D]">
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="text-lmsw font-semibold">TOTAL AMOUNT</p>
              <p className="text-4xl font-bold text-cnavy">{uiData.price}</p>
              <p className="font-semibold flex gap-1 items-center"><IoMdLock /> Secure payment</p>
            </div>
            {uiData.image?.asset?._ref ? (
              <Image
                src={urlFor(uiData.image?.asset?._ref).url()}
                width={1000}
                height={1000}
                alt="Checkout screen for the LMSW Cheat Sheet with mockups on phone, tablet, and laptop. Total amount shown is $149.95 with secure payment badge and card entry form on the left."
                className="rounded-xl w-[600px]"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

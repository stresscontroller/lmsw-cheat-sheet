"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

import { Thanks_page } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

import Loading from "@/components/loading";
import { fbq } from '@/lib/fbq';
import { pushToDataLayer } from '@/lib/gtm'

export default function Page() {
    const { update } = useSession()
    const router = useRouter();

    const searchParams = useSearchParams();
    const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");

    const [loading, setLoading] = useState(true);
    const [uiData, setUIData] = useState<Thanks_page[]>([]);

    const retrievePaymentIntent = async (clientSecret: string) => {
        const stripe = await (await import("@stripe/stripe-js")).loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
        );
        if (!stripe) return;

        const { paymentIntent, error } = await stripe.retrievePaymentIntent(clientSecret);
        if (error) {
            console.error("Stripe retrieve error:", error);
            return null;
        }

        return paymentIntent;
    };

    useEffect(() => {
        if (!sessionStorage.getItem('fbq_purchase')) {
            fbq('track', 'Purchase', {
                value: 149.95,
                currency: 'USD',
            });
            sessionStorage.setItem('fbq_purchase', 'true');
        }

        const init = async () => {
            try {
                const res = await fetch("/api/sanity?endpoint=thanks", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();
                if (data.length > 0) {
                    const arrData: Thanks_page[] = [];
                    data.map((row: Thanks_page) => {
                        arrData.push(row);
                    });
                    setUIData(arrData);
                }
            } catch (error) {
                console.error("Error : ", error);
            }
        };
        init();
    }, []);

    useEffect(() => {
        const handleSuccess = async () => {
            if (!paymentIntentClientSecret) return;

            const email = localStorage.getItem("checkout_email");
            const firstName = localStorage.getItem("checkout_firstName");
            const lastName = localStorage.getItem("checkout_lastName");
            const password = localStorage.getItem("checkout_password");
            const paymentIntent = await retrievePaymentIntent(paymentIntentClientSecret);

            if (paymentIntent?.status === "succeeded") {
                await fetch("/api/zoho/invoice", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        amount: String(paymentIntent.amount / 100),
                        stripePaymentId: paymentIntent.id,
                    }),
                });

                await fetch("/api/stripe/set-payment-status", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email,
                        password: password
                    }),
                });

                await signIn("credentials", {
                    redirect: false,
                    email: email,
                    password: password,
                });
                pushToDataLayer('lead')
                pushToDataLayer('purchase', { conversionValue: 149.95 })
                await update();
                setLoading(false);
                localStorage.removeItem("checkout_email");
                localStorage.removeItem("checkout_firstName");
                localStorage.removeItem("checkout_lastName");
                localStorage.removeItem("checkout_password");
            } else {
                console.warn("Payment not completed");
            }

        };
        handleSuccess();
    }, [paymentIntentClientSecret]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="px-[10px] text-xl min-h-[calc(100vh-350px)] flex flex-col justify-center pb-[30px]">
            <div className="flex flex-col gap-8 items-center">
                {uiData &&
                    uiData.map((row, index) => {
                        switch (row.type) {
                            case "Payment":
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-[20px] items-center"
                                    >
                                        {row.image?.asset?._ref ? (
                                            <Image
                                                src={urlFor(row.image?.asset?._ref).url()}
                                                width={1000}
                                                height={1000}
                                                alt={row._type || ""}
                                                className="w-auto max-h-[500px]"
                                            />
                                        ) : null}
                                        <h3 className="text-[30px] md:text-[50px] leading-[50px] font-poppins font-semibold text-center">{row.title}</h3>
                                        <Link href={"/my-learning"} className="mt-[20px] text-[18px] text-blue-500 text-center">Click here to access The Cheat Sheet</Link>
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

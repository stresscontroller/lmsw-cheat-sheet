"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { Button, Input, Spinner } from "@heroui/react";

import { Signin_page } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

import Loading from "@/components/loading";
import { ShowAlert } from "@/components/alert";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const [uiData, setUIData] = useState<Signin_page | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [activeProvider, setActiveProvider] = useState<null | "credentials" | "google" | "apple">(null);

  useEffect(() => {
    if (error) {
      ShowAlert({
        message: "Sorry, looks like that’s the wrong email or password.",
        type: "danger",
      })
    }
  }, [error]);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("/api/sanity?endpoint=signin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.length > 0) {
          setUIData(data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error : ", error);
      }
    };
    init();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setActiveProvider("credentials");

    const formEntries = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      email: formEntries.get("email") as string,
      password: formEntries.get("password") as string
    };

    const res = await signIn("credentials", data);
    if (res?.error) {
      ShowAlert({
        message: "Sorry, looks like that’s the wrong email or password.",
        type: "warning",
      });
    }
    setSubmitting(false);
    setActiveProvider(null);
  };

  const handleLoginWith = async (provider: "google" | "apple") => {
    setSubmitting(true);
    setActiveProvider(provider);
    signIn(provider, {
      callbackUrl: "/my-learning"
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {uiData ? (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-350px)]">
          <div className="w-full md:w-6/12 bg-[#E8F3FF]/50 flex justify-center py-[50px] px-[20px]">
            <div className="max-w-[550px] flex flex-col items-start">
              <h3 className="text-[40px] lg:text-[60px] text-cblue leading-none font-bold">{uiData.title}</h3>
              <p className="mt-[15px]">{uiData.description}</p>
              {uiData.image?.file?.asset?._ref ? (
                <Image
                  src={urlFor(uiData.image?.file?.asset?._ref ?? '').url()}
                  width={900}
                  height={900}
                  alt={uiData.image.altText || "Smiling student in glasses studying from an open book and laptop, next to headline: ‘Continue your LMSW prep. Thousands of social workers study with us here."}
                  className="mt-[50px] w-full"
                />
              ) : null}
            </div>
          </div>
          <div className="w-full md:w-6/12 bg-white flex justify-center items-center py-[50px] px-[20]">
            <div className="max-w-[550px] w-full flex flex-col items-center">
              <h3 className="text-[36px] text-cblue font-bold">Log In</h3>
              <p className="mt-[10px]">Please fill in your details.</p>
              <form className="mt-[40px] flex flex-col w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <Input label="Email" type="email" name="email" size="sm" radius="full" isRequired />
                  <Input label="Password" type="password" name="password" size="sm" radius="full" isRequired />
                </div>
                <a className="text-center text-sm underline text-cblue mt-1 mb-8">
                  Forgot Password
                </a>
                <Button
                  type="submit"
                  color="secondary"
                  radius="full"
                  className="text-md"
                  isDisabled={submitting}
                >
                  {submitting && activeProvider === "credentials" ? "Processing..." : "Log in"}
                </Button>
              </form>
              <div className="mt-[60px] flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-around">
                <Button
                  radius="full"
                  className="bg-white border border-gray-500"
                  isDisabled={submitting}
                  onPress={() => handleLoginWith("google")}
                >
                  {submitting && activeProvider === "google" ? (
                    <>
                      <Spinner size="sm" />
                      <span className="text-sm">Processing...</span>
                    </>

                  ) : (
                    <>
                      <FcGoogle className="text-2xl" />
                      <span className="text-sm">Log in with Google</span>
                    </>
                  )}
                </Button>
                <Button
                  radius="full"
                  className="bg-white border border-gray-500"
                  isDisabled={submitting}
                // onPress={() => signIn("apple")}
                >
                  {submitting && activeProvider === "apple" ? (
                    <>
                      <Spinner size="sm" />
                      <span className="text-sm">Processing...</span>
                    </>

                  ) : (
                    <>
                      <SiApple className="text-2xl" />
                      <span className="text-sm">Log in with Apple</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client"
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="bg-white flex flex-col justify-center items-center min-h-[calc(100vh-350px)] ">
      <Spinner color="secondary" label="Loading" labelColor="primary" size="lg" />
    </div>
  );
}

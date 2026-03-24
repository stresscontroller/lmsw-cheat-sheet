import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export interface BenefitProps {
  order?: number;
  type?: string;
  title?: string;
  description?: string;
  image?: {
    asset?: {
      _ref: string;
    };
  };
  _key: string;
}

export default function Benefit(props: BenefitProps) {
  return (
    <div className="max-w-[420px] lg:w-full p-3">
      <div className="flex flex-col items-center gap-[20px] px-4 py-10 rounded-3xl">
        <Image
          aria-hidden
          src={urlFor(props.image?.asset?._ref ?? "").url()}
          alt="Window icon"
          width={2000}
          height={2000}
          className="w-[100px]"
        />
        <p className="text-3xl text-center font-bold">{props.type}</p>
        {/* <p className="font-semibold text-center">{props.title}</p> */}
        <div className="text-center" dangerouslySetInnerHTML={{
          __html: props.description || "",
        }}></div>
      </div>
    </div>
  );
}

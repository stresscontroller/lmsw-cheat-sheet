import { NextResponse } from "next/server";

import { sanityFetch, client } from "@/sanity/lib/client";
import {
  HOMEPAGE_QUERY,
  FREESIGNUPFORM_QUERY,
  ENROLLNOWPAGE_QUERY,
  THANKSPAGE_QUERY,
  MYLEARNINGPAGE_QUERY,
  ABOUTUSPAGE_QUERY,
  FAQS_QUERY,
  SIGNINPAGE_QUERY,
  PRODUCTS_QUERY,
  MiniCheatSheet1_QUERY,
  MiniCheatSheet2_QUERY,
  MiniCheatSheet3_QUERY,
  MiniCheatSheet4_QUERY,
} from "@/sanity/lib/queries";
import {
  HOMEPAGE_QUERYResult,
  FREESIGNUPFORM_QUERYResult,
  ENROLLNOWPAGE_QUERYResult,
  THANKSPAGE_QUERYResult,
  MYLEARNINGPAGE_QUERYResult,
  ABOUTUSPAGE_QUERYResult,
  FAQS_QUERYResult,
  SIGNINPAGE_QUERYResult,
  PRODUCTS_QUERYResult,
  MiniCheatSheet1_QUERYResult,
  MiniCheatSheet2_QUERYResult,
  MiniCheatSheet3_QUERYResult,
  MiniCheatSheet4_QUERYResult,
} from "@/sanity.types";

import { getFileAsset } from "@sanity/asset-utils";

async function fetchData<T>(query: string): Promise<T> {
  return await sanityFetch<T>({ query });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const endpoint = url.searchParams.get("endpoint");
  let data;

  switch (endpoint) {
    case "home":
      data = await fetchData<HOMEPAGE_QUERYResult>(HOMEPAGE_QUERY);
      break;
    case "free-signup":
      data = await fetchData<FREESIGNUPFORM_QUERYResult>(FREESIGNUPFORM_QUERY);
      break;
    case "enroll-now":
      data = await fetchData<ENROLLNOWPAGE_QUERYResult>(ENROLLNOWPAGE_QUERY);
      break;
    case "my-learning":
      data = await fetchData<MYLEARNINGPAGE_QUERYResult>(MYLEARNINGPAGE_QUERY);
      break;
    case "about-us":
      data = await fetchData<ABOUTUSPAGE_QUERYResult>(ABOUTUSPAGE_QUERY);
      break;
    case "faq":
      data = await fetchData<FAQS_QUERYResult>(FAQS_QUERY);
      break;
    case "signin":
      data = await fetchData<SIGNINPAGE_QUERYResult>(SIGNINPAGE_QUERY);
      break;
    case "thanks":
      data = await fetchData<THANKSPAGE_QUERYResult>(THANKSPAGE_QUERY);
      break;
    case "main":
      data = await fetchData<PRODUCTS_QUERYResult>(PRODUCTS_QUERY);
      break;
    case "mini-1":
      data = await fetchData<MiniCheatSheet1_QUERYResult>(MiniCheatSheet1_QUERY);
      break;
    case "mini-2":
      data = await fetchData<MiniCheatSheet2_QUERYResult>(MiniCheatSheet2_QUERY);
      break;
    case "mini-3":
      data = await fetchData<MiniCheatSheet3_QUERYResult>(MiniCheatSheet3_QUERY);
      break;
    case "mini-4":
      data = await fetchData<MiniCheatSheet4_QUERYResult>(MiniCheatSheet4_QUERY);
      break;
    default:
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

"use client";
import React, { useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Link, Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem
} from "@heroui/react";

import { ThemeSwitch } from "@/components/theme-switch";
import useNavLinks from '@/hooks/useNavLinks';

export const Navbar = () => {
  const navLinks = useNavLinks();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [flyer, setFlyer] = useState<boolean>(false);

  const setLinkItemClass = (path: string) => {
    return pathname === path
      ? "font-semibold border-b-4 border-corange"
      : "hover:font-semibold hover:border-b-4 hover:border-corange";
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="bg-cnavy text-white py-[10px]">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-semibold text-[22px]">LMSW Cheat Sheet</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex gap-[40px]">
          <ul className="flex gap-[30px] justify-start ml-2">
            {navLinks.map((link) => (
              <NavbarItem key={link.href}>
                <NextLink
                  className={`${setLinkItemClass(link.href)} py-6 text-lg transition-all ease-in-out duration-200 rounded-sm`}
                  href={link.href}
                >
                  {link.label}
                </NextLink>
              </NavbarItem>
            ))}
            <div className="bg-white w-[2px] h-full" />
            {!session ? (
              <NavbarItem key="/login">
                <NextLink
                  className={`${setLinkItemClass('login')} py-6 text-lg transition-all ease-in-out duration-200 rounded-sm`}
                  href="/login"
                >
                  Log In
                </NextLink>
              </NavbarItem>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  className="
                 group inline-flex items-center justify-center'
                "
                  onClick={() => setFlyer(!flyer)}
                >
                  <span className="text-lg">{session.user?.name}</span>
                  <svg
                    className={
                      flyer === true
                        ? "transform rotate-180 ml-2 h-5 w-5 transition ease-out duration-200"
                        : "transform rotate-0 transition ease-out duration-200 ml-2 h-5 w-5"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  onMouseLeave={() => setFlyer(false)}
                  className={
                    flyer
                      ? " block translate-y-0 transition ease-out duration-200 absolute z-10 -ml-4 mt-3 transform px-2 w-36 max-w-md lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                      : " hidden translate-y-1 absolute z-10 -ml-4 mt-3 transform px-2 w-36 max-w-md lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  }
                >
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid bg-white py-4">
                      <div className="p-3 flex items-start rounded-lg hover:bg-gray-50">
                        <NextLink
                          href="/profile"
                          className="ml-4 text-base font-medium text-gray-700"
                        >
                          Profile
                        </NextLink>
                      </div>
                      <div className="p-3 flex items-start rounded-lg hover:bg-gray-50">
                        <a
                          onClick={() => {
                            signOut();
                          }}
                          className="ml-4 text-base font-medium text-gray-700 cursor-pointer text-red-500"
                        >
                          Log Out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ul>
          {/* <ThemeSwitch /> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-8 flex flex-col gap-3">
          {navLinks.map((link, index) => (
            <NavbarMenuItem key={`${link}-${index}`}>
              <Link
                className="text-blak"
                href={link.href}
                size="lg"
              >
                {link.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        <div className="mx-4 mt-4 space-y-6 text-lg">
          <div className="border-t border-cnavy"></div>
          {!session ? (
            <Link href="/login" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium">
              Log In
            </Link>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-primary">{session.user?.name}</div>
              <div className="px-10 flex flex-col gap-3">
                <Link href="/profile" className="text-gray-900 text-lg">Profile</Link>
                <a
                  onClick={() => {
                    signOut();
                  }}
                  className="cursor-pointer text-red-500"
                >
                  Log Out
                </a>
              </div>
            </div>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

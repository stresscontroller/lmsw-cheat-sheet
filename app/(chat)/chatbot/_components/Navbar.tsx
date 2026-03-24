"use client";
import React, { useState } from "react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import {
    Avatar,
    Link, Navbar as HeroUINavbar,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarMenuItem,
    Select, SelectItem
} from "@heroui/react";

import { ThemeSwitch } from "@/components/theme-switch";

export const userTypes = [
    { key: "def", label: "Default" },
    { key: "dev", label: "Developer" },
    { key: "sc", label: "Scientist" },
    { key: "ca", label: "Catalyst" },
    { key: "ex", label: "Executive" },
    { key: "cus", label: "Custom" },
];

export const gptTypes = [
    { key: "gpt4omini", label: "GPT-4o Mini (2024-07-18)" },
    { key: "gpt4o", label: "GPT-4o (2024-08-06)" },
    { key: "gpt4turbo", label: "GPT-4 Turbo (2024-04-09)" },
    { key: "gpt4", label: "GPT-4 (0613)" },
    { key: "gpt4olatest", label: "ChatGPT-4o Latest" },
    { key: "gpt", label: "3.5-Turbo (0125)" },
];

export interface NavbarProps {
    isOpenDrawer: boolean;
    openDrawer: (isDisplay: boolean) => void;
}

export const Navbar = (props: NavbarProps) => {
    const [flyer, setFlyer] = useState<boolean>(false);

    return (
        <div className="flex items-center justify-between bg-blue-200 py-[10px] px-[20px] gap-[30px]">
            <div>
                <button
                    className={`text-black font-bold py-2 p-2 rounded block md:hidden`}
                    onClick={() => props.openDrawer(!props.isOpenDrawer)}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>
            <div>
                <div className="flex gap-[40px]">
                    <ul className="flex flex-wrap gap-[5px] lg:gap-[30px] justify-center">
                        <Select
                            className="w-[140px]"
                            defaultSelectedKeys={["def"]}
                            labelPlacement="outside-left"
                            label=" "
                            placeholder=""
                        >
                            {userTypes.map((type) => (
                                <SelectItem key={type.key}>{type.label}</SelectItem>
                            ))}
                        </Select>
                        <Select
                            className="w-[250px]"
                            defaultSelectedKeys={["gpt4omini"]}
                            labelPlacement="outside-left"
                            label=" "
                            placeholder=""
                        >
                            {gptTypes.map((type) => (
                                <SelectItem key={type.key}>{type.label}</SelectItem>
                            ))}
                        </Select>
                    </ul>
                </div>
            </div>
            <div>
                <div className="relative">
                    <Avatar
                        size="sm"
                        isBordered
                        as="button"
                        className="group inline-flex items-center justify-center"
                        src="/images/user-02.png"
                        onClick={() => setFlyer(!flyer)}
                    />
                    <div
                        onMouseLeave={() => setFlyer(false)}
                        className={
                            flyer
                                ? " block translate-y-0 transition ease-out duration-200 absolute z-10 -ml-[150px] mt-3 transform px-2 w-[200px] max-w-lg lg:-ml-[75px] lg:left-1/2 lg:-translate-x-1/2"
                                : " hidden translate-y-1 absolute z-10 -ml-4 mt-3 transform px-2 w-[300px] max-w-lg lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                        }
                    >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid bg-white py-4">
                                <div className="p-3 rounded-lg hover:bg-gray-50">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">zoey@example.com</p>
                                </div>
                                <div className="p-3 flex items-center justify-between rounded-lg hover:bg-gray-50">
                                    Theme <ThemeSwitch />
                                </div>
                                <a className="cursor-pointer p-3 flex items-center justify-between rounded-lg hover:bg-gray-50">
                                    Clean up <MdOutlineCheckBoxOutlineBlank />
                                </a>
                                <div className="p-3 flex items-start rounded-lg hover:bg-gray-50">
                                    <a
                                        className="text-base font-medium text-gray-700 cursor-pointer text-red-500"
                                    >
                                        Sign out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

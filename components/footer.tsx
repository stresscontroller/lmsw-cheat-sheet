"use client";
import Link from "next/link";

import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import useNavLinks from '@/hooks/useNavLinks';

export default function Footer() {
    const navLinks = useNavLinks();
    return (
        <div className="footer py-10 px-4 flex flex-col items-center gap-7 bg-cnavy text-sm">
            <Link className="text-xl text-white font-semibold text-xl" href="/">
                <b>LMSW</b> Cheat Sheet
            </Link>
            <div className="flex flex-col sm:flex-row gap-5 text-cpeach">
                {navLinks.map((link, index) => (
                    <Link key={index} href={link.href}>
                        {link.label}
                    </Link>
                ))}
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms-of-service">Terms of Services</Link>
            </div>
            <div className="flex text-cpeach text-lg gap-5">
                <a className="bg-cpeach text-black rounded-full p-2" href={siteConfig.links.facebook} target="_blank">
                    <FaFacebookF />
                </a>
                <a className="bg-cpeach text-black rounded-full p-2" href={siteConfig.links.linkedin} target="_blank">
                    <FaLinkedinIn />
                </a>
                <a className="bg-cpeach text-black rounded-full p-2" href={siteConfig.links.instagram} target="_blank">
                    <FaInstagram />
                </a>
            </div>
            <div className="border-t border-white p-1 w-10/12"></div>
            <div className="flex justify-between text-white">
                <p>Copyright Satyam Studio</p>
            </div>
        </div>
    );
}

"use client";
import React from "react";

export default function Page() {

    return (
        <div className="flex justify-center text-[#161616] px-[20px] lg:px-[60px] py-[80px]">
            <div className="w-full max-w-[1200px]">
                <h3 className="text-[48px] text-[#161616] font-bold text-center pb-[50px]">Privacy Policy</h3>
                <div className="text-[20px] space-y-[30px]">
                    <p>Effective Date 2025-04-10</p>
                    <p>At LMSW Cheat Sheet, your privacy matters. This policy explains what information we collect, how we use it, and how we keep it safe.</p>
                    <div>
                        <p className="font-bold text-[24px]">1. What We Collect</p>
                        When you interact with our website, we may collect:
                        <br />- Your name, email, phone number, and zip code
                        <br />- How many times you've taken the LMSW exam (if shared)
                        <br />- Session notes and tutoring details
                        <br />- Billing information (processed securely through Stripe)
                        <p className="mt-[12px]">We use standard tools like Google Analytics and Meta Pixels to understand basic site traffic, but we do not personally track how you use the product content.</p>
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">2. How We Collect It</p>
                        We collect your information when you:
                        <br />- Sign up for a free tutoring session
                        <br />- Enroll in the LMSW Cheat Sheet or Deep Dives
                        <br />- Submit forms or send emails
                        <br />- Complete a purchase (via Stripe)
                        <br />- Schedule via Calendly or attend sessions via Google Meet
                        <p className="mt-[12px]">We also use tools like Zoho, Google Analytics, and Meta Pixel for business operations and marketing.</p>
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">3. Why We Collect It</p>
                        We use your information to:
                        <br />- Deliver your cheat sheet, tutoring sessions, and support
                        <br />- Respond to your questions
                        <br />- Send email updates and study tips
                        <br />- Track overall business performance and improve our services
                        <p className="mt-[12px]">We never sell your information. Ever.</p>
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">4. Third-Party Services</p>
                        We rely on trusted platforms to help run LMSW Cheat Sheet, including:
                        <br />- Stripe for secure payment processing
                        <br />- Calendly for scheduling
                        <br />- Google Meet for video sessions
                        <br />- Zoho for email and client management
                        <br />- Meta & Google Analytics for basic marketing and site data
                        <p className="mt-[12px]">These services have their own privacy policies and data protections.</p>
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">5. Emails & Communication</p>
                        If you sign up, you may receive
                        <br />- Study tips, prep strategies, and LMSW exam updates
                        <br />- Occasional promotional emails
                        <p className="mt-[12px]">Every email includes an unsubscribe link-you can opt out at any time.</p>
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">6. Data Storage & Security</p>
                        Your data is stored securely in Zoho and other tools we use to manage operations. We use HTTPS, limit internal access, and take reasonable steps to protect your information.
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">7. For Users Under 18</p>
                        While there's no age restriction on our site, our services are designed for MSW-level learners, typically age 21+. If you're under 18, please use the site with a guardian's guidance.
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">8. Questions?</p>
                        Email us at <span className="font-semibold">support@lmswcheatsheet.com</span> if you have any questions, concerns, or requests about your data.
                    </div>
                </div>
            </div>
        </div>
    );
}

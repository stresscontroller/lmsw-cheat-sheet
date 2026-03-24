"use client";
import React from "react";

export default function Page() {

    return (
        <div className="flex justify-center text-[#161616] px-[20px] lg:px-[60px] py-[80px]">
            <div className="w-full max-w-[1200px]">
                <h3 className="text-[48px] text-[#161616] font-bold text-center pb-[50px]">Terms of Service</h3>
                <div className="text-[20px] space-y-[30px]">
                    <p>Effective Date 2025-04-10</p>
                    <p>By accessing or using LMSW Cheat Sheet, you agree to the following terms. Please read them carefully.</p>
                    <div>
                        <p className="font-bold text-[24px]">1. Use of Our Services</p>
                        LMSW Cheat Sheet provides digital educational content, strategy tools, and tutoring sessions for LMSW exam preparation. By using our site, booking a session, or accessing the cheat sheet, you agree to follow these terms.
                        <br />You may not:
                        <br />- Copy, share, or resell the cheat sheet or deep dives
                        <br />- Use our content for commercial purposes without permission
                        <br />- Attempt to reverse-engineer or replicate our materials
                        <p className="mt-[12px]">All content is copyrighted and belongs to LMSW Cheat Sheet.</p>
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">2. Accounts & Access</p>
                        You're responsible for maintaining the confidentiality of your login details.
                        <br />Don't share your access with others-your license is for personal use only.
                        <br />We reserve the right to revoke access if content is misused or redistributed without permission.
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">3. Payments & Billing</p>
                        Payments are securely processed through Stripe. All sales are final unless otherwise stated.
                        <br />Premium sessions and digital materials are non-refundable once delivered.
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">4. Tutoring Sessions</p>
                        Free tutoring is offered once per user and may be declined or rescheduled based on availability.
                        <br />Premium coaching sessions are booked separately and must be paid in advance.
                        <br />We reserve the right to cancel or reschedule sessions if needed.
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">5. Content Accuracy</p>
                        We do our best to keep our content accurate and up-to-date, but passing the LMSW exam depends on many factors.
                        <br />Sheet does not guarantee results.
                        <br />Use our materials as guidance-not legal, clinical, or academic advice.
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">6. Changes to Terms</p>
                        We may update these Terms occasionally. Continued use of the site means you agree to any changes.
                    </div>
                    <div>
                        <p className="font-bold text-[24px]">7. Contact Us</p>
                        Questions? Reach out anytime: <span className="font-semibold">support@lmswcheatsheet.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

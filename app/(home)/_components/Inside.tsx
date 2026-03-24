import Image from "next/image";

export default function Inside() {
    return (
        <div
            className="w-full flex justify-center bg-[#E8F3FF] py-[50px] md:py-[80px] lg:py-[100px] px-[20px]"
        >
            <div className="max-w-[1200px]">
                <p className="text-[20px] text-cblue text-center font-bold">The LMSW Cheat Sheet</p>
                <h2 className="mt-[20px] text-[32px] md:text-[45px] lg:text-[55px] font-bold text-cnavy text-center">What’s inside</h2>
                <div className="mt-[50px] w-full flex flex-col-reverse md:flex-row items-center gap-[50px]">
                    <div className="w-full md:w-6/12 flex justify-center">
                        <Image
                            aria-hidden
                            src={"/images/inside-1.png"}
                            alt="Overview of what’s included in the LMSW Cheat Sheet and Deep Dives, with visuals of the 80-page strategy guide, quiz elements, and three illustrated Deep Dive mini-cheat sheets: Crisis Management, Social Policy & Law, and the DSM Diagnostic Circle"
                            width={1000}
                            height={1000}
                            className="w-[450px] md:w-full"
                        />
                    </div>
                    <div className="w-full md:w-6/12 flex">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <Image
                                    aria-hidden
                                    src={"/images/icons/inside-1.svg"}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="w-[50px]"
                                />
                                <div><span className="font-bold">80 pages of strategy,<br /> questions</span> and clarity</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    aria-hidden
                                    src={"/images/icons/inside-2.svg"}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="w-[50px]"
                                />
                                <div><span className="font-bold">Pre-test and post-test <br /></span>(LMSW-style questions)</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    aria-hidden
                                    src={"/images/icons/inside-3.svg"}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="w-[50px]"
                                />
                                <div><span className="font-bold">Practice-as-you-go questions<br /></span>built into every section</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    aria-hidden
                                    src={"/images/icons/inside-4.svg"}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="w-[50px]"
                                />
                                <div><span className="font-bold">Mini quizzes</span> to lock <br />in knowledge</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <Image
                                    aria-hidden
                                    src={"/images/icons/inside-5.svg"}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="w-[50px]"
                                />
                                <div><span className="font-bold">Acronyms like SAFE REACT<br /></span>and SCORE for fast recall</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    aria-hidden
                                    src={"/images/icons/inside-6.svg"}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="w-[50px]"
                                />
                                <div><span className="font-bold">Elimination strategies <br /></span>and test-day decision tools</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    aria-hidden
                                    src={"/images/icons/inside-7.svg"}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="w-[50px]"
                                />
                                <div><span className="font-bold">Visuals, diagrams,<br /></span>and exam-style rationales</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    aria-hidden
                                    src={"/images/icons/inside-8.svg"}
                                    alt=""
                                    width={1000}
                                    height={1000}
                                    className="w-[50px]"
                                />
                                <div><span className="font-bold">Grounded mindset support <br /></span>to keep you clear under pressure</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[50px] w-full flex flex-col md:flex-row items-center gap-[50px]">
                    <div className="w-full md:w-6/12 flex flex-col gap-5 ">
                        <h3 className="text-cnavy text-[24px] md:text-[36px] font-bold">The Deep Dives: Over 60+ extra pages of pure strategy.</h3>
                        <div>
                            <p><span className="text-corange mr-3">✔</span><span className="font-bold">3 deep dive mini-cheat sheets</span> (~20 pages each):</p>
                            <div className="ml-[20px]">
                                <p>• DSM breakdowns</p>
                                <p>• Ethics + trap questions</p>
                                <p>• First/Next/Safety logic training</p>
                            </div>
                        </div>
                        <p><span className="text-corange mr-3">✔</span><span className="font-bold">Bonus: 3-page medication guide</span> with fast memorization tools</p>
                        <p><span className="text-corange mr-3">✔</span>Designed to help you remember without memorizing</p>
                        <p><span className="text-corange mr-3">✔</span>Reinforces patterns, strategy, and confidence</p>
                    </div>
                    <div className="w-full md:w-6/12 flex justify-center">
                        <Image
                            aria-hidden
                            src={"/images/inside-2.png"}
                            alt="Overview of what’s included in the LMSW Cheat Sheet and Deep Dives, with visuals of the 80-page strategy guide, quiz elements, and three illustrated Deep Dive mini-cheat sheets: Crisis Management, Social Policy & Law, and the DSM Diagnostic Circle"
                            width={1000}
                            height={1000}
                            className="w-[450px] md:w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

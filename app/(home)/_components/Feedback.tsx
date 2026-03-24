'use client'

import { useRef, useEffect, useState } from 'react'

const testimonials = [
  {
    name: 'Kiesha',
    university: 'LCSW',
    quote:
      'After multiple failed attempts on my own, I finally caved and got a tutor (Shifti). After one session I passed! She was very personable and broke techniques down to make understanding the questions more easily.',
  },
  {
    name: 'Keyara',
    university: 'LMSW',
    quote:
      'Working with Shifti allowed me to focus on how to properly successfully pass the exam. She worked with me on how to properly apply the acronyms and ways to relax. She also encourages me not to over study or focus so much on content. Every time we met we always discussed the topics we worked on the previous session. The questions Shifti created were similar to the exam!',
  },
  {
    name: 'Angelica',
    university: 'LMSW',
    quote:
      'I worked with Shifti leading up to my exam and it made all the difference. She didn’t just teach content—she showed me how to stay calm, think through questions, and trust my instincts on test day. I passed with confidence thanks to her coaching. Highly recommend!',
  },
]

export default function Feedback() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)

  const total = testimonials.length

  useEffect(() => {
    const container = containerRef.current
    const slide = container?.querySelector('.slide') as HTMLElement
    if (container && slide) {
      setSlideWidth(slide.offsetWidth + 16) // width + gap
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container && slideWidth) {
      container.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth',
      })
    }
  }, [currentIndex, slideWidth])

  const goNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center px-[20px]">
      <div className="w-full max-w-[1200px] flex flex-row gap-[30px] justify-between">
        <div className='pb-[50px]'>
          <p className="text-cblue font-bold text-[20px]">FEEDBACK</p>
          <h1 className="text-[32px] md:text-[45px] lg:text-[55px] font-bold text-cnavy">What our students say</h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`w-[40px] h-[40px] shadow rounded-full border ${currentIndex === 0
                ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                : 'border-cblue text-cblue'
              }`}
          >
            ←
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === total - 1}
            className={`w-[40px] h-[40px] shadow rounded-full border ${currentIndex === total - 1
                ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                : 'border-cblue text-cblue'
              }`}
          >
            →
          </button>
        </div>
      </div>
      <div className="relative w-full">
        <div
          ref={containerRef}
          className="flex overflow-hidden scroll-smooth snap-x snap-mandatory gap-4"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="slide snap-center shrink-0 w-[80%] md:w-[500px] bg-white rounded-xl shadow-lg p-6 text-center my-6"
            >
              <p className="text-corange font-bold text-sm uppercase mb-1">{t.name}</p>
              <p className="text-gray-500 text-sm mb-4">{t.university}</p>
              <div className="text-cnavy text-4xl mb-4">”</div>
              <p className="text-cnavy text-sm">{t.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

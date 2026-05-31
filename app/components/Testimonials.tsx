'use client'

import { useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────

export type ReviewSource = 'google' | 'trustpilot'

export interface Review {
  name:     string
  location: string
  reviews:  number
  title:    string
  text:     string
  date:     string
  initials: string
  avatarBg: string
  source:   ReviewSource
}

// ── Static data (edit freely) ────────────────────────────────────────────────

const DEFAULT_REVIEWS: Review[] = [
  {
    name: 'James Mitchell', location: 'GB', reviews: 3,
    title: 'Exceptional service from start to finish',
    text: 'The driver arrived fifteen minutes early, the coach was immaculate, and every detail was handled without us lifting a finger. This is what premium service looks like.',
    date: 'Dec 12, 2025', initials: 'JM', avatarBg: '#B8975A', source: 'google',
  },
  {
    name: 'Sarah Keane', location: 'GB', reviews: 1,
    title: 'Perfect for our wedding day',
    text: 'Booked a 16-seat minibus for our wedding party. On time, spotless, and the driver was calm and courteous throughout. Could not have asked for more.',
    date: 'Nov 28, 2025', initials: 'SK', avatarBg: '#7A93B4', source: 'trustpilot',
  },
  {
    name: 'Tom Davies', location: 'GB', reviews: 5,
    title: 'Our go-to for every away fixture',
    text: 'We use Everyday Travels for every away fixture. Always reliable, always professional. The whole team looks forward to it.',
    date: 'Nov 14, 2025', initials: 'TD', avatarBg: '#6A9B7E', source: 'google',
  },
  {
    name: 'Priya Sharma', location: 'GB', reviews: 1,
    title: 'Brilliant school trip experience',
    text: 'Organised a school trip for 45 students. The coach was on time, the driver was patient and kind, and the whole day ran perfectly. Highly recommend.',
    date: 'Oct 30, 2025', initials: 'PS', avatarBg: '#A07A94', source: 'trustpilot',
  },
  {
    name: 'David Chen', location: 'GB', reviews: 2,
    title: 'Reliable and professional airport run',
    text: 'Used them for an early morning airport run. Professional, punctual, and the vehicle was spotless. Will definitely book again.',
    date: 'Oct 11, 2025', initials: 'DC', avatarBg: '#4A6B8A', source: 'google',
  },
  {
    name: 'Emma Thompson', location: 'GB', reviews: 1,
    title: 'Made our hen party so much easier',
    text: 'Fantastic experience from booking to drop-off. The driver went above and beyond to make sure our group had a brilliant time. Exactly what we needed.',
    date: 'Sep 22, 2025', initials: 'ET', avatarBg: '#B47A6E', source: 'trustpilot',
  },
  {
    name: 'Michael Osei', location: 'GB', reviews: 4,
    title: 'Flawless conference transfers',
    text: 'Arranged transfers for 60 delegates across two days. Every vehicle arrived on time and the drivers were incredibly professional. Will use again without hesitation.',
    date: 'Sep 5, 2025', initials: 'MO', avatarBg: '#5A7A6A', source: 'google',
  },
  {
    name: 'Rachel Byrne', location: 'GB', reviews: 1,
    title: 'Last-minute booking, zero stress',
    text: 'Booked last minute for an early morning Gatwick run. The driver was punctual, friendly, and got us there with time to spare. Stress-free from start to finish.',
    date: 'Aug 18, 2025', initials: 'RB', avatarBg: '#8A7AB4', source: 'trustpilot',
  },
  {
    name: 'Liam Foster', location: 'GB', reviews: 2,
    title: 'Seamless Wembley group travel',
    text: 'Organised a coach for 40 supporters to Wembley. The experience was seamless and the price was excellent. Highly recommended for large group travel.',
    date: 'Aug 3, 2025', initials: 'LF', avatarBg: '#9A7A5A', source: 'google',
  },
]

const INITIAL_COUNT = 6

// ── Sub-components ────────────────────────────────────────────────────────────

function Stars({ filled = 5, total = 5, color = '#EBBA6F' }: { filled?: number; total?: number; color?: string }) {
  return (
    <div
      className="flex items-center gap-[3px]"
      role="img"
      aria-label={`${filled} out of ${total} stars`}
    >
      {Array.from({ length: total }, (_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 20 20"
          fill={color}
          opacity={i < filled ? 1 : 0.2}
          aria-hidden
        >
          <path d="M10 1l2.4 4.9 5.3.8-3.9 3.8.9 5.3-4.7-2.5-4.8 2.5.9-5.3-3.8-3.8 5.3-.8L10 1z" />
        </svg>
      ))}
    </div>
  )
}

function AvatarCircle({
  initials,
  bg,
  ring = false,
}: {
  initials: string
  bg: string
  ring?: boolean
}) {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-semibold shrink-0 ${ring ? 'ring-2 ring-[#F4EFE8]' : ''}`}
      style={{ backgroundColor: bg, fontFamily: 'var(--font-ui)' }}
      aria-hidden
    >
      {initials}
    </div>
  )
}



const STARS_IMG = 'https://res.cloudinary.com/dckyndryf/image/upload/v1780237231/stars-5_w1ckxp.svg'

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="bg-white rounded-2xl p-5 shadow-[0_1px_3px_rgba(12,15,28,0.06),0_6px_20px_rgba(12,15,28,0.05)] flex flex-col gap-3">

      {/* ── Row 1: avatar + name + date ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <AvatarCircle initials={review.initials} bg={review.avatarBg} />
          <div className="min-w-0">
            <p
              className="text-[#0C0F1C] text-[14px] font-semibold leading-snug"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {review.name}
            </p>
            <p
              className="text-[#0C0F1C]/45 text-[12px] leading-snug mt-0.5"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              {review.location} · {review.reviews} {review.reviews === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>
        <span
          className="text-[#0C0F1C]/35 text-[12px] shrink-0 mt-0.5"
          style={{ fontFamily: 'var(--font-ui)' }}
        >
          {review.date}
        </span>
      </div>

      {/* ── Row 2: stars image ── */}
      <img
        src={STARS_IMG}
        alt="5 stars"
        className="h-[22px] w-auto self-start"
      />

      {/* ── Row 3: title ── */}
      <p
        className="text-[#0C0F1C] text-[14px] font-semibold leading-snug"
        style={{ fontFamily: 'var(--font-ui)' }}
      >
        {review.title}
      </p>

      {/* ── Row 4: body ── */}
      <p
        className="text-[#0C0F1C]/65 text-[13.5px] leading-relaxed flex-1"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {review.text}
      </p>

    </article>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Testimonials({ reviews = DEFAULT_REVIEWS }: { reviews?: Review[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const visibleReviews = reviews.slice(0, visibleCount)
  const hasMore = visibleCount < reviews.length

  return (
    <section aria-label="Customer reviews" className="bg-[#F4EFE8]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-16">

        {/* ── Centered header ── */}
        <div className="flex flex-col items-center text-center mb-10">

          {/* Kicker */}
          <div className="inline-flex items-center gap-1.5 mb-4">
            <Sparkles size={14} strokeWidth={1} className="text-[#0C0F1C]/70" aria-hidden />
            <span
              className="text-[#0C0F1C]/70 text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              Testimonials
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[#0C0F1C] text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.08] tracking-[-0.015em] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            What our clients say about us
          </h2>

        </div>

        {/* ── Card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        {/* ── Load more + Get a Quote ── */}
        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          {hasMore && (
            <button
              type="button"
              onClick={() => setVisibleCount((c) => Math.min(c + 3, reviews.length))}
              className="h-10 px-7 flex items-center gap-2 bg-white border border-[#0C0F1C]/12 text-[#0C0F1C]/70 text-[13px] font-medium rounded-full hover:bg-[#0C0F1C]/[0.04] hover:text-[#0C0F1C] transition-colors duration-150"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              <ChevronDown size={15} aria-hidden />
              Load more reviews
            </button>
          )}
       
        </div>

      </div>
    </section>
  )
}

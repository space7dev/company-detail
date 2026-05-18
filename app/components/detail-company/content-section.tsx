"use client";

import { useEffect, useRef, useState } from "react";

const contentTabs = ["Trust score", "Customer Reviews", "Company Information", "Reviews"];

const breakdownRows = [
  { label: "Reputation", meta: "Weight 20% · 1,800+ reviews", value: 96, tone: "#30cb65" },
  { label: "Pricing accuracy", meta: "Weight 25% · 2,300+ reviews", value: 82, tone: "#30cb65" },
  { label: "Delivery timing", meta: "Weight 15% · 2,100+ reviews", value: 74, tone: "#3358fd" },
  { label: "Communication", meta: "Weight 20% · 1,900+ reviews", value: 89, tone: "#30cb65" },
  { label: "Pickup timing", meta: "Weight 10% · 1,600+ reviews", value: 78, tone: "#3358fd" },
  { label: "Issue resolution", meta: "Weight 10% · 420+ reviews", value: 54, tone: "#e59d32" },
];

const spotlightColumns = [
  {
    title: "Where Montway delivers",
    iconSrc: "/images/tick.svg",
    iconWrapperClass: "bg-emerald-100",
    borderClass: "border-emerald-500",
    items: [
      {
        title: "Pricing accuracy — 93%",
        lines: ["Quotes hold significantly more often than the 79% platform", "average."],
      },
      {
        title: "Vehicle condition — 96%",
        lines: ["Cars arrive in the same state they left — best in dataset."],
      },
      {
        title: "Major corridors (#1 ranked)",
        lines: ["CA→NY, FL→NY, TX→CA — deepest carrier network on these", "lanes."],
      },
      {
        title: "On-time delivery — 94%",
        lines: ["Transit estimates are accurate on most major routes."],
      },
      {
        title: "31% repeat customers",
        lines: ["Experienced shippers keep coming back — a reliable trust signal."],
      },
    ],
  },
  {
    title: "What to be aware of",
    iconSrc: "/images/warning1.svg",
    iconWrapperClass: "bg-orange-100",
    borderClass: "border-orange-400",
    items: [
      {
        title: "Mid-transit silence",
        lines: [
          "9% of reviews flag gaps in updates once the vehicle is loaded.",
          "Proactively get the driver&apos;s number at pickup.",
        ],
      },
      {
        title: "Rural pickup locations",
        lines: ["Network thins fast off major highways. Adds time and often cost."],
      },
      {
        title: "Peak season (May–Sep)",
        lines: ["Longer wait times and carrier assignment delays. Book 10–14 days", "out."],
      },
      {
        title: "Last-minute premium",
        lines: ["1–3 day bookings often see price adjustments above original quote."],
      },
      {
        title: "Issue resolution — 84%",
        lines: ["Their lowest metric. Resolution process can be slow when things", "go wrong."],
      },
    ],
  },
];

const platformRows = [
  {
    name: "Yelp",
    logoSrc: "/images/trustpilot-logo5.png",
    logoClassName: "w-10 h-6 relative rounded-xs object-contain",
    score: "4.7",
    meta: "(312 reviews)",
    action: "Read →",
  },
  {
    name: "Trustpilot",
    logoSrc: "/images/trustpilot-logo4.png",
    logoClassName: "w-[72px] h-[24px] relative object-contain",
    score: "4.7",
    meta: "(312 reviews)",
    action: "Read →",
  },
  {
    name: "Google",
    logoSrc: "/images/trustpilot-logo3.png",
    logoClassName: "w-[100px] h-[24px] relative object-contain",
    score: "4.7",
    meta: "(312 reviews)",
    action: "Read →",
  },
  {
    name: "BBB",
    logoSrc: "/images/trustpilot-logo1.png",
    logoClassName: "w-16 h-6 relative object-contain",
    score: "4.7",
    meta: "(312 reviews)",
    action: "Read →",
  },
  {
    name: "Transportvibe",
    logoSrc: "/images/trustpilot-logo.png",
    logoClassName: "w-28 h-6 relative object-contain",
    score: "4.7",
    meta: "1,200+ email-confirmed reviews",
    action: "Shown below ↓",
    featured: true,
  },
];

const companyInfoCards = [
  {
    label: "FMCSA Status",
    value: "Active · Authorized Broker",
    meta: "Continuously active since 2006",
    valueClassName: "text-emerald-600",
  },
  {
    label: "MC Number",
    value: "MC-776701",
    meta: "Verified via FMCSA SAFER",
    valueClassName: "text-slate-800",
  },
  {
    label: "DOT Number",
    value: "2894599",
    meta: "US Department of Transportation",
    valueClassName: "text-slate-800",
  },
  {
    label: "Headquarters",
    value: "Chicago, Illinois",
    meta: "Operations nationwide",
    valueClassName: "text-slate-800",
  },
  {
    label: "In Business Since",
    value: "2006 — 18 years",
    meta: "Private equity backed since 2016",
    valueClassName: "text-slate-800",
  },
  {
    label: "Coverage",
    value: "All 48 continental states",
    meta: "Alaska & Hawaii excluded",
    valueClassName: "text-slate-800",
  },
];

const deepDiveTags = ["18 years operating", "15,000+ carriers", "All 48 states", "Open & Enclosed"];

const reviewFilters = [
  { label: "All Reviews", active: true },
  { label: "5  Reviews", showIcon: true },
  { label: "4  Reviews", showIcon: true },
  { label: "3  Reviews", showIcon: true },
  { label: "2  Reviews", showIcon: true },
  { label: "1  Reviews", showIcon: true },
];

const sortOptions = ["Newest", "Oldest", "Highest Budget", "Lowest Budget", "Highest Rating", "Lowest Rating"];

const reviewMetricRows = [
  [
    { label: "Pricing accuracy", rating: 4, striped: false },
    { label: "Communication", rating: 4, striped: false },
  ],
  [
    { label: "Vehicle condition", rating: 4, striped: true },
    { label: "Pickup timing", rating: 4, striped: true },
  ],
  [
    { label: "Delivery timing", rating: 4, striped: false },
    { label: "Issue resolution", rating: 4, striped: false },
  ],
];

const recentReviews = [
  {
    initial: "J",
    name: "James",
    price: "$ 750.00",
    time: "8 hours ago",
    text: "Sherpa handled my Tesla move from Scottsdale to Seattle flawlessly. The driver kept me updated via text daily. Car arrived 4 hours earlier than estimated.",
    media: ["/images/rectangle-180.png", "/images/rectangle-182.png"],
    usefulActive: false,
  },
  {
    initial: "M",
    name: "Michael",
    price: "$ 750.00",
    time: "8 hours ago",
    text: "Sherpa handled my Tesla move from Scottsdale to Seattle flawlessly. The driver kept me updated via text daily. Car arrived 4 hours earlier than estimated.",
    media: ["/images/rectangle-181.png", "/images/rectangle-182.png"],
    usefulActive: true,
  },
  {
    initial: "M",
    name: "Harrison",
    price: "$ 750.00",
    time: "8 hours ago",
    text: "Sherpa handled my Tesla move from Scottsdale to Seattle flawlessly. The driver kept me updated via text daily. Car arrived 4 hours earlier than estimated.",
    media: ["/images/rectangle-181.png", "/images/rectangle-182.png", "/images/rectangle-183.png"],
    usefulActive: false,
  },
  {
    initial: "M",
    name: "Michael",
    price: "$ 750.00",
    time: "8 hours ago",
    text: "Sherpa handled my Tesla move from Scottsdale to Seattle flawlessly. The driver kept me updated via text daily. Car arrived 4 hours earlier than estimated.",
    media: ["/images/rectangle-181.png", "/images/rectangle-182.png"],
    usefulActive: false,
  },
  {
    initial: "M",
    name: "Michael",
    price: "$ 750.00",
    time: "8 hours ago",
    text: "Sherpa handled my Tesla move from Scottsdale to Seattle flawlessly. The driver kept me updated via text daily. Car arrived 4 hours earlier than estimated.",
    media: ["/images/rectangle-181.png", "/images/rectangle-182.png"],
    usefulActive: false,
  },
];

const paginationItems = ["1", "2", "3", "...", "8", "9", "10"];

const shareOptions = [
  { label: "Linkedin" },
  { label: "Facebook" },
  { label: "X" },
  { label: "Telegram" },
  { label: "Whatsapp" },
  { label: "Email" },
];

function ShareOptionIcon({ label }: { label: string }) {
  if (label === "Linkedin") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10.4854 6.29736C10.9671 6.10842 11.5304 6.04363 12.0586 6.1333C12.5828 6.22233 13.0494 6.45872 13.3848 6.84814C13.7161 7.23312 13.9677 7.82389 13.9678 8.71338V13.3003H12.7344V9.62061C12.7344 8.81345 12.4907 8.14233 12.0459 7.67139C11.602 7.20155 11.0062 6.98444 10.4189 7.00537C9.21955 7.04832 8.1543 8.05242 8.1543 9.62061V13.3003H6.92773V6.35303H8.16406L8.1543 6.75732L9.46777 7.10986C9.64663 6.7834 9.99972 6.48789 10.4854 6.29736ZM3.96777 6.35303V13.3003H2.70117V6.35303H3.96777ZM3.29492 2.69971C3.46274 2.69988 3.62356 2.76654 3.74219 2.88525C3.8609 3.00409 3.92782 3.16553 3.92773 3.3335C3.92756 3.50124 3.8608 3.66215 3.74219 3.78076C3.62335 3.89948 3.46192 3.96639 3.29395 3.96631C3.12616 3.96622 2.96535 3.89935 2.84668 3.78076C2.72797 3.66193 2.66105 3.50049 2.66113 3.33252C2.66122 3.16466 2.72799 3.00394 2.84668 2.88525C2.96551 2.76654 3.12695 2.69962 3.29492 2.69971Z" fill="black" stroke="#30CB65" strokeWidth="1.4" />
      </svg>
    );
  }

  if (label === "Facebook") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M9.76172 2.03369C10.2049 2.0337 10.6331 2.0507 10.9658 2.0708V2.96729H10.666C9.91437 2.96729 9.28087 3.14766 8.91895 3.68506C8.75345 3.93082 8.68798 4.19336 8.65918 4.41064C8.63124 4.62186 8.63281 4.83914 8.63281 5.00049V7.03369H10.7695L10.4531 8.30029H8.63281V13.9673H7.36621V8.30029H5.36621V7.03369H7.36621V4.46729C7.36621 3.60509 7.63502 3.01597 8.02148 2.64209C8.41214 2.26423 8.99809 2.03369 9.76172 2.03369Z" fill="black" stroke="#30CB65" strokeWidth="1.4" />
      </svg>
    );
  }

  if (label === "X") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M8.3032 5.92812L13.4029 0H12.1943L7.76639 5.14719L4.22964 0H0.150391L5.49861 7.78356L0.150391 14H1.35898L6.0352 8.56439L9.77014 14H13.8494L8.30288 5.92812H8.3032ZM6.64792 7.85203L6.10597 7.077L1.79441 0.909781H3.65072L7.13005 5.887L7.67189 6.66203L12.1949 13.1316H10.3388L6.64792 7.85236V7.85203Z" fill="#30CB65" />
      </svg>
    );
  }

  if (label === "Telegram") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10.4854 6.29736C10.9671 6.10842 11.5304 6.04363 12.0586 6.1333C12.5828 6.22233 13.0494 6.45872 13.3848 6.84814C13.7161 7.23312 13.9677 7.82389 13.9678 8.71338V13.3003H12.7344V9.62061C12.7344 8.81345 12.4907 8.14233 12.0459 7.67139C11.602 7.20155 11.0062 6.98444 10.4189 7.00537C9.21955 7.04832 8.1543 8.05242 8.1543 9.62061V13.3003H6.92773V6.35303H8.16406L8.1543 6.75732L9.46777 7.10986C9.64663 6.7834 9.99972 6.48789 10.4854 6.29736ZM3.96777 6.35303V13.3003H2.70117V6.35303H3.96777ZM3.29492 2.69971C3.46274 2.69988 3.62356 2.76654 3.74219 2.88525C3.8609 3.00409 3.92782 3.16553 3.92773 3.3335C3.92756 3.50124 3.8608 3.66215 3.74219 3.78076C3.62335 3.89948 3.46192 3.96639 3.29395 3.96631C3.12616 3.96622 2.96535 3.89935 2.84668 3.78076C2.72797 3.66193 2.66105 3.50049 2.66113 3.33252C2.66122 3.16466 2.72799 3.00394 2.84668 2.88525C2.96551 2.76654 3.12695 2.69962 3.29492 2.69971Z" fill="black" stroke="#30CB65" strokeWidth="1.4" />
      </svg>
    );
  }

  if (label === "Whatsapp") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <mask id="path-1-inside-1_1532_29856" fill="white">
          <path d="M9.33718 1.02246C12.8267 1.69353 15.1979 4.71632 15.0786 8.30952C14.9689 11.6231 12.2884 14.5117 8.91217 14.9255C7.55627 15.0967 6.17974 14.8741 4.9469 14.2843C4.74976 14.1985 4.53058 14.1771 4.32057 14.2231C3.30949 14.4655 2.30662 14.7406 1.30076 15.0023C1.19041 15.0306 1.07707 15.05 0.916016 15.0836C1.218 13.9786 1.49985 12.9183 1.80108 11.8625C1.87788 11.5955 1.85626 11.3823 1.73323 11.1206C0.558858 8.62641 0.661009 6.17925 2.26114 3.91775C3.86499 1.64954 6.12873 0.681705 8.91217 0.965045C9.04341 0.977721 9.17389 0.996361 9.33718 1.02246ZM13.7469 9.22739C13.9467 8.41018 13.9705 7.58178 13.7752 6.7683C13.1876 4.31666 11.6621 2.72772 9.18209 2.22516C6.7491 1.73305 4.70606 2.55324 3.26476 4.56496C1.82121 6.57965 1.7899 8.7405 2.98142 10.9051C3.13427 11.1832 3.17528 11.4121 3.08208 11.7089C2.91207 12.2517 2.7801 12.8064 2.61382 13.4223C3.30353 13.2434 3.90824 13.0719 4.52115 12.9377C4.69488 12.8996 4.9223 12.9198 5.07441 13.0033C8.57589 14.9307 12.738 13.1524 13.7469 9.22739Z" />
        </mask>
        <path d="M9.33718 1.02246C12.8267 1.69353 15.1979 4.71632 15.0786 8.30952C14.9689 11.6231 12.2884 14.5117 8.91217 14.9255C7.55627 15.0967 6.17974 14.8741 4.9469 14.2843C4.74976 14.1985 4.53058 14.1771 4.32057 14.2231C3.30949 14.4655 2.30662 14.7406 1.30076 15.0023C1.19041 15.0306 1.07707 15.05 0.916016 15.0836C1.218 13.9786 1.49985 12.9183 1.80108 11.8625C1.87788 11.5955 1.85626 11.3823 1.73323 11.1206C0.558858 8.62641 0.661009 6.17925 2.26114 3.91775C3.86499 1.64954 6.12873 0.681705 8.91217 0.965045C9.04341 0.977721 9.17389 0.996361 9.33718 1.02246ZM13.7469 9.22739C13.9467 8.41018 13.9705 7.58178 13.7752 6.7683C13.1876 4.31666 11.6621 2.72772 9.18209 2.22516C6.7491 1.73305 4.70606 2.55324 3.26476 4.56496C1.82121 6.57965 1.7899 8.7405 2.98142 10.9051C3.13427 11.1832 3.17528 11.4121 3.08208 11.7089C2.91207 12.2517 2.7801 12.8064 2.61382 13.4223C3.30353 13.2434 3.90824 13.0719 4.52115 12.9377C4.69488 12.8996 4.9223 12.9198 5.07441 13.0033C8.57589 14.9307 12.738 13.1524 13.7469 9.22739Z" fill="#30CB65" />
        <path d="M6.31891 5.13544C6.45238 5.45382 6.5426 5.76177 6.69918 6.03243C6.92287 6.41867 6.85502 6.74302 6.54633 7.01518C6.21452 7.30746 6.26374 7.55576 6.50159 7.89129C7.04963 8.66377 7.73785 9.24312 8.60651 9.62265C8.84511 9.72704 9.0263 9.74494 9.18065 9.50559C9.24477 9.40716 9.33425 9.32664 9.40881 9.23418C9.84351 8.69285 9.70706 8.69732 10.396 8.99632C10.613 9.09102 10.83 9.19168 11.0306 9.31545C11.2319 9.43848 11.5376 9.56524 11.5764 9.74046C11.6643 10.1282 11.5406 10.5219 11.217 10.8097C10.6205 11.3406 9.93448 11.4286 9.18512 11.2213C7.56412 10.7739 6.31742 9.8016 5.36227 8.45499C5.02524 7.98002 4.72401 7.45286 4.53461 6.90557C4.30496 6.23897 4.46751 5.59624 4.94173 5.03179C5.22134 4.69999 5.5606 4.62543 5.92969 4.71416C6.07807 4.74995 6.18172 4.97065 6.31891 5.13544Z" fill="#30CB65" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clipPath="url(#clip0_1532_29859)">
        <path d="M14.6673 6.66683C14.6673 6.24683 14.4673 5.8535 14.134 5.60016L8.80065 1.60016C8.56986 1.42707 8.28914 1.3335 8.00065 1.3335C7.71216 1.3335 7.43145 1.42707 7.20065 1.60016L1.86732 5.60016C1.70172 5.72436 1.56732 5.8854 1.47475 6.07054C1.38218 6.25568 1.33398 6.45984 1.33398 6.66683M14.6673 6.66683V13.3335C14.6673 13.6871 14.5268 14.0263 14.2768 14.2763C14.0267 14.5264 13.6876 14.6668 13.334 14.6668H2.66732C2.3137 14.6668 1.97456 14.5264 1.72451 14.2763C1.47446 14.0263 1.33398 13.6871 1.33398 13.3335V6.66683M14.6673 6.66683L8.68732 10.4668C8.4815 10.5958 8.24353 10.6642 8.00065 10.6642C7.75777 10.6642 7.5198 10.5958 7.31398 10.4668L1.33398 6.66683" stroke="#30CB65" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1532_29859">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

type MediaKind = "image" | "video";

type ActiveMedia = {
  items: string[];
  selectedIndex: number;
} | null;

const quickFacts = [
  { label: "Status", value: "Active · Authorized", valueClassName: "text-green-600" },
  { label: "MC Number", value: "MC-776701", valueClassName: "text-green-500 underline" },
  { label: "HQ", value: "Chicago, IL" },
  { label: "Founded", value: "2006 · 18 yrs" },
  { label: "Coverage", value: "All 48 states" },
  { label: "Response time", value: "< 3 hours avg" },
  { label: "BBB", value: "A+ Accredited", valueClassName: "text-green-600" },
  { label: "Lead time", value: "10+ days rec." },
];

const compareCompanies = ["Sherpa Auto Transport", "Amer Freight", "uShip"];

function DecorativeImage({
  className,
  src,
  alt,
}: {
  className: string;
  src: string;
  alt: string;
}) {
  return <img className={className} src={src} alt={alt} />;
}

function RatingGlyph({
  variant,
  filled = true,
}: {
  variant: "platform" | "filter" | "metric" | "review";
  filled?: boolean;
}) {
  const variantClasses = {
    platform: {
      outer: "size-3 relative overflow-hidden",
      inner: "size-2 left-[2.22px] top-[2.16px]",
    },
    filter: {
      outer: "size-3.5 relative overflow-hidden",
      inner: "size-2 left-[2.59px] top-[2.52px]",
    },
    metric: {
      outer: "size-3.5 relative overflow-hidden",
      inner: "size-2 left-[2.59px] top-[2.52px]",
    },
    review: {
      outer: "size-4 relative overflow-hidden",
      inner: "size-2.5 left-[2.96px] top-[2.88px]",
    },
  }[variant];

  const fillClass = filled
    ? "bg-amber-300 outline-amber-300"
    : "bg-neutral-200 outline-neutral-200";

  return (
    <div className={variantClasses.outer}>
      <div
        className={`${variantClasses.inner} absolute outline outline-1 outline-offset-[-0.50px] ${fillClass}`}
      />
    </div>
  );
}

function RatingBar({
  variant,
  filled,
  total = 5,
}: {
  variant: "platform" | "metric" | "review";
  filled: number;
  total?: number;
}) {
  return (
    <div className="size- flex justify-start items-center gap-[3px]">
      {Array.from({ length: total }, (_, index) => (
        <RatingGlyph key={index} variant={variant} filled={index < filled} />
      ))}
    </div>
  );
}

function ReviewActionBar({
  usefulActive = false,
  onShare,
}: {
  usefulActive?: boolean;
  onShare: () => void;
}) {
  const usefulWrapperClass = usefulActive
    ? "size- px-1.5 py-0.5 bg-emerald-50 rounded-xs flex justify-start items-center gap-2"
    : "size- px-1.5 py-0.5 flex justify-start items-center gap-2";

  const usefulIcon = usefulActive ? "/images/thumbs-aup-fill.svg" : "/images/thumbs-up.svg";
  const usefulTextClass = usefulActive
    ? "justify-center text-green-600 text-xs font-semibold font-['Rethink_Sans'] leading-5"
    : "justify-center text-neutral-500 text-xs font-semibold font-['Rethink_Sans'] leading-5";

  return (
    <div className="self-stretch inline-flex justify-between items-center">
      <div className="size- flex justify-start items-center gap-3">
        <div className={usefulWrapperClass}>
          <DecorativeImage className="size-4" src={usefulIcon} alt="Useful" />
          <div className={usefulTextClass}>Useful</div>
        </div>
        <div className="size-1 bg-stone-300 rounded-full" />
        <button
          type="button"
          onClick={onShare}
          className="size- px-1.5 py-0.5 flex justify-start items-center gap-2"
        >
          <DecorativeImage className="size-4" src="/images/share-2.svg" alt="Share" />
          <div className="justify-center text-neutral-500 text-xs font-semibold font-['Rethink_Sans'] leading-5">Share</div>
        </button>
      </div>
      <DecorativeImage className="size-4" src="/images/flag.svg" alt="Flag" />
    </div>
  );
}

function SegmentedMeter({
  value,
  tone,
  widthClass,
}: {
  value: number;
  tone: string;
  widthClass: string;
}) {
  return (
    <div className={`relative h-[18px] ${widthClass} overflow-hidden`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #e5e5e5 0 3px, transparent 3px 7px)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: `${value}%`,
          backgroundImage: `repeating-linear-gradient(to right, ${tone} 0 3px, transparent 3px 7px)`,
        }}
      />
    </div>
  );
}

function SegmentedRangeMeter() {
  return (
    <div className="relative h-[18px] w-[661px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #e5e5e5 0 3px, transparent 3px 7px)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: "16%",
          backgroundImage:
            "repeating-linear-gradient(to right, #f03939 0 3px, transparent 3px 7px)",
        }}
      />
      <div
        className="absolute inset-y-0 left-[16%]"
        style={{
          width: "14%",
          backgroundImage:
            "repeating-linear-gradient(to right, #efb867 0 3px, transparent 3px 7px)",
        }}
      />
      <div
        className="absolute inset-y-0 left-[30%]"
        style={{
          width: "20%",
          backgroundImage:
            "repeating-linear-gradient(to right, #3358fd 0 3px, transparent 3px 7px)",
        }}
      />
      <div
        className="absolute inset-y-0 left-[50%]"
        style={{
          width: "50%",
          backgroundImage:
            "repeating-linear-gradient(to right, #30cb65 0 3px, transparent 3px 7px)",
        }}
      />
    </div>
  );
}

function TrustScoreBreakdown() {
  return (
    <div className="self-stretch rounded-md border border-neutral-200 bg-white">
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="font-header text-xl font-semibold leading-[1.24] text-stone-950">
            Trust Score Breakdown
          </div>
          <div className="font-header text-xs font-semibold leading-[19px] text-green-500 underline">
            How scores are calculated →
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-6 px-6 py-4">
        <div className="relative h-[58px] w-[663px] self-end">
          <div className="absolute left-0 top-[19px]">
            <SegmentedRangeMeter />
          </div>
          <div
            className="absolute left-[642.5px] top-[17px] h-[22px] w-[6px] rounded-[2px] border-[3px] border-green-500/20 bg-green-500"
            aria-hidden="true"
          />
          <span className="font-header absolute left-[82px] top-0 text-[10px] font-semibold leading-[19px] text-[#efb867]">
            Avoid
          </span>
          <span className="font-header absolute left-[132px] top-0 text-[10px] font-semibold leading-[19px] text-[#3358fd]">
            Caution
          </span>
          <span className="font-header absolute left-[286px] top-0 text-[10px] font-semibold leading-[19px] text-green-500">
            Trusted
          </span>
          <span className="font-header absolute left-[516px] top-0 text-[10px] font-semibold leading-[19px] text-green-500">
            Highly Trusted
          </span>
          <span className="font-header absolute right-0 top-0 text-[10px] font-semibold leading-[19px] text-stone-300">
            100
          </span>
          <span className="font-header absolute right-[15px] top-[42px] text-[10px] font-semibold leading-[19px] text-stone-950">
            96 - Highly Trusted
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {breakdownRows.map((row) => (
            <div key={row.label} className="flex items-center gap-2 py-1">
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="font-header text-sm font-semibold leading-[21px] text-stone-950">
                  {row.label}
                </div>
                <div className="text-[11px] leading-[1.4] text-[#767575]">{row.meta}</div>
              </div>
              <div className="flex items-center gap-2">
                <SegmentedMeter value={row.value} tone={row.tone} widthClass="w-[333px]" />
                <div className="font-header w-[38px] text-right text-base font-semibold leading-[1.24] text-stone-950">
                  {row.value}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotlightColumn({
  title,
  iconSrc,
  iconWrapperClass,
  borderClass,
  items,
}: {
  title: string;
  iconSrc: string;
  iconWrapperClass: string;
  borderClass: string;
  items: { title: string; lines: string[] }[];
}) {
  return (
    <div className="min-w-0 flex-1 px-6 py-5 bg-white inline-flex flex-col justify-start items-start gap-8">
      <div className="self-stretch inline-flex justify-start items-center gap-2">
        <div className={`flex size-6 items-center justify-center rounded-full ${iconWrapperClass}`}>
          <DecorativeImage className="size-3.5" src={iconSrc} alt="" />
        </div>
        <div className="size- inline-flex flex-col justify-start items-start">
          <div className="justify-center text-slate-800 text-base font-bold font-['Inter'] leading-6">
            {title}
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className={`self-stretch pl-4 border-l-2 ${borderClass} flex flex-col justify-start items-start`}
          >
            <div className="self-stretch justify-center text-slate-800 text-sm font-semibold font-['Inter'] leading-5">
              {item.title}
            </div>
            <div className="self-stretch justify-center text-slate-500 text-xs font-normal font-['Inter'] leading-5">
              {item.lines.map((line, index) => (
                <span key={`${item.title}-${index}`}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformRow({ row }: { row: (typeof platformRows)[number] }) {
  const wrapperClass = row.featured
    ? "self-stretch px-3 py-3.5 bg-emerald-50 rounded-sm inline-flex justify-between items-center"
    : "self-stretch px-3 py-3.5 bg-white rounded-sm border-b border-stone-300/20 inline-flex justify-between items-center";

  return (
    <div className={wrapperClass}>
      <DecorativeImage className={row.logoClassName} src={row.logoSrc} alt={row.name} />
      <div className="self-stretch flex justify-start items-center gap-1.5">
        <div className="size- flex justify-start items-center gap-[5px]">
          {Array.from({ length: 5 }, (_, index) => (
            <RatingGlyph key={index} variant="platform" />
          ))}
        </div>
        <div className="size-5 justify-center text-emerald-800 text-sm font-semibold font-['Rethink_Sans'] leading-5">
          {row.score}
        </div>
        <div className="justify-center text-slate-400 text-xs font-normal font-['Open_Sans'] leading-4">
          {row.meta}
        </div>
        <div className="justify-start text-blue-600 text-xs font-semibold font-['Rethink_Sans'] underline leading-5">
          {row.action}
        </div>
      </div>
    </div>
  );
}

function ReviewMetricCell({
  label,
  rating,
  striped,
  bordered,
}: {
  label: string;
  rating: number;
  striped: boolean;
  bordered: boolean;
}) {
  return (
    <div
      className={`flex-1 px-5 py-2 ${striped ? "bg-neutral-50 border-white" : "bg-white border-neutral-50"} ${bordered ? "border-l" : ""} border-t border-b flex justify-between items-center`}
    >
      <div className="justify-center text-slate-500 text-xs font-semibold font-['Rethink_Sans'] leading-5">
        {label}
      </div>
      <RatingBar variant="metric" filled={rating} />
    </div>
  );
}

function ReviewMetricsGrid() {
  return (
    <div className="self-stretch bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-neutral-100 flex flex-col justify-start items-start overflow-hidden">
      {reviewMetricRows.map((row, rowIndex) => (
        <div key={rowIndex} className="self-stretch inline-flex justify-start items-start">
          {row.map((metric, columnIndex) => (
            <ReviewMetricCell
              key={metric.label}
              label={metric.label}
              rating={metric.rating}
              striped={metric.striped}
              bordered={columnIndex === 1}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function ReviewMediaStrip({
  media,
  onOpenMedia,
}: {
  media: string[];
  onOpenMedia: (items: string[], selectedIndex: number) => void;
}) {
  return (
    <div className="self-stretch relative inline-flex justify-start items-center gap-2.5">
      {media.map((src, index) => (
        <button
          key={`${src}-${index}`}
          type="button"
          className="size-16 rounded-sm"
          onClick={() => onOpenMedia(media, index)}
          aria-label="Open media preview"
        >
          <DecorativeImage className="size-16 rounded-sm object-cover" src={src} alt="" />
        </button>
      ))}
      <button
        type="button"
        className="size-7 px-2 py-0.5 left-[18px] top-[18px] absolute bg-black/50 rounded-[32px] flex justify-center items-center gap-1.5"
        onClick={() => onOpenMedia(media, 0)}
        aria-label="Play media"
      >
        <DecorativeImage className="size-3.5" src="/images/play.svg" alt="Play" />
      </button>
      {Array.from({ length: Math.max(0, 5 - media.length) }, (_, index) => (
        <div key={index} className="size-16 opacity-0 bg-zinc-300 rounded-sm" />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  onOpenMedia,
  onOpenShare,
}: {
  review: (typeof recentReviews)[number];
  onOpenMedia: (items: string[], selectedIndex: number) => void;
  onOpenShare: () => void;
}) {
  return (
    <div className="self-stretch px-6 py-5 bg-white outline outline-1 outline-offset-[-1px] outline-neutral-100 flex flex-col justify-start items-start gap-4">
      <div className="self-stretch pr-[0.01px] inline-flex justify-between items-start">
        <div className="size- flex justify-start items-center gap-3">
          <div className="size-9 bg-emerald-100 rounded-full flex justify-center items-center">
            <div className="w-5 h-6 text-center justify-center text-emerald-800 text-base font-semibold font-['Inter'] leading-6">
              {review.initial}
            </div>
          </div>
          <div className="size- inline-flex flex-col justify-start items-start gap-0.5">
            <div className="size- inline-flex justify-center items-center gap-2">
              <div className="justify-center text-stone-950 text-base font-semibold font-['Rethink_Sans'] leading-5">
                {review.name}
              </div>
              <div className="size- py-0.5 rounded-xl flex justify-start items-center gap-1">
                <DecorativeImage className="size-3" src="/images/shield-check.svg" alt="" />
                <div className="justify-center text-green-500 text-xs font-semibold font-['Open_Sans'] leading-4">
                  Verified
                </div>
              </div>
            </div>
            <div className="size- inline-flex justify-center items-center gap-2.5">
              <div className="justify-center text-neutral-500 text-xs font-semibold font-['Rethink_Sans'] leading-5">
                {review.price}
              </div>
              <div className="size-1 bg-stone-300 rounded-full" />
              <div className="justify-center text-neutral-500 text-xs font-semibold font-['Rethink_Sans'] leading-5">
                {review.time}
              </div>
            </div>
          </div>
        </div>
        <div className="size- flex justify-start items-center gap-2">
          <RatingBar variant="review" filled={5} />
        </div>
      </div>
      <ReviewMetricsGrid />
      <div className="self-stretch justify-center text-neutral-700 text-xs font-normal font-['Open_Sans'] leading-4">
        {review.text}
      </div>
      <ReviewMediaStrip media={review.media} onOpenMedia={onOpenMedia} />
      <ReviewActionBar usefulActive={review.usefulActive} onShare={onOpenShare} />
    </div>
  );
}

function SidebarFactRow({
  label,
  value,
  valueClassName = "text-stone-950",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="self-stretch h-10 flex flex-col justify-center items-start">
      <div className="self-stretch flex-1 py-1 border-b border-neutral-100 inline-flex justify-start items-center gap-2">
        <div className="flex-1 justify-center text-neutral-500 text-sm font-normal font-['Open_Sans'] leading-5">
          {label}
        </div>
        <div className={`flex-1 text-right justify-center text-sm font-semibold font-['Rethink_Sans'] leading-5 ${valueClassName}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

function CompareCompanyCard({ name }: { name: string }) {
  return (
    <div className="self-stretch p-1 bg-neutral-100 rounded-sm flex flex-col justify-center items-start">
      <div className="self-stretch border-b border-neutral-100 inline-flex justify-start items-center gap-2">
        <DecorativeImage className="size-9 rounded-md object-cover" src="/images/background.png" alt="" />
        <div className="flex-1 justify-center text-stone-950 text-sm font-semibold font-['Rethink_Sans'] leading-5">
          {name}
        </div>
      </div>
    </div>
  );
}

export function ContentSection() {
  const [activeMedia, setActiveMedia] = useState<ActiveMedia>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeMedia) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveMedia(null);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeMedia]);

  useEffect(() => {
    if (!isSortOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!sortDropdownRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isSortOpen]);

  useEffect(() => {
    if (!isShareModalOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsShareModalOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isShareModalOpen]);

  function inferMediaKind(src: string): MediaKind {
    return /\.(mp4|webm|ogg|mov)$/i.test(src) ? "video" : "image";
  }

  function openMediaModal(items: string[], selectedIndex: number) {
    setActiveMedia({ items, selectedIndex });
  }

  const currentMediaSrc = activeMedia ? activeMedia.items[activeMedia.selectedIndex] : "";
  const currentMediaKind = currentMediaSrc ? inferMediaKind(currentMediaSrc) : null;

  return (
    <>
      <div className="w-[1166px] left-[100px] top-[567px] absolute z-20 inline-flex justify-start items-start gap-12">
      <div className="w-[712px] rounded-sm inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
        <div className="self-stretch px-6 bg-white outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-start items-start gap-5">
          {contentTabs.map((tab, index) => (
            <div
              key={tab}
              className={`size- py-4 flex justify-center items-center gap-2.5 ${index === 0 ? "border-b-2 border-green-500" : ""}`}
            >
              <div
                className={`justify-center text-xs font-semibold font-['Rethink_Sans'] leading-5 ${
                  index === 0 ? "text-stone-950" : "text-neutral-400"
                }`}
              >
                {tab}
              </div>
            </div>
          ))}
        </div>

        <div className="w-[712px] bg-teal-950 rounded-sm shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06)] flex flex-col justify-start items-start">
          <div className="self-stretch p-8 bg-green-950 inline-flex justify-start items-center gap-7">
            <div className="size-20 bg-gradient-to-br from-green-500/20 from 17% to-green-600/20 rounded-lg outline outline-[6px] outline-offset-[-3px] outline-green-400/10 flex justify-center items-center">
              <DecorativeImage className="w-12 h-11" src="/images/group-87.svg" alt="" />
            </div>
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
              <div className="self-stretch inline-flex justify-between items-start">
                <div className="size- pb-1 border-b border-white backdrop-blur-[6px] flex justify-start items-center gap-2">
                  <div className="size- flex justify-center items-start gap-2">
                    <DecorativeImage className="size-5" src="/images/ai.svg" alt="" />
                    <div className="text-center justify-center text-white text-sm font-semibold font-['Rethink_Sans'] leading-5">
                      AI Verdict
                    </div>
                  </div>
                </div>
                <div className="h-5 flex justify-start items-center gap-3">
                  <div className="w-24 h-4 text-center justify-center text-stone-300 text-xs font-normal font-['Open_Sans'] leading-4">
                    Match Analysis
                  </div>
                  <div className="justify-center text-stone-300 text-xs font-normal font-['Open_Sans'] leading-4">
                    Updated Jan 2026 · 13,700+ reviews
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start">
                <span className="text-white text-sm font-normal font-['Open_Sans'] leading-5">Rimberio excels at </span>
                <span className="text-green-500 text-sm font-bold font-['Open_Sans'] leading-5">
                  cross-country shipments
                </span>
                <span className="text-white text-sm font-normal font-['Open_Sans'] leading-5">, especially for </span>
                <span className="text-green-500 text-sm font-bold font-['Open_Sans'] leading-5">
                  budget-conscious customers
                </span>
                <span className="text-white text-sm font-normal font-['Open_Sans'] leading-5">
                  {' '}on main routes. It offers reliable service but{' '}
                </span>
                <span className="text-orange-400 text-sm font-bold font-['Open_Sans'] leading-5">
                  may not be the best choice for frequent mid-transit updates or rural pickups
                </span>
                <span className="text-white text-sm font-normal font-['Open_Sans'] leading-5">.</span>
              </div>
            </div>
          </div>
        </div>

        <TrustScoreBreakdown />

        <div className="self-stretch bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start">
          <div className="self-stretch px-6 py-4 border-b border-neutral-200 inline-flex justify-center items-center gap-2.5">
            <div className="flex-1 flex justify-between items-center">
              <div className="justify-center text-stone-950 text-xl font-semibold font-['Rethink_Sans'] leading-6">
                What They&apos;re Good At &amp; What to Watch
              </div>
              <div className="justify-center text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                From 13,700+ reviews
              </div>
            </div>
          </div>
          <div className="self-stretch bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-slate-100 inline-flex justify-start items-stretch overflow-hidden">
            <div className="min-w-0 flex-1 border-r border-neutral-200">
              <SpotlightColumn {...spotlightColumns[0]} />
            </div>
            <SpotlightColumn {...spotlightColumns[1]} />
          </div>
        </div>

        <div className="self-stretch bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start gap-3">
          <div className="self-stretch px-6 py-4 border-b border-neutral-200 inline-flex justify-center items-center gap-2.5">
            <div className="flex-1 flex justify-between items-center">
              <div className="justify-center text-stone-950 text-xl font-semibold font-['Rethink_Sans'] leading-6">
                Customer Reviews Across Platforms
              </div>
              <div className="justify-center text-neutral-500 text-[11px] font-normal font-['Open_Sans'] leading-4">
                Aggregate data only · We link, not reproduce
              </div>
            </div>
          </div>
          <div className="self-stretch px-6 pb-6 flex flex-col justify-start items-start">
            {platformRows.slice(0, 4).map((row) => (
              <PlatformRow key={row.name} row={row} />
            ))}
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <PlatformRow row={platformRows[4]} />
              <div className="self-stretch justify-center text-neutral-500 text-[11px] font-normal font-['Open_Sans'] leading-4">
                TransportVibe shows aggregate scores and review counts only. We do not reproduce individual reviews from external platforms — click any platform to read reviews there directly.
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start overflow-hidden">
          <div className="self-stretch px-6 py-4 border-b border-neutral-200 inline-flex justify-center items-center gap-2.5">
            <div className="flex-1 flex justify-between items-center">
              <div className="justify-center text-stone-950 text-xl font-semibold font-['Rethink_Sans'] leading-6">
                Company Information
              </div>
              <div className="justify-center text-green-500 text-xs font-bold font-['Open_Sans'] leading-4">
                ● Live · Updated daily
              </div>
            </div>
          </div>
          <div className="self-stretch p-6 bg-emerald-50 outline outline-1 outline-offset-[-1px] outline-gray-400/10 inline-flex justify-between items-center">
            <div className="size- flex justify-start items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-full bg-emerald-100">
                <DecorativeImage className="size-[22px]" src="/images/check.svg" alt="" />
              </div>
              <div className="size- inline-flex flex-col justify-start items-start">
                <div className="w-64 h-6 justify-center text-gray-800 text-base font-semibold font-['Rethink_Sans'] leading-5">
                  Verified via FMCSA SAFER system
                </div>
                <div className="w-80 h-5 justify-center text-gray-600 text-xs font-normal font-['Open_Sans'] leading-4">
                  MC-776701 is active and authorized as of today.
                </div>
              </div>
            </div>
            <div className="size- flex justify-start items-center gap-1">
              <div className="w-24 h-5 justify-center text-green-500 text-sm font-semibold font-['Rethink_Sans'] underline leading-5">
                Check FMCSA
              </div>
              <DecorativeImage className="size-3" src="/images/preview.svg" alt="" />
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-start flex-wrap content-start">
            {companyInfoCards.map((card) => (
              <div
                key={card.label}
                className="w-1/2 px-6 py-4 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border-b border-neutral-200 inline-flex flex-col justify-start items-start gap-1"
              >
                <div className="self-stretch justify-center text-slate-400 text-xs font-semibold font-['Rethink_Sans'] leading-5">
                  {card.label}
                </div>
                <div className={`self-stretch justify-center text-base font-semibold font-['Rethink_Sans'] leading-5 ${card.valueClassName}`}>
                  {card.value}
                </div>
                <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                  {card.meta}
                </div>
              </div>
            ))}
          </div>
          <div className="self-stretch inline-flex justify-start items-start">
            <div className="flex-1 px-6 py-4 inline-flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-center text-gray-800 text-base font-semibold font-['Rethink_Sans'] leading-5">
                Cargo insurance
              </div>
              <div className="self-stretch justify-center text-gray-600 text-xs font-normal font-['Open_Sans'] leading-4">
                Held by the carrier, not Montway. If your vehicle is damaged, the claim goes against the carrier&apos;s $100K policy. Montway facilitates but is not the insuring party. Always photograph the vehicle before handover and document any damage on the Bill of Lading at delivery before signing.
              </div>
            </div>
            <div className="flex-1 self-stretch px-6 py-4 bg-[#FFF5E6] inline-flex flex-col justify-start items-start gap-2 overflow-hidden">
              <div className="self-stretch inline-flex justify-center items-center gap-2.5">
                <DecorativeImage className="size-5" src="/images/warning.svg" alt="" />
                <div className="flex-1 justify-center text-gray-800 text-base font-semibold font-['Rethink_Sans'] leading-5">
                  Quotes are estimates
                </div>
              </div>
              <div className="self-stretch justify-center text-gray-600 text-xs font-normal font-['Open_Sans'] leading-4">
                While Montway&apos;s 93% accuracy rate is strong, price adjustments can occur especially on rural routes or last-minute bookings. Any change must be communicated before pickup, not presented at delivery.
              </div>
            </div>
          </div>
          <div className="self-stretch px-6 py-5 relative bg-gray-100 flex flex-col justify-start items-start overflow-hidden">
            <div className="size-48 left-[568px] top-[-1.25px] absolute opacity-50 bg-emerald-100 rounded-full blur-[32px]" />
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="self-stretch justify-center text-emerald-800 text-base font-semibold font-['Rethink_Sans'] leading-5">
                Transportvibe&apos;s role
              </div>
              <div className="self-stretch justify-center text-gray-600 text-xs font-normal font-['Open_Sans'] leading-4">
                TransportVibe is an independent review and comparison platform not affiliated with Montway. Data is drawn from FMCSA records and our verified review database. For Full Service bookings, TransportVibe acts as your agent
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-3">
                <div className="flex items-center">
                  <DecorativeImage className="width-[32px] height-[32px] rounded-full shadow-[0px_0px_0px_2px_rgba(255,255,255,1.00)]" src="/images/user-1.png" alt="" />
                  <DecorativeImage className="-ml-1 width-[32px] height-[32px] rounded-full shadow-[0px_0px_0px_2px_rgba(255,255,255,1.00)]" src="/images/user-2.png" alt="" />
                  <DecorativeImage className="-ml-1 width-[32px] height-[32px] rounded-full shadow-[0px_0px_0px_2px_rgba(255,255,255,1.00)]" src="/images/user-3.png" alt="" />
                </div>
                <div className="w-52 h-4 justify-center text-emerald-800 text-xs font-semibold font-['Inter'] leading-4">
                  Trusted by 1.2k compliance officers
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch pb-6 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start">
          <div className="self-stretch px-6 py-4 border-b border-neutral-200 inline-flex justify-center items-center gap-2.5">
            <div className="flex-1 flex justify-between items-center">
              <div className="justify-center text-stone-950 text-xl font-semibold font-['Rethink_Sans'] leading-6">
                Company Deep Dive
              </div>
              <div className="justify-center text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                Editorial analysis • Jan 2026
              </div>
            </div>
          </div>
          <div className="self-stretch px-6 py-4 border-b border-neutral-200 inline-flex justify-start items-start gap-2">
            {deepDiveTags.map((tag) => (
              <div
                key={tag}
                className="self-stretch px-3 py-1.5 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-slate-200 inline-flex flex-col justify-start items-start"
              >
                <div className="justify-center text-slate-500 text-sm font-semibold font-['Rethink_Sans'] leading-5">
                  {tag}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full max-w-[896px] flex flex-col justify-start items-start">
            <div className="self-stretch px-6 py-5 border-b border-neutral-200 flex flex-col justify-start items-start gap-3.5">
              <div className="self-stretch justify-center text-slate-800 text-base font-semibold font-['Rethink_Sans'] leading-5">
                About Montway
              </div>
              <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                Montway Auto Transport was founded in 2006 in Chicago and has grown into one of the highest-volume auto transport brokers in the U.S. With more than 15,000 verified carrier relationships and operations across all 48 continental states, they process tens of thousands of shipments annually. As a licensed FMCSA broker (MC-776701), Montway does not own trucks — it connects customers with third-party carriers, negotiating pricing and coordinating logistics. Their 2016 private equity acquisition accelerated scale, resulting in proprietary quote and matching technology that drives their competitive pricing accuracy.
              </div>
            </div>
            <div className="self-stretch px-6 py-5 border-b border-neutral-200 flex flex-col justify-start items-start gap-3.5">
              <div className="self-stretch justify-center text-slate-800 text-base font-semibold font-['Rethink_Sans'] leading-5">
                How it works
              </div>
              <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                Booking starts with an all-inclusive quote — Montway builds their commission into the upfront price rather than adding fees later. Once accepted, the shipment enters their carrier network. On major corridors, carrier assignment typically happens within 24–72 hours. The carrier&apos;s dispatcher contacts you directly before pickup. At this point, Montway&apos;s active role transitions to support — they&apos;re available for escalations, but proactive mid-transit monitoring is limited. At delivery, inspect thoroughly before signing the Bill of Lading. Any damage must be noted on the BOL before you sign.
              </div>
            </div>
            <div className="self-stretch px-6 py-5 border-b border-neutral-200 flex flex-col justify-start items-start gap-3.5">
              <div className="self-stretch justify-center text-slate-800 text-base font-semibold font-['Rethink_Sans'] leading-5">
                Pricing — what &quot;93% accuracy&quot; actually means
              </div>
              <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                93% of customers report their final price matched the original quote. The industry average on TransportVibe&apos;s platform is 79% — so Montway&apos;s accuracy is a genuine differentiator, not a marketing claim. Their all-in quoting model (commission included upfront) removes the hidden-fee problem common in auto transport. The 7% where quotes shift is almost always tied to last-minute bookings, peak season demand, or routes with low carrier density where a carrier cannot be secured at the original price. If you book with adequate lead time on a major corridor, your quote will almost certainly hold.
              </div>
              <div className="self-stretch px-6 py-5 bg-blue-50/50 rounded-tr-xl rounded-br-xl border-l-4 border-blue-600 flex flex-col justify-start items-start">
                <div className="self-stretch justify-center">
                  <span className="text-slate-900 text-xs font-bold font-['Open_Sans'] leading-4">
                    Pricing ranges:
                  </span>
                  <span className="text-slate-900 text-xs font-normal font-['Open_Sans'] leading-4">
                    {' '}Open transport cross-country $900–$1,400 for a standard sedan. Enclosed adds $400–$800. Inoperable vehicles add $150–$300. $200 deposit at booking; balance paid directly to carrier at delivery.
                  </span>
                </div>
              </div>
            </div>
            <div className="self-stretch px-6 py-5 border-b border-neutral-200 flex flex-col justify-start items-start gap-3.5">
              <div className="self-stretch justify-center text-slate-800 text-base font-semibold font-['Rethink_Sans'] leading-5">
                Carrier network
              </div>
              <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                On high-volume corridors — CA→NY, FL→NY, TX→CA — Montway&apos;s carrier depth is unmatched in our dataset. This is where their scale gives them a genuine advantage: regular business with a large broker attracts the better owner-operators. On rural and off-highway routes, that advantage erodes fast. If your pickup is more than 30 miles from a major highway, expect longer assignment times and potential price adjustments. The 96% vehicle condition score across 1,800+ reviews validates that the carriers they&apos;re using on primary lanes take good care of vehicles.
              </div>
            </div>
            <div className="self-stretch px-6 py-5 border-b border-neutral-200 flex flex-col justify-start items-start gap-3.5">
              <div className="self-stretch justify-center text-slate-800 text-base font-semibold font-['Rethink_Sans'] leading-5">
                Communication — the honest picture
              </div>
              <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                This is Montway&apos;s most consistently noted weakness. Their communication score is 91% — better than many competitors — but 9% of reviews specifically flag a lack of proactive updates once the vehicle is in transit. The pattern: strong before pickup, inconsistent during the 5–10 day transit window. The practical fix is simple: get the carrier driver&apos;s direct number at pickup and don&apos;t hesitate to call it. Drivers are almost always reachable. The issue is about proactive outreach, not accessibility. Customers who know this going in almost never flag it as a problem.
              </div>
            </div>
            <div className="self-stretch px-6 py-5 flex flex-col justify-start items-start gap-3.5">
              <div className="self-stretch justify-center text-slate-800 text-base font-semibold font-['Rethink_Sans'] leading-5">
                Who Montway is best for — and when to look elsewhere
              </div>
              <div className="self-stretch justify-center">
                <span className="text-neutral-500 text-xs font-bold font-['Open_Sans'] leading-4">Best for:</span>
                <span className="text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                  {' '}Standard vehicles on major corridors. Customers who prioritise price certainty. Fleet operators and dealers who ship regularly. First-time shippers who want an established, high-volume name with a strong compliance track record.
                  <br />
                  <br />
                </span>
                <span className="text-neutral-500 text-xs font-bold font-['Open_Sans'] leading-4">
                  Consider alternatives if:
                </span>
                <span className="text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                  {' '}You need daily proactive updates during transit (Sherpa scores higher here). You&apos;re shipping an exotic vehicle requiring enclosed specialist carriers. Your pickup location is rural or remote. You need guaranteed issue resolution — in which case, TransportVibe Full Service provides a price lock and a dedicated escalation path regardless of which carrier handles the shipment.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start overflow-hidden">
          <div className="self-stretch px-6 py-4 border-b border-neutral-200 inline-flex justify-center items-center gap-2.5">
            <div className="flex-1 inline-flex flex-col justify-center items-center gap-1">
              <div className="self-stretch justify-center text-stone-950 text-xl font-semibold font-['Rethink_Sans'] leading-6">
                Recent Customer Feedback
              </div>
              <div className="self-stretch justify-center text-neutral-500 text-xs font-normal font-['Open_Sans'] leading-4">
                Last 30 days · 8 reviews
              </div>
            </div>
            <div ref={sortDropdownRef} className="relative w-52 min-h-11">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isSortOpen}
                onClick={() => setIsSortOpen((current) => !current)}
                className="flex h-11 w-full items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2.5"
              >
                <span className="text-sm leading-5 text-gray-500">Sort by</span>
                <span className="flex-1 text-left text-sm leading-5 text-stone-950">{selectedSort}</span>
                <DecorativeImage
                  className={`size-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`}
                  src="/images/chevron-down.svg"
                  alt=""
                />
              </button>

              {isSortOpen ? (
                <div className="absolute left-0 top-[48px] z-40 w-full overflow-hidden rounded-md border border-neutral-200 bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
                  {sortOptions.map((option, index) => {
                    const isSelected = option === selectedSort;

                    return (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setSelectedSort(option);
                          setIsSortOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-3 text-left ${
                          index !== sortOptions.length - 1 ? "border-b border-neutral-200" : ""
                        } ${isSelected ? "bg-emerald-50" : "bg-white hover:bg-emerald-50"}`}
                      >
                        <span className="text-sm leading-5 text-stone-950">{option}</span>
                        <span className={`text-green-600 text-sm font-semibold ${isSelected ? "opacity-100" : "opacity-0"}`}>
                          ✓
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <div data-leading-icon="true" data-state="Default" data-trailing-icon="false" data-variant="Primary" className="self-stretch px-5 py-2.5 bg-green-500 rounded-xs flex justify-center items-center gap-2">
              <div className="justify-start text-neutral-50 text-xs font-bold font-['Rethink_Sans'] leading-4">
                LEAVE A REVIEW
              </div>
            </div>
          </div>
          <div className="self-stretch px-6 bg-white outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-start items-start gap-5">
            {reviewFilters.map((filter) => (
              <div
                key={filter.label}
                className={`size- py-4 flex justify-center items-center ${filter.showIcon ? "gap-1" : "gap-2.5"} ${filter.active ? "border-b-2 border-green-500" : ""}`}
              >
                {filter.showIcon ? <RatingGlyph variant="filter" /> : null}
                <div
                  className={`justify-center text-xs font-semibold font-['Rethink_Sans'] leading-5 ${
                    filter.active ? "text-stone-950" : "text-neutral-400"
                  }`}
                >
                  {filter.label}
                </div>
              </div>
            ))}
          </div>
          <div className="self-stretch flex flex-col justify-start items-start">
            {recentReviews.map((review, index) => (
              <ReviewCard
                key={`${review.name}-${index}`}
                review={review}
                onOpenMedia={openMediaModal}
                onOpenShare={() => setIsShareModalOpen(true)}
              />
            ))}
          </div>
          <div className="self-stretch p-5 border-t border-gray-200 relative z-30 flex items-center justify-between gap-4">
            <div data-destructive="False" data-hierarchy="Link gray" data-icon="Default" data-size="sm" data-state="Default" data-icon-trailing="false" data-icon-leading="true" className="size- flex justify-center items-center gap-2 overflow-hidden">
              <DecorativeImage className="size-5" src="/images/arrow-left.svg" alt="Previous" />
              <div className="justify-start text-stone-300 text-sm font-semibold font-['Rethink_Sans'] leading-5">
                Previous
              </div>
            </div>
            <div className="relative z-20 flex flex-1 items-center justify-center gap-1.5">
              {paginationItems.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className={`h-10 w-10 inline-flex items-center justify-center text-sm font-semibold ${
                    index === 0 ? "rounded-sm bg-green-200 text-stone-950" : "rounded-lg text-neutral-500"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
            <div data-destructive="False" data-hierarchy="Link gray" data-icon="Default" data-size="sm" data-state="Default" data-icon-trailing="true" data-icon-leading="false" className="size- flex justify-center items-center gap-2 overflow-hidden">
              <div className="justify-start text-stone-950 text-sm font-semibold font-['Rethink_Sans'] leading-5">
                Next
              </div>
              <DecorativeImage className="size-5" src="/images/arrow-right.svg" alt="Next" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[406px] self-start">
        <div className="sticky top-6 flex flex-col gap-5">
        <div className="self-stretch bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start">
          <div className="self-stretch px-5 py-4 outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-start items-center gap-3">
            <DecorativeImage className="size-16 rounded-md object-cover" src="/images/background.png" alt="Rimberio Auto Transport" />
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-1">
              <div className="self-stretch justify-center text-stone-950 text-base font-semibold font-['Rethink_Sans'] leading-5">
                Rimberio Auto Transport
              </div>
              <div className="size- inline-flex justify-start items-center gap-3">
                <div className="size- flex justify-start items-center gap-1.5">
                  <div className="size- flex justify-start items-center gap-0.5">
                    <DecorativeImage className="size-3.5" src="/images/star.svg" alt="" />
                  </div>
                  <div className="justify-center text-neutral-400 text-xs font-semibold font-['Rethink_Sans'] leading-5">4.8</div>
                  <div className="justify-center text-neutral-400 text-xs font-semibold font-['Rethink_Sans'] leading-5">(2,100)</div>
                </div>
              </div>
            </div>
            <div className="size- p-2 bg-emerald-50 rounded-sm inline-flex flex-col justify-center items-end">
              <div className="justify-center text-green-600 text-2xl font-semibold font-['Rethink_Sans'] leading-7">96</div>
              <div className="justify-center text-green-500 text-[10px] font-semibold font-['Rethink_Sans'] leading-5">
                Highly Trusted
              </div>
            </div>
          </div>
          <div className="self-stretch px-5 py-4 flex flex-col justify-start items-center gap-4">
            <div data-leading-icon="true" data-state="Default" data-trailing-icon="false" data-variant="Primary" className="self-stretch px-5 py-2.5 bg-green-500 rounded-xs inline-flex justify-center items-center gap-2">
              <div className="justify-start text-neutral-50 text-xs font-bold font-['Rethink_Sans'] leading-4">GET QUOTE FROM RIBERIO</div>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-2.5">
              <div data-leading-icon="false" data-state="Default" data-trailing-icon="false" data-variant="Secondary" className="flex-1 px-5 py-2.5 bg-white rounded-xs outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-center items-center gap-2">
                <div className="justify-start text-green-700 text-xs font-bold font-['Rethink_Sans'] leading-4">COMPARE WITH OTHER </div>
              </div>
              <div data-leading-icon="false" data-state="Default" data-trailing-icon="false" data-variant="Secondary" className="flex-1 px-5 py-2.5 bg-white rounded-xs outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-center items-center gap-2">
                <div className="justify-start text-green-700 text-xs font-bold font-['Rethink_Sans'] leading-4">ADD TO ADVISOR SESSION</div>
              </div>
            </div>
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-neutral-200" />
            <div data-leading-icon="true" data-state="Default" data-trailing-icon="false" data-variant="Primary" className="self-stretch px-5 py-2.5 bg-green-500 rounded-xs inline-flex justify-center items-center gap-2">
              <div className="justify-start text-neutral-50 text-xs font-bold font-['Rethink_Sans'] leading-4">USE FULL SERVICE</div>
            </div>
            <div className="self-stretch text-center justify-center">
              <span className="text-neutral-500 text-sm font-normal font-['Open_Sans'] leading-5">
                Transportvibe handles the shipment end-to-end. <br />
              </span>
              <span className="text-green-500 text-sm font-bold font-['Open_Sans'] underline leading-5">Learn more</span>
            </div>
          </div>
        </div>

        <div className="self-stretch px-5 py-6 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start gap-3">
          <div className="self-stretch justify-center text-stone-950 text-base font-semibold font-['Rethink_Sans'] leading-5">
            Quick Facts
          </div>
          <div className="self-stretch flex flex-col justify-start items-start">
            {quickFacts.map((fact) => (
              <SidebarFactRow
                key={fact.label}
                label={fact.label}
                value={fact.value}
                valueClassName={fact.valueClassName}
              />
            ))}
          </div>
        </div>

        <div className="self-stretch px-5 py-6 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-neutral-200 flex flex-col justify-start items-start gap-3">
          <div className="self-stretch justify-center text-stone-950 text-xl font-semibold font-['Rethink_Sans'] leading-6">
            Compare with others
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            {compareCompanies.map((company) => (
              <CompareCompanyCard key={company} name={company} />
            ))}
          </div>
          <div data-leading-icon="false" data-state="Default" data-trailing-icon="true" data-variant="Secondary" className="self-stretch px-5 py-2.5 bg-white rounded-xs outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-center items-center gap-2">
            <div className="justify-start text-green-700 text-xs font-bold font-['Rethink_Sans'] leading-4">COMPARE ALL BROKERS</div>
          </div>
        </div>

        <div
          className="self-stretch p-6 rounded-md border-t border-b border-white/5 flex flex-col justify-start items-start overflow-hidden bg-cover bg-center"
          style={{
            background:
              "linear-gradient(115deg, #1C4B3F 47.72%, rgba(28, 75, 63, 0.00) 89.34%), url('/images/testimonials-section.png') #1C4B3F",
          }}
        >
          <div className="w-full max-w-[1280px] relative flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-center items-start gap-6">
              <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch justify-center text-white text-2xl font-semibold font-['Rethink_Sans'] leading-7">
                    Leave a Review
                  </div>
                  <div className="self-stretch justify-center text-white text-sm font-normal font-['Open_Sans'] leading-5">
                    Used Sherpa Auto Transport? Help others by sharing your experience.
                  </div>
                </div>
              </div>
              <div className="size- inline-flex justify-start items-start gap-5">
                <div data-leading-icon="true" data-state="Default" data-trailing-icon="false" data-variant="Primary" className="size- px-5 py-2.5 bg-green-500 rounded-xs flex justify-center items-center gap-2">
                  <div className="justify-start text-neutral-50 text-xs font-bold font-['Rethink_Sans'] leading-4">WRITE A REVIEW</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="self-stretch p-6 rounded-md border-t border-b border-white/5 flex flex-col justify-start items-start overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(109deg, #16367F 15.66%, rgba(22, 54, 127, 0.20) 88.38%), url('/images/testimonials-section1.png')",
          }}
        >
          <div className="w-full max-w-[1280px] relative flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-center items-start gap-6">
              <div className="self-stretch flex flex-col justify-start items-start gap-5">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  <div className="self-stretch justify-center text-white text-2xl font-semibold font-['Rethink_Sans'] leading-7">
                    Ready to ship?
                  </div>
                  <div className="self-stretch justify-center text-white text-sm font-normal font-['Open_Sans'] leading-5">
                    Get a quote or let Transportvibe handle everything.
                  </div>
                </div>
              </div>
              <div className="size- inline-flex justify-start items-start gap-5">
                <div data-leading-icon="true" data-state="Default" data-trailing-icon="false" data-variant="Primary" className="size- px-5 py-2.5 bg-green-500 rounded-xs flex justify-center items-center gap-2">
                  <div className="justify-start text-neutral-50 text-xs font-bold font-['Rethink_Sans'] leading-4">GET QUOTE</div>
                </div>
                <div data-leading-icon="true" data-state="Default" data-trailing-icon="false" data-variant="Secondary" className="size- px-5 py-2.5 bg-white rounded-xs outline outline-1 outline-offset-[-1px] outline-neutral-200 flex justify-center items-center gap-2">
                  <div className="justify-start text-green-700 text-xs font-bold font-['Rethink_Sans'] leading-4">USE FULL SERVICE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>

      {activeMedia ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(0,0,0,0.72)] px-4 backdrop-blur-[4px]"
          onClick={() => setActiveMedia(null)}
        >
          <div className="relative w-[865px]" onClick={(event) => event.stopPropagation()}>
            <div className="relative h-[649px] w-[865px] overflow-hidden rounded-[4px]">
              {currentMediaKind === "image" ? (
                <div
                  className="h-full w-full"
                  style={{
                    background: `url(${currentMediaSrc}) lightgray 50% / cover no-repeat`,
                  }}
                />
              ) : (
                <video className="h-full w-full bg-black object-cover" src={currentMediaSrc} controls autoPlay />
              )}
            </div>

            <div className="mt-0.5 flex w-[865px] items-center gap-2 border-t border-white/10 bg-black/65 px-3 py-3">
              {activeMedia.items.map((item, index) => {
                const selected = index === activeMedia.selectedIndex;
                const kind = inferMediaKind(item);

                return (
                  <button
                    key={`${item}-${index}`}
                    type="button"
                    onClick={() => setActiveMedia({ ...activeMedia, selectedIndex: index })}
                    aria-label="Select media"
                    className={`relative h-16 w-16 aspect-square overflow-hidden rounded-[4px] bg-neutral-300 ${selected ? "border-2 border-[#26A251]" : "opacity-40"}`}
                  >
                    <img
                      src={item}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    {kind === "video" ? (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <img className="size-4" src="/images/play.svg" alt="" />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-sm font-semibold text-white"
              onClick={() => setActiveMedia(null)}
              aria-label="Close media preview"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      {isShareModalOpen ? (
        <div
          className="fixed inset-0 z-[130] flex items-center justify-center bg-[rgba(0,0,0,0.72)] px-4 backdrop-blur-[4px]"
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="w-[430px] overflow-hidden rounded-[8px] border border-neutral-200 bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
              <div className="text-[16px] text-xl font-semibold leading-6 text-stone-950">Share</div>
              <button
                type="button"
                className="flex h-6 w-6 aspect-square items-center justify-center rounded-full hover:bg-neutral-100"
                onClick={() => setIsShareModalOpen(false)}
                aria-label="Close share modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#BDBDBD"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-3 overflow-hidden rounded-sm border border-neutral-200">
                {shareOptions.map((option, index) => {
                  const selected = option.label === "Facebook";

                  return (
                    <button
                      key={option.label}
                      type="button"
                      className={`flex items-center justify-between px-3 py-3 text-left ${
                        index < 3 ? "border-b border-neutral-200" : ""
                      } ${index % 3 !== 2 ? "border-r border-neutral-200" : ""} ${
                        selected ? "bg-emerald-50" : "bg-white hover:bg-emerald-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-4 w-4 shrink-0 aspect-square items-center justify-center">
                          <ShareOptionIcon label={option.label} />
                        </div>
                        <span className="text-sm leading-5 text-stone-950">{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

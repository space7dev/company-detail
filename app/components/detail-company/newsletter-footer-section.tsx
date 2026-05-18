const socialIcons = [
  "/images/facebook.svg",
  "/images/instagram.svg",
  "/images/linkedin.svg",
  "/images/devicon-twitter.svg",
  "/images/reddit.svg",
  "/images/youtube.svg",
  "/images/pinterest.svg",
];

const footerLinks = {
  Main: ["About Us", "Compare", "ShipAdvisor AI", "Full Service"],
  "For Customers": ["Companies", "Resources", "Stories", "Locations"],
  Legal: [
    "Privacy Policy",
    "Cookie Policy",
    "Terms of Use",
    "Website Disclaimer",
    "Content Moderation",
    "Neutral Language",
    "Use-submitted Reviews",
  ],
};

const paymentLogos = [
  ["/images/image-9.png", "Visa", "w-14 h-5"],
  ["/images/image-13.png", "American Express", "w-14 h-9"],
  ["/images/image-11.png", "Apple Pay", "w-14 h-6"],
  ["/images/image-12.png", "PayPal", "w-20 h-5"],
  ["/images/image-15.png", "Venmo", "w-14 h-3.5"],
  ["/images/image-14.png", "Discover", "w-14 h-2.5"],
  ["/images/image-10.png", "Mastercard", "w-14 h-12"],
];

export function NewsletterFooterSection() {
  return (
    <footer className="absolute left-0 top-[6595px] w-full border-t border-neutral-200 bg-neutral-50 px-8 pt-14 mt-16">
      <div className="relative h-60 overflow-hidden rounded-lg bg-green-900 px-10 pb-2">
        <img className="absolute inset-0 h-full w-full object-cover" src="/images/image-19.png" alt="" />
        <div className="absolute inset-0 bg-[linear-gradient(109deg,#135128_44%,rgba(19,81,40,0)_71%)]" />
        <div className="relative flex h-full flex-col justify-center gap-5">
          <div>
            <h2 className="font-header text-[32px] font-semibold leading-[1.2] text-white">Get Exclusive Deals And Shipping Tips</h2>
            <p className="mt-1.5 text-base leading-6 text-white">
              Subscribe to our newsletter to get exclusive deal and tips for your next shipping
            </p>
          </div>
          <div className="flex items-end gap-4">
            <div className="flex flex-1 gap-4">
              {["Your Name", "Your Phone", "Your Email"].map((label) => (
                <div key={label} className="h-12 flex-1 rounded-sm border border-neutral-200 bg-white px-3 py-2.5 text-sm leading-5 text-stone-300">
                  {label}
                </div>
              ))}
            </div>
            <button className="h-12 rounded-sm bg-green-500 px-7 text-xs font-bold leading-4 text-neutral-50">SUBSCRIBE</button>
          </div>
          <p className="text-base italic leading-6 text-white/80">No spam, unsubscribe anytime</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-[402px_repeat(4,minmax(0,1fr))] gap-12">
        <div>
          <img className="h-[42.5px] w-[193.9px] object-contain" src="/images/image-1.png" alt="Transportvibe" />
          <p className="mt-7 max-w-80 text-sm leading-5 text-stone-950">
            The trust-driven marketplace for auto transport. Compare verified brokers, read real reviews, and get AI-powered recommendations.
          </p>
          <div className="mt-8 flex gap-3">
            {socialIcons.map((icon) => (
              <span key={icon} className="flex size-9 items-center justify-center rounded-full bg-gray-200">
                <img className="size-4 object-contain" src={icon} alt="" />
              </span>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
          <h3 className="font-header text-base font-semibold leading-5 text-neutral-500">{title}</h3>
            <div className="mt-6 flex flex-col gap-3">
              {links.map((link) => (
                <span key={link} className="text-sm leading-5 text-neutral-500">
                  {link}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="font-header text-base font-semibold leading-5 text-neutral-500">Contact</h3>
          <div className="mt-6 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <img className="size-4" src="/images/phone.svg" alt="" />
                <span className="text-sm leading-5 text-neutral-500">Phone</span>
              </div>
              <p className="mt-1.5 text-base font-semibold leading-5 text-green-600 underline">+1 (443) 388-0311</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <img className="size-4" src="/images/trailing-icon.svg" alt="" />
                <span className="text-sm leading-5 text-neutral-500">Whatsapp</span>
              </div>
              <p className="mt-1.5 text-base font-semibold leading-5 text-green-600 underline">+1 (443) 388-0311</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <img className="size-4" src="/images/mail.svg" alt="" />
                <span className="text-sm leading-5 text-neutral-500">Email</span>
              </div>
              <p className="mt-1.5 text-base font-semibold leading-5 text-green-600">info@transportvibe.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-5">
        <p className="text-xs leading-4 text-zinc-500">© 2026 Transportvibe. All Rights Reserved.</p>
        <div className="flex items-center gap-5">
          {paymentLogos.map(([src, alt, className]) => (
            <img key={src} className={`${className} object-contain`} src={src} alt={alt} />
          ))}
        </div>
      </div>

      <div className="mt-5 bg-neutral-200 p-6 text-xs font-light leading-4 text-zinc-600">
        Disclaimer: Transportvibe is an independent review platform. We are not affiliated with any car shipping companies. Our ratings are based on publicly available data including FMCSA records, Trustpilot reviews, BBB ratings, and customer feedback. Always verify current pricing and availability directly with the shipping company before making a decision. Precision analytics are provided as guidance and do not constitute a legal guarantee of performance.
      </div>
    </footer>
  );
}

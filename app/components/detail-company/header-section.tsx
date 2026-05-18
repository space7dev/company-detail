const mainLinks = ["About Us", "Compare", "Full Service", "Companies", "Stories", "Resources"];

export function HeaderSection() {
  return (
    <header className="absolute left-0 top-0 flex w-full flex-col overflow-hidden border-b border-neutral-200 bg-white">
      <div className="flex items-center justify-between border-b border-neutral-50/20 bg-neutral-50 px-8 py-2 backdrop-blur-md">
        <div className="relative flex items-center gap-2 text-xs leading-4 text-neutral-500">
          <span>15K+ verified reviews</span>
          <span className="size-[3px] rounded-full bg-stone-300" />
          <span>4.5★ rating</span>
          <span className="size-[3px] rounded-full bg-stone-300" />
          <span>FMCSA checked carriers</span>
          <span className="size-[3px] rounded-full bg-stone-300" />
          <span>Real customer data</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img className="size-4" src="/images/circle-question-mark.svg" alt="" />
            <span className="text-sm font-semibold leading-5 text-stone-300">Help Center</span>
          </div>
          <div className="flex items-center gap-2">
            <img className="size-4" src="/images/globe.svg" alt="" />
            <span className="text-sm font-semibold leading-5 text-stone-300">EN</span>
            <img className="size-4" src="/images/chevron-down.svg" alt="" />
          </div>
          <div className="flex h-8 w-[278px] items-center justify-between rounded-md border-2 border-neutral-200 bg-zinc-100 px-3">
            <span className="text-xs leading-4 text-neutral-500">Search Company</span>
            <img className="size-4" src="/images/search.svg" alt="" />
          </div>
          <div className="h-8 w-px bg-neutral-200" />
          <span className="text-xs font-semibold leading-5 text-green-500">SIGN IN</span>
          <span className="text-xs font-semibold leading-5 text-green-500">REGISTER</span>
        </div>
      </div>

      <div className="flex h-[82px] items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <img className="h-8 w-36 object-contain" src="/images/image-1.png" alt="Transportvibe" />
          <nav className="flex items-center gap-5">
            {mainLinks.slice(0, 2).map((link) => (
            <span key={link} className="font-header text-sm font-semibold leading-5 text-stone-300">
                {link}
              </span>
            ))}
            <div className="flex items-center gap-1.5">
              <img className="h-4 w-3.5" src="/images/ai.svg" alt="" />
              <span className="font-header text-sm font-semibold leading-5 text-stone-300">ShipAdvisor AI</span>
              <span className="font-header rounded-sm bg-green-500/20 px-1 text-xs font-semibold leading-5 text-green-500">New</span>
            </div>
            {mainLinks.slice(2).map((link) => (
            <span key={link} className="font-header text-sm font-semibold leading-5 text-stone-300">
                {link}
              </span>
            ))}
            <div className="flex items-center gap-2">
              <span className="font-header text-sm font-semibold leading-5 text-stone-300">Tools</span>
              <img className="size-4" src="/images/chevron-down.svg" alt="" />
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="font-header rounded-sm bg-white px-5 py-2.5 text-xs font-bold leading-4 text-green-700">LEAVE REVIEW</button>
          <button className="font-header rounded-sm bg-green-500 px-5 py-2.5 text-xs font-bold leading-4 text-neutral-50">GET QUOTES</button>
        </div>
      </div>
    </header>
  );
}

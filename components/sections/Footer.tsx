'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-[rgba(255,255,255,0.05)] px-6 md:px-12 lg:px-20 xl:px-28 py-7"
      role="contentinfo"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-label text-[9px] tracking-[0.22em] uppercase text-dim">
            Cristian Francesco Pennino
          </span>
          <span className="text-dim/40 text-xs" aria-hidden="true">—</span>
          <span className="font-mono text-[8px] tracking-widest text-dim uppercase">
            © {year}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-mono text-[8px] tracking-[0.2em] text-dim uppercase">
            Designed & built by Cristian
          </span>
          <span className="hidden sm:flex items-center gap-1.5" aria-label="All systems operational">
            <span
              className="w-1 h-1 rounded-full bg-emerald-400/50"
              aria-hidden="true"
            />
            <span className="font-mono text-[8px] tracking-widest text-dim uppercase">
              All systems go
            </span>
          </span>
        </div>
      </div>
    </footer>
  )
}

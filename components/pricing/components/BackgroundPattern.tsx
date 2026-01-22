export function BackgroundPattern() {
  return (
    <svg
      viewBox="0 0 1208 1024"
      aria-hidden="true"
      className="hidden lg:block absolute lg:-top-48 left-1/2 h-[64rem] -translate-x-1/2 lg:translate-y-0 [mask-image:radial-gradient(closest-side,white,transparent)]"
    >
      <ellipse
        cx={604}
        cy={512}
        rx={604}
        ry={512}
        fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)"
      />
      <defs>
        <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
          <stop stopColor="#000000" />
          <stop offset={1} stopColor="#000000" />
        </radialGradient>
      </defs>
    </svg>
  )
}

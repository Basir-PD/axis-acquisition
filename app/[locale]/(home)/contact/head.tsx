export default function Head() {
  return (
    <>
      <link
        rel="preload"
        as="font"
        href="/fonts/GeistSans-Variable.woff2"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href={process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT} />
      <link
        rel="dns-prefetch"
        href={process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}
      />
    </>
  )
}

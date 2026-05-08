import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
  title: 'WordUnscramblr',
  description: 'Word finder and word unscrambler tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'Arial, sans-serif',
          background: '#fff',
          color: '#111',
        }}
      >
        <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-Y2S27B0Z0Y"
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-Y2S27B0Z0Y');
  `}
</Script>
        {children}

        <footer
          style={{
            marginTop: 60,
            padding: 30,
            borderTop: '1px solid #ddd',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            <Link href="/about">About</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <p style={{ marginTop: 20 }}>
            © 2026 WordUnscramblr
          </p>
        </footer>
      </body>
    </html>
  )
}
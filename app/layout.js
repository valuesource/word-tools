import Link from 'next/link'
import Script from 'next/script'
import Header from '@/components/Header'

export const metadata = {
  title: 'WordUnscramblr',
  description: 'Word finder and word unscrambler tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body-root">
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
<Script id="microsoft-clarity" strategy="afterInteractive">
  {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "wnnu98cxqk");
  `}
</Script>
<Header />
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

// Add global styles for the body element
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    .body-root {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #fff;
      color: #111;
    }
  `;
  document.head.appendChild(style);
}
import Link from 'next/link'

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
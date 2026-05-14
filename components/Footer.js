import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid #ddd',
        marginTop: 80,
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gap: 16,
        }}
      >
        <div>
          © {new Date().getFullYear()} WordUnscramblr
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <Link href="/about">
            About
          </Link>

          <Link href="/privacy-policy">
            Privacy Policy
          </Link>

          <Link href="/contact">
            Contact
          </Link>

          <Link href="/guides">
            Guides
          </Link>

          <Link href="/word-lists">
            Word Lists
          </Link>

          <Link href="/wordle-solver">
            Wordle Solver
          </Link>
        </div>
      </div>
    </footer>
  )
}
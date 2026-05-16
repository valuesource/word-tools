import Link from 'next/link'

const links = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/wordle-solver',
    label: 'Wordle Solver',
  },
  {
    href: '/word-lists',
    label: 'Word Lists',
  },
  {
    href: '/guides',
    label: 'Guides',
  },
]

export default function Header() {
  return (
    <header
      style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            fontSize: 28,
            fontWeight: 800,
            color: '#111827',
            letterSpacing: '-0.03em',
          }}
        >
          Word<span style={{ color: '#6aaa64' }}>Unscramblr</span>
        </Link>

        <nav
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                color: '#374151',
                fontWeight: 600,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
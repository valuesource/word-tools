import Link from 'next/link'

export default function Header() {
  return (
    <header
      style={{
        borderBottom: '1px solid #ddd',
        padding: '16px 24px',
        marginBottom: 30,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            textDecoration: 'none',
            color: '#111',
          }}
        >
          WordUnscramblr
        </Link>

        <nav
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <Link href="/word-lists">
  Word Lists
</Link>
          <Link href="/wordle-solver">
            Wordle Solver
          </Link>

          <Link href="/best-wordle-starting-words">
            Best Starters
          </Link>

          <Link href="/scrabble-word-finder">
            Scrabble Finder
          </Link>

          <Link href="/5-letter-words">
            5 Letter Words
          </Link>

          <Link href="/highest-scoring-words">
            High Scoring Words
          </Link>
        </nav>
      </div>
    </header>
  )
}
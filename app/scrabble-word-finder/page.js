import Link from 'next/link'
import InternalLinks from '@/components/InternalLinks'

export const metadata = {
  title: 'Scrabble Word Finder',
  description: 'Find Scrabble words, high scoring words, and words from letters.',
}

export default function ScrabbleWordFinderPage() {
  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: 40 }}>
      <h1>Scrabble Word Finder</h1>

      <p>
        Use this Scrabble word finder to discover playable words, high scoring
        word options, and words made from your letters.
      </p>

      <section style={{ marginTop: 40 }}>
        <h2>Useful Scrabble Tools</h2>

        <ul>
          <li><Link href="/highest-scoring-words">Highest Scoring Words</Link></li>
          <li><Link href="/2-letter-words">2 Letter Words</Link></li>
          <li><Link href="/3-letter-words">3 Letter Words</Link></li>
          <li><Link href="/4-letter-words">4 Letter Words</Link></li>
          <li><Link href="/words-containing/qu">Words Containing QU</Link></li>
          <li><Link href="/words-starting-with/q">Words Starting With Q</Link></li>
          <li><Link href="/words-ending-with/z">Words Ending With Z</Link></li>
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Scrabble Word Tips</h2>

        <p>
          High value letters like Q, Z, X, and J can help create strong scoring
          plays. Short words are also useful because they help connect to
          existing tiles on the board.
        </p>
      </section>

      <InternalLinks />
    </main>
  )
}
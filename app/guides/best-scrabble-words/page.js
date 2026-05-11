import Link from 'next/link'

export const metadata = {
  title: 'Best Scrabble Words',
  description: 'Learn useful Scrabble words and strategies for scoring more points.',
}

export default function BestScrabbleWordsPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 40, lineHeight: 1.7 }}>
      <h1>Best Scrabble Words</h1>

      <p>
        The best Scrabble words are not always the longest words. Strong players
        look for short playable words, high-value letter opportunities, and ways
        to connect multiple words on the board.
      </p>

      <h2>Start With Short Words</h2>

      <p>
        Two-letter and three-letter words are extremely valuable because they
        help you build parallel plays and use tight board spaces.
      </p>

      <ul>
        <li><Link href="/2-letter-words">2 Letter Words</Link></li>
        <li><Link href="/3-letter-words">3 Letter Words</Link></li>
        <li><Link href="/highest-scoring-words">Highest Scoring Words</Link></li>
      </ul>

      <h2>Use High-Value Letters Wisely</h2>

      <p>
        Letters like Q, Z, X, and J can create big scores, especially when
        placed on bonus squares. Look for opportunities to combine these letters
        with short words.
      </p>

      <h2>Helpful Scrabble Tools</h2>

      <ul>
        <li><Link href="/scrabble-word-finder">Scrabble Word Finder</Link></li>
        <li><Link href="/words-containing/qu">Words Containing QU</Link></li>
        <li><Link href="/words-starting-with/q">Words Starting With Q</Link></li>
      </ul>
    </main>
  )
}
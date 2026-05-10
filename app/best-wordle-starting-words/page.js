import Link from 'next/link'

const starters = [
  {
    word: 'slate',
    reason: 'Excellent letter coverage and vowel balance.',
  },
  {
    word: 'crane',
    reason: 'Strong consonant frequency and common vowels.',
  },
  {
    word: 'adieu',
    reason: 'Tests four vowels immediately.',
  },
  {
    word: 'stare',
    reason: 'Very common English letter combination.',
  },
  {
    word: 'trace',
    reason: 'Balanced consonants and vowels.',
  },
]

export const metadata = {
  title: 'Best Wordle Starting Words',
  description:
    'Discover the best Wordle starting words and opening guesses.',
}

export default function BestWordleStartingWordsPage() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: 40,
      }}
    >
      <nav style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <Link href="/best-wordle-starting-words">
          Best Wordle Starting Words
        </Link>
        <Link href="/best-wordle-starting-words">
          Best Starting Words
        </Link>
      </nav>

      <h1>Best Wordle Starting Words</h1>

      <p>
        These starting words provide strong letter coverage,
        balanced vowels, and useful Wordle information.
      </p>

      <div
        style={{
          display: 'grid',
          gap: 16,
          marginTop: 30,
        }}
      >
        {starters.map((item) => (
          <div
            key={item.word}
            style={{
              border: '1px solid #ddd',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                letterSpacing: 3,
              }}
            >
              {item.word.toUpperCase()}
            </div>

            <p style={{ marginTop: 10 }}>
              {item.reason}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
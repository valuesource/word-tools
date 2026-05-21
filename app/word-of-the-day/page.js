import { supabase } from '@/lib/supabase'
import Link from 'next/link'

function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date - start
  const oneDay = 1000 * 60 * 60 * 24

  return Math.floor(diff / oneDay)
}

export const metadata = {
  title: 'Word Of The Day',
  description:
    'Discover a new featured word every day with definitions, scores, and word game insights.',
}

function getDefinition(word) {
  return `${word.toUpperCase()} is a playable word found in word-game dictionaries. It may be useful for Scrabble, crossword puzzles, anagrams, and other word-solving games.`
}

export default async function WordOfTheDayPage() {
  const day = getDayOfYear()

  const { count } = await supabase
    .from('words')
    .select('*', { count: 'exact', head: true })

  const offset = day % Math.max(count || 1, 1)

  const { data, error } = await supabase
    .from('words')
    .select('word, scrabble_score, frequency, length')
    .range(offset, offset)
    .single()

  if (error || !data) {
    return (
      <main className="page">
        <h1>Word Of The Day</h1>

        <p>Unable to load today’s word.</p>
      </main>
    )
  }

  const word = data.word.toUpperCase()

  const definition = getDefinition(data.word)

  return (
    <main className="page">
      <section
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: 40,
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}
      >
        <p
          style={{
            color: '#6aaa64',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Today’s Featured Word
        </p>

        <h1
          style={{
            fontSize: 'clamp(48px, 10vw, 90px)',
            margin: '20px 0',
            letterSpacing: '-0.04em',
          }}
        >
          {word}
        </h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            flexWrap: 'wrap',
            marginTop: 30,
          }}
        >
          <div className="card">
            <strong>Length</strong>
            <div>{data.length} letters</div>
          </div>

          <div className="card">
            <strong>Scrabble Score</strong>
            <div>{data.scrabble_score} pts</div>
          </div>

          <div className="card">
            <strong>Frequency</strong>
            <div>{data.frequency}</div>
          </div>
        </div>
      <div
          style={{
            marginTop: 40,
            fontSize: 20,
            color: '#555',
            lineHeight: 1.8,
            maxWidth: 760,
            marginInline: 'auto',
          }}
        >
          {definition}
        </div>
      </section>

      <section
        style={{
          marginTop: 60,
          background: '#fff',
          borderRadius: 24,
          padding: 32,
        }}
      >
        <h2>Explore More Word Tools</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
            marginTop: 24,
          }}
        >
          {[
            {
              title: 'Words Starting With',
              href: `/words-starting-with/${data.word[0]}`,
            },
            {
              title: 'Words Ending With',
              href: `/words-ending-with/${data.word.slice(-2)}`,
            },
            {
              title: 'Wordle Solver',
              href: '/wordle-solver',
            },
            {
              title: 'Highest Scoring Words',
              href: '/highest-scoring-words',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card"
              style={{
                textDecoration: 'none',
                color: '#111',
              }}
            >
              <h3>{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
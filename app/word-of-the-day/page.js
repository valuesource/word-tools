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
    'Discover a featured word every day with definition, pronunciation, etymology, Scrabble value, and Wordle suitability.',
}

export default async function WordOfTheDayPage() {
  const { data: words, error } = await supabase
    .from('daily_words')
    .select('*')
    .order('id')

  if (error || !words || words.length === 0) {
    return (
      <main className="page">
        <h1>Word Of The Day</h1>
        <p>Unable to load today’s word.</p>
      </main>
    )
  }

  const index = getDayOfYear() % words.length
  const item = words[index]

  return (
    <main className="page">
      <section className="card" style={{ textAlign: 'center' }}>
        <p style={{ color: '#6aaa64', fontWeight: 700 }}>
          Today’s Word Of The Day
        </p>

        <h1 style={{ fontSize: 72, margin: '20px 0' }}>
          {item.word.toUpperCase()}
        </h1>

        {item.pronunciation && (
          <p style={{ fontSize: 22 }}>
            Pronunciation: <strong>{item.pronunciation}</strong>
          </p>
        )}

        <p style={{ fontSize: 20, lineHeight: 1.7 }}>
          {item.definition}
        </p>
      </section>

      <section className="card" style={{ marginTop: 40 }}>
        <h2>Word Details</h2>

        <p><strong>Scrabble Value:</strong> {item.scrabble_score} points</p>

        <p>
          <strong>Wordle Suitability:</strong>{' '}
          {item.wordle_suitability || 'Not rated yet.'}
        </p>

        <p>
          <strong>Etymology:</strong>{' '}
          {item.etymology || 'Etymology coming soon.'}
        </p>

        {item.notes && <p><strong>Notes:</strong> {item.notes}</p>}
      </section>

      <section className="card" style={{ marginTop: 40 }}>
        <h2>Get Word Of The Day by Email</h2>

        <form action="/api/subscribe-word-of-the-day" method="POST">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            style={{
              padding: 14,
              fontSize: 18,
              borderRadius: 8,
              border: '1px solid #ddd',
              marginRight: 10,
            }}
          />

          <button
            type="submit"
            style={{
              padding: '14px 20px',
              fontSize: 18,
              borderRadius: 8,
              border: 'none',
              background: '#111',
              color: '#fff',
            }}
          >
            Subscribe
          </button>
        </form>
      </section>

      <section className="card" style={{ marginTop: 40 }}>
        <h2>Explore More</h2>

        <ul>
          <li><Link href="/wordle-solver">Wordle Solver</Link></li>
          <li><Link href="/scrabble-word-finder">Scrabble Word Finder</Link></li>
          <li><Link href="/highest-scoring-words">Highest Scoring Words</Link></li>
          <li><Link href="/guides">Word Game Guides</Link></li>
        </ul>
      </section>
    </main>
  )
}
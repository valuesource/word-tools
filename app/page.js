'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [letters, setLetters] = useState('')
  const router = useRouter()

  function handleSubmit(e) {
    e.preventDefault()

    const cleaned = letters
      .toLowerCase()
      .replace(/[^a-z]/g, '')

    if (!cleaned) return

    router.push(`/words-with-letters/${cleaned}`)
  }

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: 40,
      }}
    >
      <h1
        style={{
          fontSize: 52,
          marginBottom: 10,
        }}
      >
        Word Unscrambler
      </h1>

      <p
        style={{
          fontSize: 22,
          lineHeight: 1.6,
          marginBottom: 30,
        }}
      >
        Unscramble letters, discover words, solve Wordle puzzles,
        find Scrabble words, and improve your word game skills.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 50,
        }}
      >
        <input
          type="text"
          placeholder="Enter letters..."
          value={letters}
          onChange={(e) => setLetters(e.target.value)}
          style={{
            flex: 1,
            padding: 18,
            fontSize: 22,
            borderRadius: 10,
            border: '1px solid #ccc',
          }}
        />

        <button
          type="submit"
          style={{
            padding: '18px 28px',
            fontSize: 20,
            borderRadius: 10,
            border: 'none',
            background: '#111',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </form>

      <section style={{ marginBottom: 50 }}>
        <h2>Popular Word Lists</h2>

        <ul>
          <li><Link href="/3-letter-words">3 Letter Words</Link></li>
          <li><Link href="/4-letter-words">4 Letter Words</Link></li>
          <li><Link href="/5-letter-words">5 Letter Words</Link></li>
          <li><Link href="/6-letter-words">6 Letter Words</Link></li>
          <li><Link href="/7-letter-words">7 Letter Words</Link></li>
        <li><Link href="/highest-scoring-words">Highest Scoring Words</Link></li>
        <li><Link href="/wordle-helper">Wordle Helper</Link></li>
        <li><Link href="/scrabble-word-finder">Scrabble Word Finder</Link></li>
        <li><Link href="/best-wordle-starting-words">Best Wordle Starting Words</Link></li>
        
        </ul>
      </section>

      <section style={{ marginBottom: 50 }}>
        <h2>Popular Letter Patterns</h2>

        <ul>
          <li><Link href="/words-containing/th">Words Containing TH</Link></li>
          <li><Link href="/words-containing/qu">Words Containing QU</Link></li>
          <li><Link href="/words-containing/ing">Words Containing ING</Link></li>
          <li><Link href="/words-containing/tion">Words Containing TION</Link></li>
          <li><Link href="/words-containing/er">Words Containing ER</Link></li>
        </ul>
      </section>

      <section style={{ marginBottom: 50 }}>
        <h2>Browse By Letter</h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
            <Link
              key={letter}
              href={`/words-starting-with/${letter}`}
              style={{
                padding: '10px 14px',
                border: '1px solid #ccc',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              {letter.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>About WordUnscramblr</h2>

        <p>
          WordUnscramblr helps players solve word games including Scrabble,
          Wordle, crossword puzzles, Words With Friends, and more.
        </p>

        <p>
          Use our tools to find words by length, starting letter,
          ending letter, or letter combinations.
        </p>
      </section>
    </main>
  )
}
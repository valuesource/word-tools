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
        padding: 40,
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontSize: 48,
          marginBottom: 10,
        }}
      >
        Word Unscrambler
      </h1>

      <p
        style={{
          fontSize: 20,
          marginBottom: 30,
        }}
      >
        Find words for Scrabble, Wordle, crossword puzzles, and word games.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 40,
        }}
      >
        <input
          type="text"
          placeholder="Enter letters..."
          value={letters}
          onChange={(e) => setLetters(e.target.value)}
          style={{
            flex: 1,
            padding: 16,
            fontSize: 20,
            borderRadius: 8,
            border: '1px solid #ccc',
          }}
        />

        <button
          type="submit"
          style={{
            padding: '16px 24px',
            fontSize: 18,
            borderRadius: 8,
            border: 'none',
            background: '#111',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </form>

      <section style={{ marginBottom: 40 }}>
        <h2>Popular Word Tools</h2>

        <ul>
          <li><Link href="/3-letter-words">3 Letter Words</Link></li>
          <li><Link href="/4-letter-words">4 Letter Words</Link></li>
          <li><Link href="/5-letter-words">5 Letter Words</Link></li>
          <li><Link href="/words-containing/th">Words Containing TH</Link></li>
          <li><Link href="/words-starting-with/s">Words Starting With S</Link></li>
        </ul>
      </section>

      <section>
        <h2>How To Use The Word Unscrambler</h2>

        <p>
          Enter your letters into the search box to find words for Scrabble,
          Wordle, Words With Friends, crossword puzzles, and other word games.
        </p>

        <p>
          You can also browse words by length, starting letter, ending letter,
          or common letter patterns.
        </p>
      </section>
    </main>
  )
}
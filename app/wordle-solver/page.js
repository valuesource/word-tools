'use client'

import { useState } from 'react'

export default function WordleSolverPage() {
  const [include, setInclude] = useState('')
  const [exclude, setExclude] = useState('')
  const [pattern, setPattern] = useState('')
  const [results, setResults] = useState([])

  async function handleSearch(e) {
    e.preventDefault()

    const response = await fetch(
  `/api/wordle-solver?include=${include}&exclude=${exclude}&pattern=${pattern}`
)

    const data = await response.json()

    setResults(data.words || [])
  }

  return (
    <main
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: 40,
      }}
    >
      <h1>Wordle Solver</h1>

      <p>
        Find possible Wordle answers using included and excluded letters.
      </p>

      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 30,
          flexWrap: 'wrap',
        }}
      >
        <input
          placeholder="Include letters"
          value={include}
          onChange={(e) => setInclude(e.target.value)}
          style={{
            padding: 12,
            fontSize: 18,
          }}
        />

        <input
          placeholder="Exclude letters"
          value={exclude}
          onChange={(e) => setExclude(e.target.value)}
          style={{
            padding: 12,
            fontSize: 18,
          }}
        />

<input
  placeholder="Pattern (example: a**e*)"
  value={pattern}
  onChange={(e) => setPattern(e.target.value)}
  style={{
    padding: 12,
    fontSize: 18,
  }}
/>

        <button
          type="submit"
          style={{
            padding: '12px 20px',
            fontSize: 18,
          }}
        >
          Solve
        </button>
      </form>

      <ul>
        {results.map((word) => (
          <li key={word.word}>
            {word.word} — {word.scrabble_score} pts
          </li>
        ))}
      </ul>
    </main>
  )
}
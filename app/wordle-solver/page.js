'use client'
import { useState } from 'react'
import WordleRow from '@/components/solver/WordleRow'

export default function WordleSolverPage() {
  const [include, setInclude] = useState('')
  const [exclude, setExclude] = useState('')
  const [pattern, setPattern] = useState('')
  const [yellow, setYellow] = useState('')
  const [results, setResults] = useState([])
  const [tiles, setTiles] = useState([
  { letter: '', status: 'gray' },
  { letter: '', status: 'gray' },
  { letter: '', status: 'gray' },
  { letter: '', status: 'gray' },
  { letter: '', status: 'gray' },
])

  async function handleSearch(e) {
    e.preventDefault()

    async function handleSearch(e) {
  e.preventDefault()

  let generatedPattern = ''
  let generatedInclude = ''
  let generatedExclude = ''
  let generatedYellow = []

  tiles.forEach((tile, index) => {
    const letter = tile.letter

    if (!letter) {
      generatedPattern += '*'
      return
    }

    if (tile.status === 'green') {
      generatedPattern += letter
      generatedInclude += letter
    } else {
      generatedPattern += '*'
    }

    if (tile.status === 'yellow') {
      generatedInclude += letter
      generatedYellow.push(`${letter}:${index + 1}`)
    }

    if (tile.status === 'gray') {
      generatedExclude += letter
    }
  })

  const params = new URLSearchParams({
    include: generatedInclude || include,
    exclude: generatedExclude || exclude,
    pattern: generatedPattern || pattern,
    yellow: generatedYellow.join(',') || yellow,
  })

  const response = await fetch(
    `/api/wordle-solver?${params.toString()}`
  )

  const data = await response.json()

  setResults(data.words || [])
}

 const params = new URLSearchParams({
  include,
  exclude,
  pattern,
  yellow,
})

const response = await fetch(`/api/wordle-solver?${params.toString()}`)

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
<WordleRow tiles={tiles} setTiles={setTiles} />
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

<input

  placeholder="Yellow letters (example: e:1,a:4)"
  value={yellow}
  onChange={(e) => setYellow(e.target.value)}
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

      <div
  style={{
    marginTop: 30,
    display: 'grid',
    gap: 12,
  }}
>
  {results.map((word) => {
    const qualityColors = {
      'Excellent Guess': '#6aaa64',
      'Strong Guess': '#c9b458',
      'Vowel Heavy': '#4a90e2',
      'Standard Guess': '#787c7e',
    }

    return (
      <div
        key={word.word}
        style={{
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              letterSpacing: 2,
            }}
          >
            {word.word.toUpperCase()}
          </div>

          <div
            style={{
              marginTop: 6,
              color: qualityColors[word.guessQuality],
              fontWeight: 600,
            }}
          >
            {word.guessQuality}
          </div>
        </div>

        <div
          style={{
            textAlign: 'right',
            color: '#666',
          }}
        >
          <div>{word.uniqueScore} unique</div>
          <div>{word.scrabble_score} pts</div>
        </div>
      </div>
    )
  })}
</div>
    </main>
  )
}
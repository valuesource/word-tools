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

    router.push(`/words-from-letters/${cleaned}`)
  }

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: 40,
      }}
    >

      <section
  style={{
    textAlign: 'center',
    padding: '70px 20px 50px',
  }}
>
  <h1
    style={{
      fontSize: 'clamp(42px, 7vw, 72px)',
      lineHeight: 1,
      marginBottom: 24,
      letterSpacing: '-0.04em',
    }}
  >
    Word Solver Tools for{' '}
    <span style={{ color: '#6aaa64' }}>
      Wordle
    </span>{' '}
    & Scrabble
  </h1>

  <p
    style={{
      maxWidth: 760,
      margin: '0 auto',
      fontSize: 20,
      color: '#555',
      lineHeight: 1.7,
    }}
  >
    Unscramble words, solve Wordle puzzles, discover high-scoring
    Scrabble plays, and explore powerful word lists instantly.
  </p>
</section>

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
        <li><Link href="/guides">Word Game Guides</Link></li>
        
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

      <section
  style={{
    marginTop: 20,
    background: '#f8fafc',
    borderRadius: 24,
    padding: 15,
  }}
>
  <h2
    style={{
      marginBottom: 20,
    }}
  >
    Popular Word Searches
  </h2>

  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
    }}
  >
    {[
      {
        label: '5 Letter Words',
        href: '/5-letter-words',
      },
      {
        label: 'Words Starting With Q',
        href: '/words-starting-with/q',
      },
      {
        label: '2 Letter Words',
        href: '/2-letter-words',
      },
      {
        label: 'Highest Scoring Words',
        href: '/highest-scoring-words',
      },
      {
        label: 'Words Containing TH',
        href: '/words-containing/th',
      },
      {
        label: 'Wordle Solver',
        href: '/wordle-solver',
      },
      {
        label: 'Words Ending With ING',
        href: '/words-ending-with/ing',
      },
      {
        label: 'Q Words Without U',
        href: '/guides/q-without-u-words',
      },
    ].map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)'
  e.currentTarget.style.boxShadow =
    '0 8px 24px rgba(0,0,0,0.10)'
}}

onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)'
  e.currentTarget.style.boxShadow =
    '0 2px 10px rgba(0,0,0,0.05)'
}}
        style={{
          padding: '12px 18px',
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: 999,
          textDecoration: 'none',
          color: '#111',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        {item.label}
      </Link>
    ))}
  </div>
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

      <section
  style={{
    marginTop: 20,
    background: '#fff',
    borderRadius: 24,
    padding: 15,
  }}
>
  <h2>How WordUnscramblr Works</h2>

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
        title: 'Enter Your Letters',
        text: 'Type the letters you have into the search box to find possible words.',
      },
      {
        title: 'Find Matching Words',
        text: 'Browse words by length, score, starting letter, ending letter, or pattern.',
      },
      {
        title: 'Use Game Tools',
        text: 'Try the Wordle Solver, Scrabble tools, and word lists to narrow results.',
      },
    ].map((item) => (
      <div
        key={item.title}
        style={{
          border: '1px solid #ddd',
          borderRadius: 18,
          padding: 24,
          background: '#f8fafc',
        }}
      >
        <h3>{item.title}</h3>
        <p style={{ color: '#555', lineHeight: 1.6 }}>
          {item.text}
        </p>
      </div>
    ))}
  </div>
</section>

<section
  style={{
    marginTop: 20,
    background: '#f8fafc',
    borderRadius: 24,
    padding: 15,
  }}
>
  <h2>Why Use WordUnscramblr?</h2>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 20,
      marginTop: 20,
    }}
  >
    {[
      {
        title: 'Fast Word Finding',
        text: 'Quickly discover words from letters, patterns, prefixes, suffixes, and word lengths.',
      },
      {
        title: 'Game-Focused Tools',
        text: 'Use tools built for Wordle, Scrabble, crossword puzzles, and other word games.',
      },
      {
        title: 'Helpful Word Guides',
        text: 'Learn strategies, scoring tips, and word game techniques with practical guides.',
      },
    ].map((item) => (
      <div
        key={item.title}
        style={{
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: 18,
          padding: 15,
        }}
      >
        <h3>{item.title}</h3>
        <p style={{ color: '#555', lineHeight: 1.6 }}>
          {item.text}
        </p>
      </div>
    ))}
  </div>
</section>

      <section
  style={{
    marginTop: 20,
    background: '#f8fafc',
    borderRadius: 24,
    padding: 15,
  }}
>
  <h2
    style={{
      marginBottom: 30,
    }}
  >
    Featured Word Tools
  </h2>

  <div
    style={{
      transform: 'translateY(0)',
      transition: 'all 0.2s ease',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 20,
    }}

  >
    {[
      {
        title: 'Wordle Solver',
        href: '/wordle-solver',
        description:
          'Solve Wordle puzzles using green, yellow, and excluded letters.',
      },
      {
        title: 'Words From Letters',
        href: '/words-from-letters/listen',
        description:
          'Generate playable words from any group of letters.',
      },
      {
        title: 'Best Wordle Starting Words',
        href: '/best-wordle-starting-words',
        description:
          'Discover strong opening guesses and Wordle strategies.',
      },
      {
        title: 'Highest Scoring Words',
        href: '/highest-scoring-words',
        description:
          'Find high-value Scrabble words and scoring opportunities.',
      },
      {
  title: 'Word Of The Day',
  href: '/word-of-the-day',
  description:
    'Discover a featured word every day with scores and word-game insights.',
},
    ].map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)'
  e.currentTarget.style.boxShadow =
    '0 8px 24px rgba(0,0,0,0.10)'
}}

onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)'
  e.currentTarget.style.boxShadow =
    '0 2px 10px rgba(0,0,0,0.05)'
}}
        style={{
          border: '1px solid #ddd',
          borderRadius: 18,
          padding: 24,
          textDecoration: 'none',
          color: '#111',
          background: '#fff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          transition: 'all 0.2s ease',
        }}
      >
        <h3
          style={{
            marginBottom: 12,
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            color: '#555',
            lineHeight: 1.6,
          }}
        >
          {item.description}
        </p>
      </Link>
    ))}
  </div>
</section>

<section
  style={{
    marginTop: 20,
    background: '#f8fafc',
    borderRadius: 24,
    padding: 15,
  }}
>
  <h2
    style={{
      marginBottom: 30,
    }}
  >
    Featured Guides
  </h2>

  <div
    style={{
      transform: 'translateY(0)',
      transition: 'all 0.2s ease',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 20,
    }}
  >
    {[
      {
        title: 'How To Win Wordle',
        href: '/guides/how-to-win-wordle',
        description:
          'Learn practical strategies for solving Wordle puzzles more consistently.',
      },
      {
        title: 'Best Wordle Strategies',
        href: '/guides/best-wordle-strategies',
        description:
          'Discover advanced Wordle tactics and smarter guessing techniques.',
      },
      {
        title: 'Q Words Without U',
        href: '/guides/q-without-u-words',
        description:
          'Master useful Q words that do not require a U in Scrabble.',
      },
      {
        title: 'Best Scrabble Words',
        href: '/guides/best-scrabble-words',
        description:
          'Improve your Scrabble game with high-value words and scoring tips.',
      },
    ].map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)'
  e.currentTarget.style.boxShadow =
    '0 8px 24px rgba(0,0,0,0.10)'
}}

onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)'
  e.currentTarget.style.boxShadow =
    '0 2px 10px rgba(0,0,0,0.05)'
}}
        style={{
          border: '1px solid #ddd',
          borderRadius: 18,
          padding: 24,
          textDecoration: 'none',
          color: '#111',
          background: '#fff',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          transition: 'all 0.2s ease',
        }}
      >
        <h3
          style={{
            marginBottom: 30,
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            color: '#555',
            lineHeight: 1.6,
          }}
        >
          {item.description}
        </p>
      </Link>
    ))}
  </div>
</section>

       <section
  style={{
    marginTop: 30,
    lineHeight: 1.8,
  }}
>

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
      <section
  style={{
    marginTop: 30,
    lineHeight: 1.8,
  }}
>
  <h2>Word Tools for Wordle, Scrabble, and More</h2>

  <p>
    WordUnscramblr provides free tools for solving Wordle puzzles,
    finding Scrabble words, exploring word lists, and discovering
    high-scoring word combinations.
  </p>

  <p>
    Whether you need a Wordle solver, an anagram finder, or a list
    of words containing specific letters, our tools are designed to
    help players solve word games more efficiently.
  </p>

  <h3>Popular Word Tools</h3>

  <ul>
    <li>
      <Link href="/wordle-solver">
        Wordle Solver
      </Link>
    </li>

    <li>
      <Link href="/best-wordle-starting-words">
        Best Wordle Starting Words
      </Link>
    </li>

    <li>
      <Link href="/highest-scoring-words">
        Highest Scoring Scrabble Words
      </Link>
    </li>

    <li>
      <Link href="/word-lists">
        Word Lists
      </Link>
    </li>
  </ul>

  <h3>How Our Word Solver Works</h3>

  <p>
    Enter your known letters, excluded letters, or word patterns
    to generate matching words instantly. Our solver supports
    Wordle-style pattern matching, yellow-letter filtering,
    and advanced word ranking based on useful letter coverage.
  </p>

  <p>
    The site also includes thousands of word lists organized by
    starting letters, endings, patterns, and word length to help
    with crossword puzzles, Scrabble, and other word games.
  </p>
</section>
    </main>
  )
}
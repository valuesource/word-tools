import Link from 'next/link'

export const metadata = {
  title: 'Word Lists',
  description: 'Browse word lists by length, starting letter, ending letter, and patterns.',
}

export default function WordListsPage() {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: 40 }}>
      <h1>Word Lists</h1>

      <p>
        Browse words by length, starting letter, ending letter, and common letter patterns.
      </p>

      <section style={{ marginTop: 40 }}>
        <h2>Words by Length</h2>
        <ul>
          {[2,3,4,5,6,7,8,9,10,11,12].map((length) => (
            <li key={length}>
              <Link href={`/${length}-letter-words`}>
                {length} Letter Words
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Words Starting With</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {letters.map((letter) => (
            <Link key={letter} href={`/words-starting-with/${letter}`}>
              {letter.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Popular Patterns</h2>
        <ul>
          <li><Link href="/words-containing/th">Words Containing TH</Link></li>
          <li><Link href="/words-containing/qu">Words Containing QU</Link></li>
          <li><Link href="/words-containing/ing">Words Containing ING</Link></li>
          <li><Link href="/words-containing/tion">Words Containing TION</Link></li>
        </ul>
      </section>
    </main>
  )
}
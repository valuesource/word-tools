import Link from 'next/link'

export const metadata = {
  title: 'Wordle Helper',
  description: 'Find Wordle answers, hints, and 5 letter words.',
}

export default function WordleHelperPage() {
  return (
    <main
      style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: 40,
      }}
    >
      <h1>Wordle Helper</h1>

      <p>
        Use our Wordle helper tools to find 5 letter words,
        discover possible answers, and improve your Wordle strategy.
      </p>

      <section style={{ marginTop: 40 }}>
        <h2>Popular Wordle Searches</h2>

        <ul>
          <li>
            <Link href="/5-letter-words">
              5 Letter Words
            </Link>
          </li>

          <li>
            <Link href="/words-containing/ou">
              Words Containing OU
            </Link>
          </li>

          <li>
            <Link href="/words-ending-with/at">
              Words Ending With AT
            </Link>
          </li>

          <li>
            <Link href="/words-starting-with/s">
              Words Starting With S
            </Link>
          </li>

          <li>
            <Link href="/pattern/a**e*">
              Words Matching A**E*
            </Link>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>How To Use The Wordle Helper</h2>

        <p>
          Browse word lists by letter patterns, starting letters,
          ending letters, and known character positions.
        </p>

        <p>
          Use wildcard searches to discover possible Wordle answers
          based on the clues you already know.
        </p>
      </section>
    </main>
  )
}
import Link from 'next/link'

export default function InternalLinks({ letters = '', length = null }) {
  const cleanLetters = letters.toLowerCase()

  return (
    <section style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #ddd' }}>
      <h2>Related Word Tools</h2>

      <ul>
        <li><Link href="/">Word Unscrambler</Link></li>
        <li><Link href="/3-letter-words">3 Letter Words</Link></li>
        <li><Link href="/4-letter-words">4 Letter Words</Link></li>
        <li><Link href="/5-letter-words">5 Letter Words</Link></li>
        <li><Link href="/6-letter-words">6 Letter Words</Link></li>

        {cleanLetters && (
          <>
            <li><Link href={`/words-with-letters/${cleanLetters}`}>Words With Letters {cleanLetters.toUpperCase()}</Link></li>
            <li><Link href={`/words-starting-with/${cleanLetters[0]}`}>Words Starting With {cleanLetters[0].toUpperCase()}</Link></li>
            <li><Link href={`/words-ending-with/${cleanLetters[cleanLetters.length - 1]}`}>Words Ending With {cleanLetters[cleanLetters.length - 1].toUpperCase()}</Link></li>
          </>
        )}

        {length && ![3, 4, 5, 6].includes(Number(length)) && (
          <li><Link href={`/${length}-letter-words`}>{length} Letter Words</Link></li>
        )}
      </ul>
    </section>
  )
}
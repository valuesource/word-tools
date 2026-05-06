export default function InternalLinks({ letters = '', length = null }) {
  const cleanLetters = letters.toLowerCase()

  return (
    <section style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #ddd' }}>
      <h2>Related Word Tools</h2>

      <ul>
        <li><a href="/">Word Unscrambler</a></li>
        <li><a href="/3-letter-words">3 Letter Words</a></li>
        <li><a href="/4-letter-words">4 Letter Words</a></li>
        <li><a href="/5-letter-words">5 Letter Words</a></li>
        <li><a href="/6-letter-words">6 Letter Words</a></li>

        {cleanLetters && (
          <>
            <li><a href={`/words-with-letters/${cleanLetters}`}>Words With Letters {cleanLetters.toUpperCase()}</a></li>
            <li><a href={`/words-starting-with/${cleanLetters[0]}`}>Words Starting With {cleanLetters[0].toUpperCase()}</a></li>
            <li><a href={`/words-ending-with/${cleanLetters[cleanLetters.length - 1]}`}>Words Ending With {cleanLetters[cleanLetters.length - 1].toUpperCase()}</a></li>
          </>
        )}

       {length && ![3, 4, 5, 6].includes(Number(length)) && (
  <li><a href={`/${length}-letter-words`}>{length} Letter Words</a></li>
)}
      </ul>
    </section>
  )
}
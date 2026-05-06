export default function WordList({ words = [] }) {
  if (!words.length) {
    return <p>No words found yet.</p>
  }

  const sortedWords = words.map((w) => w.word).sort()

  const topWords = sortedWords.slice(0, 20)
  const rest = sortedWords.slice(20)

  return (
    <section>
      <h2>Top Words</h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20
      }}>
        {topWords.map((word) => (
          <a
            key={word}
            href={`/words-with-letters/${word}`}
            style={{
              padding: 8,
              border: '1px solid #333',
              borderRadius: 6,
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'black'
            }}
          >
            {word}
          </a>
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <h2>All Words</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 8
          }}>
            {rest.map((word) => (
              <a
                key={word}
                href={`/words-with-letters/${word}`}
                style={{
                  padding: 8,
                  border: '1px solid #ddd',
                  borderRadius: 6,
                  textDecoration: 'none',
                  color: 'black'
                }}
              >
                {word}
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
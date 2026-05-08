export default function WordList({ words = [] }) {
  if (!words.length) {
    return <p>No words found yet.</p>
  }

  return (
    <ul
      style={{
        columns: 3,
        gap: 40,
      }}
    >
      {words.map((item) => (
        <li
          key={item.word}
          style={{
            marginBottom: 8,
            breakInside: 'avoid',
          }}
        >
          <strong>{item.word}</strong>

          {typeof item.scrabble_score === 'number' && (
            <span
              style={{
                marginLeft: 8,
                color: '#666',
                fontSize: 14,
              }}
            >
              {item.scrabble_score} pts
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
import WordleTile from './WordleTile'

export default function WordleRow({ tiles, setTiles }) {
  function updateTile(index, updates) {
    const nextTiles = [...tiles]
    nextTiles[index] = {
      ...nextTiles[index],
      ...updates,
    }
    setTiles(nextTiles)
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        marginBottom: 20,
      }}
    >
      {tiles.map((tile, index) => (
        <WordleTile
          key={index}
          value={tile.letter}
          status={tile.status}
          onChange={(letter) => updateTile(index, { letter })}
          onStatusChange={(status) => updateTile(index, { status })}
        />
      ))}
    </div>
  )
}
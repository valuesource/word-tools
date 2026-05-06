export default function SeoContent({ type, letters = '', length = null, value = '' }) {
  if (type === 'letters') {
    return (
      <section style={{ marginTop: 30 }}>
        <h2>How to Use These Letters</h2>
        <p>
          This page helps you find words that can be made with or contain the letters{' '}
          <strong>{letters.toUpperCase()}</strong>. Use the list for word games like
          Scrabble, Words with Friends, Wordle-style puzzles, and general word solving.
        </p>

        <h2>Tips for Finding Better Words</h2>
        <p>
          Try looking for common prefixes, suffixes, and vowel combinations. Shorter words
          are often easier to spot first, while longer words can give you more points in
          many word games.
        </p>
      </section>
    )
  }

  if (type === 'length') {
    return (
      <section style={{ marginTop: 30 }}>
        <h2>About {length} Letter Words</h2>
        <p>
          {length} letter words are useful for word games, vocabulary building, spelling
          practice, and puzzle solving. Browse the list to find playable words, discover
          new options, or narrow down possible answers.
        </p>

        <h2>How to Use This Word List</h2>
        <p>
          Start by scanning for familiar words, then use related pages to find words that
          start with a specific letter, end with a specific letter, or contain certain
          letters.
        </p>
      </section>
    )
  }

  if (type === 'starts') {
    return (
      <section style={{ marginTop: 30 }}>
        <h2>Words That Start With {value.toUpperCase()}</h2>
        <p>
          This page lists words beginning with <strong>{value.toUpperCase()}</strong>.
          Starting-letter pages are helpful when you know the first letter of a word or
          when you need to build words from a fixed clue.
        </p>

        <h2>Word Game Tip</h2>
        <p>
          In games like Scrabble and Words with Friends, starting letters can help you
          quickly narrow your options and find playable words from your available tiles.
        </p>
      </section>
    )
  }

  if (type === 'ends') {
    return (
      <section style={{ marginTop: 30 }}>
        <h2>Words That End With {value.toUpperCase()}</h2>
        <p>
          This page lists words ending with <strong>{value.toUpperCase()}</strong>.
          Ending-letter pages are especially useful for rhyming, crossword clues, suffix
          searches, and word game strategy.
        </p>

        <h2>Word Game Tip</h2>
        <p>
          Try combining endings with word length pages to narrow your search even further,
          such as finding 5 letter words that end with a specific letter.
        </p>
      </section>
    )
  }

  return null
}
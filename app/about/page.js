export const metadata = {
  title: 'About WordUnscramblr',
  description: 'Learn more about WordUnscramblr and our word game tools.',
}

export default function AboutPage() {
  return (
    <main
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: 40,
      }}
    >
      <h1>About WordUnscramblr</h1>

      <p>
        WordUnscramblr is a free online word finder and word unscrambler tool
        built for Scrabble players, Wordle fans, crossword puzzle solvers,
        Words With Friends players, and anyone who enjoys word games.
      </p>

      <p>
        Our tools help users discover words by length, letter combinations,
        starting letters, ending letters, and common patterns.
      </p>

      <h2>What We Offer</h2>

      <ul>
        <li>Word Unscrambler</li>
        <li>Words by Length</li>
        <li>Words Starting With Specific Letters</li>
        <li>Words Ending With Specific Letters</li>
        <li>Words Containing Letter Patterns</li>
      </ul>

      <p>
        Our goal is to create fast, simple, and useful tools for word game
        players and puzzle enthusiasts.
      </p>
    </main>
  )
}
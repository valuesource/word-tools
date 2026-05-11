import Link from 'next/link'

export const metadata = {
  title: 'Word Game Guides',
  description:
    'Learn Wordle strategies, Scrabble tips, and word game techniques.',
}

const guides = [
  {
    title: 'How To Win Wordle',
    href: '/guides/how-to-win-wordle',
    description:
      'Learn strategies for solving Wordle puzzles faster and more consistently.',
  },
  {
    title: 'Best Wordle Strategies',
    href: '/guides/best-wordle-strategies',
    description:
      'Discover advanced Wordle tactics and effective guessing techniques.',
  },
  {
    title: 'Best Scrabble Words',
    href: '/guides/best-scrabble-words',
    description:
      'Improve your Scrabble score with high-value words and smart strategies.',
  },
]

export default function GuidesPage() {
  return (
    <main
      style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: 40,
      }}
    >
      <h1>Word Game Guides</h1>

      <p>
        Explore guides, tutorials, and strategies for Wordle, Scrabble,
        and other word games.
      </p>

      <div
        style={{
          display: 'grid',
          gap: 20,
          marginTop: 30,
        }}
      >
        {guides.map((guide) => (
          <div
            key={guide.href}
            style={{
              border: '1px solid #ddd',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <h2>
              <Link href={guide.href}>
                {guide.title}
              </Link>
            </h2>

            <p>{guide.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
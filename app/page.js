import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Word Unscrambler</h1>

      <h2>Test Pages</h2>
      <ul>
        <li><Link href="/3-letter-words">3 Letter Words</Link></li>
        <li><Link href="/4-letter-words">4 Letter Words</Link></li>
        <li><Link href="/5-letter-words">5 Letter Words</Link></li>
        <li><Link href="/words-with-letters/aert">Words With Letters AERT</Link></li>
      </ul>
    </main>
  )
}
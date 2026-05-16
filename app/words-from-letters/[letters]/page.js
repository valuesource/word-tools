import { supabase } from '@/lib/supabase'
import WordList from '@/components/WordList'
import InternalLinks from '@/components/InternalLinks'
import JsonLd from '@/components/JsonLd'
import { canMakeWord } from '@/lib/canMakeWord'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const letters = (resolvedParams.letters || '').toLowerCase()

  return {
    title: `Words From Letters ${letters.toUpperCase()}`,
    description: `Find words that can be made from the letters ${letters.toUpperCase()}.`,
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params

  const letters = (resolvedParams.letters || '')
 .toLowerCase()
 .replace(/[^a-z]/g, '')

const maxLength = letters.length

const letterCounts = {}

'abcdefghijklmnopqrstuvwxyz'.split('').forEach((letter) => {
  letterCounts[letter] = 0
})

letters.split('').forEach((letter) => {
  letterCounts[letter] += 1
})

let query = supabase
  .from('words')
  .select('word, scrabble_score, frequency, length')
  .lte('length', maxLength)

Object.entries(letterCounts).forEach(([letter, count]) => {
  query = query.lte(`${letter}_count`, count)
})

const { data, error } = await query
  .order('length', { ascending: false })
  .order('scrabble_score', { ascending: false })
  .order('frequency', { ascending: false })
  .limit(500)

const filteredWords = data || []

    .filter((item) => canMakeWord(item.word, letters))
    .sort((a, b) => {
      if (b.word.length !== a.word.length) {
        return b.word.length - a.word.length
      }

      if (b.scrabble_score !== a.scrabble_score) {
        return b.scrabble_score - a.scrabble_score
      }

      return b.frequency - a.frequency
    })
    .slice(0, 500)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Words From Letters ${letters.toUpperCase()}`,
          description: `Find words that can be made from the letters ${letters.toUpperCase()}.`,
          url: `https://wordunscramblr.net/words-from-letters/${letters}`,
        }}
      />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: 40 }}>
        <h1>Words From Letters {letters.toUpperCase()}</h1>

        <p>
          Find words that can be made using some or all of these letters:{' '}
          <strong>{letters.toUpperCase()}</strong>
        </p>

        {error && (
          <p style={{ color: 'red' }}>
            Database error: {error.message}
          </p>
        )}

        <WordList words={filteredWords} />

        <InternalLinks letters={letters} length={letters.length} />
      </main>
    </>
  )
}
import { supabase } from '@/lib/supabase'
import WordList from '@/components/WordList'
import InternalLinks from '@/components/InternalLinks'
import JsonLd from '@/components/JsonLd'
import { canMakeWord } from '@/lib/canMakeWord'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const letters = (resolvedParams.letters || '').toLowerCase()

  return {
    title: `Unscramble ${letters.toUpperCase()}`,
    description: `Find words that can be made from the letters ${letters.toUpperCase()}.`,
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params
  const letters = (resolvedParams.letters || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')

  const maxLength = letters.length

  const { data, error } = await supabase
  .from('words')
  .select('word, scrabble_score, frequency, length')
  .lte('length', maxLength)
  .limit(50000)

  const filteredWords = (data || [])
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
          name: `Unscramble ${letters.toUpperCase()}`,
          description: `Find words that can be made from the letters ${letters.toUpperCase()}.`,
          url: `https://wordunscramblr.net/unscramble/${letters}`,
        }}
      />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: 40 }}>
        <h1>Unscramble {letters.toUpperCase()}</h1>

        <p>
          Find words that can be made from these letters:{' '}
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
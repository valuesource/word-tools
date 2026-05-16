import { supabase } from '@/lib/supabase'
import WordList from '@/components/WordList'
import InternalLinks from '@/components/InternalLinks'
import JsonLd from '@/components/JsonLd'

function sortLetters(value) {
  return value.toLowerCase().split('').sort().join('')
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const letters = (resolvedParams.letters || '').toLowerCase()

  return {
    title: `Unscramble ${letters.toUpperCase()}`,
    description: `Find anagrams and words made from the letters ${letters.toUpperCase()}.`,
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params
  const letters = (resolvedParams.letters || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')

  const sortedLetters = sortLetters(letters)

  const { data, error } = await supabase
    .from('words')
    .select('word, scrabble_score, frequency, length')
    .eq('sorted', sortedLetters)
    .order('scrabble_score', { ascending: false })
    .order('frequency', { ascending: false })
    .order('word')

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Unscramble ${letters.toUpperCase()}`,
          description: `Find anagrams and words made from the letters ${letters.toUpperCase()}.`,
          url: `https://wordunscramblr.net/unscramble/${letters}`,
        }}
      />

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: 40 }}>
        <h1>Unscramble {letters.toUpperCase()}</h1>

        <p>
          Find exact anagrams made from these letters:{' '}
          <strong>{letters.toUpperCase()}</strong>
        </p>

        {error && (
          <p style={{ color: 'red' }}>
            Database error: {error.message}
          </p>
        )}

        <WordList words={data || []} />

        <InternalLinks letters={letters} length={letters.length} />
      </main>
    </>
  )
}
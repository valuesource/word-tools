import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'
import WordList from '@/components/WordList'
import InternalLinks from '@/components/InternalLinks'
import { supabase } from '@/lib/supabase'
import SeoContent from '@/components/SeoContent'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const letters = resolvedParams.letters || ''

  return {
    title: `Words with Letters ${letters.toUpperCase()}`,
    description: `Find all words containing the letters ${letters}. Great for Scrabble, Wordle, and word games.`,
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params
  const letters = (resolvedParams.letters || '').toLowerCase()
  const chars = letters.split('')

  let query = supabase.from('words').select('word')

  chars.forEach((char) => {
    query = query.ilike('word', `%${char}%`)
  })

  const { data, error } = await query
  .order('score', { ascending: false })
  .order('word')
  .limit(100)

  return (
    <>
    <JsonLd
  data={{
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Words With Letters ${letters.toUpperCase()}`,
    description: `Find words with the letters ${letters.toUpperCase()} for word games and puzzles.`,
    url: `https://wordunscramblr.net/words-with-letters/${letters}`,
  }}
/>
    <div style={{ padding: 40 }}>
      <Breadcrumbs items={[{ label: `Words With Letters ${letters.toUpperCase()}`, href: `/words-with-letters/${letters}` }]} />
      <h1>Words with Letters {letters.toUpperCase()}</h1>

      <p>Showing words that contain all letters: {letters.toUpperCase()}</p>

      {error && (
        <p style={{ color: 'red' }}>
          Database error: {error.message}
        </p>
      )}

      <WordList words={data || []} />
      <SeoContent type="letters" letters={letters} />
   <InternalLinks letters={letters} length={letters.length} />
    </div>
    </>
  )
}
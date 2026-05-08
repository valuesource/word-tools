import { wordSelect, applyBestWordOrder } from '@/lib/wordQueries'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'
import WordList from '@/components/WordList'
import InternalLinks from '@/components/InternalLinks'
import { supabase } from '@/lib/supabase'
import SeoContent from '@/components/SeoContent'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const letter = resolvedParams.letter || ''

  return {
    title: `Words Starting With ${letter.toUpperCase()}`,
    description: `Find words that start with ${letter.toUpperCase()} for Scrabble, Wordle, and word games.`,
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params
  const letter = (resolvedParams.letter || '').toLowerCase()

  const { data, error } = await supabase
    .from('words')
    .select(wordSelect())
    .eq('starts_with', letter)
    applyBestWordOrder(query).limit(500)

  return (
    <>
    <JsonLd
  data={{
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Words Starting With ${letter.toUpperCase()}`,
    description: `Find words starting with ${letter.toUpperCase()} for word games and puzzles.`,
    url: `https://wordunscramblr.net/words-starting-with/${letter}`,
  }}
/>
    <div style={{ padding: 40 }}>
      <Breadcrumbs items={[{ label: `Words Starting With ${letter.toUpperCase()}`, href: `/words-starting-with/${letter}` }]} />
      <h1>Words Starting With {letter.toUpperCase()}</h1>
      <p>Find words that begin with the letter {letter.toUpperCase()}.</p>

      {error && <p style={{ color: 'red' }}>Database error: {error.message}</p>}

      <WordList words={data || []} />
      <SeoContent type="starts" value={letter} />
      <InternalLinks letters={letter} />
    </div>
    </>
  )
}
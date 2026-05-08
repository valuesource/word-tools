import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'
import WordList from '@/components/WordList'
import InternalLinks from '@/components/InternalLinks'
import { supabase } from '@/lib/supabase'
import SeoContent from '@/components/SeoContent'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const ending = resolvedParams.ending || ''

  return {
    title: `Words Ending With ${ending.toUpperCase()}`,
    description: `Find words that end with ${ending.toUpperCase()} for Scrabble, Wordle, and word games.`,
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params
  const ending = (resolvedParams.ending || '').toLowerCase()

  const { data, error } = await supabase
    .from('words')
    .select('word, scrabble_score')
    .ilike('word', `%${ending}`)
    .order('score', { ascending: false })
.order('word')
    .limit(300)

  return (
    <>
    <JsonLd
  data={{
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Words Ending With ${ending.toUpperCase()}`,
    description: `Find words ending with ${ending.toUpperCase()} for word games and puzzles.`,
    url: `https://wordunscramblr.net/words-ending-with/${ending}`,
  }}
/>
    <div style={{ padding: 40 }}>
      <Breadcrumbs items={[{ label: `Words Ending With ${ending.toUpperCase()}`, href: `/words-ending-with/${ending}` }]} />
      <h1>Words Ending With {ending.toUpperCase()}</h1>
      <p>Find words that end with {ending.toUpperCase()}.</p>

      {error && <p style={{ color: 'red' }}>Database error: {error.message}</p>}

      <WordList words={data || []} />
      <SeoContent type="ends" value={ending} />
      <InternalLinks letters={ending} />
    </div>
    </>
  )
}
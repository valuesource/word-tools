import { wordSelect, applyBestWordOrder } from '@/lib/wordQueries'
import JsonLd from '@/components/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'
import { supabase } from '@/lib/supabase'
import InternalLinks from '@/components/InternalLinks'
import SeoContent from '@/components/SeoContent'
import WordList from '@/components/WordList'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const pattern = resolvedParams.pattern || ''

  return {
    title: `Words Containing ${pattern.toUpperCase()}`,
    description: `Find words that contain ${pattern.toUpperCase()} for Wordle, Scrabble, crossword puzzles, and word games.`,
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params
  const pattern = (resolvedParams.pattern || '').toLowerCase()

  let query = supabase
  .from('words')
  .select(wordSelect())
  .ilike('word', `%${pattern}%`)

const { data, error } = await applyBestWordOrder(query).limit(500)
  return (
    <>
    <JsonLd
  data={{
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Words Containing ${pattern.toUpperCase()}`,
    description: `Find words containing ${pattern.toUpperCase()} for word games and puzzles.`,
    url: `https://wordunscramblr.net/words-containing/${pattern}`,
  }}
/>
    <div style={{ padding: 40 }}>
      <Breadcrumbs items={[{ label: `Words Containing ${pattern.toUpperCase()}`, href: `/words-containing/${pattern}` }]} />
      <h1>Words Containing {pattern.toUpperCase()}</h1>

      <p>
        Browse words that contain the letters <strong>{pattern.toUpperCase()}</strong>.
      </p>

      {error && (
        <p style={{ color: 'red' }}>
          Database error: {error.message}
        </p>
      )}

      <WordList words={data || []} />

      <SeoContent
        type="letters"
        letters={pattern}
      />

      <InternalLinks letters={pattern} />
    </div>
    </>
  )
}
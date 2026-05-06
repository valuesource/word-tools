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
    .select('word')
    .ilike('word', `%${ending}`)
    .order('score', { ascending: false })
.order('word')
    .limit(300)

  return (
    <div style={{ padding: 40 }}>
      <h1>Words Ending With {ending.toUpperCase()}</h1>
      <p>Find words that end with {ending.toUpperCase()}.</p>

      {error && <p style={{ color: 'red' }}>Database error: {error.message}</p>}

      <WordList words={data || []} />
      <SeoContent type="ends" value={ending} />
      <InternalLinks letters={ending} />
    </div>
  )
}
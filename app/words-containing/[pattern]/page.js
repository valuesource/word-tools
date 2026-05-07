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

  const { data, error } = await supabase
    .from('words')
    .select('word')
    .ilike('word', `%${pattern}%`)
    .order('score', { ascending: false })
.order('word')
    .limit(500)

  return (
    <div style={{ padding: 40 }}>
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
  )
}
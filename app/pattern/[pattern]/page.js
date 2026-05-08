import { wordSelect, applyBestWordOrder } from '@/lib/wordQueries'
import { supabase } from '@/lib/supabase'
import WordList from '@/components/WordList'
import InternalLinks from '@/components/InternalLinks'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const pattern = resolvedParams.pattern || ''

  return {
    title: `Words Matching ${pattern.toUpperCase()}`,
    description: `Find words matching the pattern ${pattern.toUpperCase()}.`,
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params
  const pattern = (resolvedParams.pattern || '').toLowerCase()

  const sqlPattern = pattern.replace(/\*/g, '_')

  let query = supabase
  query = applyBestWordOrder(query)
    .from('words')
    .select(wordSelect())
    .like('word', sqlPattern)
    .limit(500)
    .order('scrabble_score', { ascending: false })

  const { data, error } = await query

  return (
    <main style={{ padding: 40 }}>
      <h1>Words Matching {pattern.toUpperCase()}</h1>

      <p>
        Browse words matching the pattern {pattern.toUpperCase()}.
      </p>

      {error && (
        <p style={{ color: 'red' }}>
          Database error: {error.message}
        </p>
      )}

      <WordList words={data || []} />

      <InternalLinks />
    </main>
  )
}
import { supabase } from '@/lib/supabase'
import WordList from '@/components/WordList'
import InternalLinks from '@/components/InternalLinks'
import { wordSelect, applyBestWordOrder } from '@/lib/wordQueries'

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
    .from('words')
    .select(wordSelect())
    .like('word', sqlPattern)

  const { data, error } = await applyBestWordOrder(query).limit(200)

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
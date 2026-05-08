import { supabase } from '@/lib/supabase'
import WordList from '@/components/WordList'
import InternalLinks from '@/components/InternalLinks'

export const metadata = {
  title: 'Highest Scoring Words',
  description: 'Find high scoring words for Scrabble and word games.',
}

export default async function Page() {
  const { data, error } = await supabase
    .from('words')
    .select('word, scrabble_score')
    .gte('scrabble_score', 20)
    .order('scrabble_score', { ascending: false })
    .order('word')
    .limit(500)

  return (
    <main style={{ padding: 40 }}>
      <h1>Highest Scoring Words</h1>

      <p>
        Browse high scoring words for Scrabble, Words With Friends, and other word games.
      </p>

      {error && <p style={{ color: 'red' }}>Database error: {error.message}</p>}

      <WordList words={data || []} />

      <InternalLinks />
    </main>
  )
}
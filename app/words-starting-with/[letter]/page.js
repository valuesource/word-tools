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
    .select('word')
    .eq('starts_with', letter)
    .order('score', { ascending: false })
.order('word')
    .limit(300)

  return (
    <div style={{ padding: 40 }}>
      <Breadcrumbs items={[{ label: `Words Starting With ${letter.toUpperCase()}`, href: `/words-starting-with/${letter}` }]} />
      <h1>Words Starting With {letter.toUpperCase()}</h1>
      <p>Find words that begin with the letter {letter.toUpperCase()}.</p>

      {error && <p style={{ color: 'red' }}>Database error: {error.message}</p>}

      <WordList words={data || []} />
      <SeoContent type="starts" value={letter} />
      <InternalLinks letters={letter} />
    </div>
  )
}
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import InternalLinks from '@/components/InternalLinks'
import SeoContent from '@/components/SeoContent'
import WordList from '@/components/WordList'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug || ''

  if (!slug.endsWith('-letter-words')) {
    return {
      title: 'Page Not Found',
    }
  }

  const length = slug.replace('-letter-words', '')

  return {
    title: `${length} Letter Words`,
    description: `Find ${length} letter words for Wordle, Scrabble, and word games.`,
  }
}

export default async function Page({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams.slug || ''

  if (!slug.endsWith('-letter-words')) {
    notFound()
  }

  const length = Number(slug.replace('-letter-words', ''))

  if (!length || length < 2 || length > 15) {
    notFound()
  }

  const { data, error } = await supabase
    .from('words')
    .select('word')
    .eq('length', length)
    .order('score', { ascending: false })
.order('word')
    .limit(500)

  return (
    <div style={{ padding: 40 }}>
      <h1>{length} Letter Words</h1>
      <p>Browse {length} letter words for Wordle, Scrabble, and other word games.</p>

      {error && <p style={{ color: 'red' }}>Database error: {error.message}</p>}

      <WordList words={data || []} />

      <SeoContent type="length" length={length} />

      <InternalLinks length={length} />
    </div>
  )
}
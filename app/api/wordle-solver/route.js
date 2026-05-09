import { supabase } from '@/lib/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const include = (searchParams.get('include') || '').toLowerCase()
  const exclude = (searchParams.get('exclude') || '').toLowerCase()
  const pattern = (searchParams.get('pattern') || '').toLowerCase()

  let query = supabase
    .from('words')
    .select('word, scrabble_score, frequency')
    .eq('length', 5)

    if (pattern) {
  const sqlPattern = pattern.replace(/\*/g, '_')

  query = query.like('word', sqlPattern)
    }

  include.split('').forEach((char) => {
    query = query.ilike('word', `%${char}%`)
  })

  exclude.split('').forEach((char) => {
    query = query.not('word', 'ilike', `%${char}%`)
  })

  const { data, error } = await query
    .order('frequency', { ascending: false })
    .limit(100)

  return Response.json({
    words: data || [],
    error,
  })
}
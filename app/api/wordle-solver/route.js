import { supabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)

    const include = (searchParams.get('include') || '').toLowerCase().replace(/[^a-z]/g, '')
    const exclude = (searchParams.get('exclude') || '').toLowerCase().replace(/[^a-z]/g, '')
    const pattern = (searchParams.get('pattern') || '').toLowerCase().replace(/[^a-z*]/g, '')
    const yellow = (searchParams.get('yellow') || '').toLowerCase()

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

    yellow.split(',').forEach((rule) => {
      const [letterRaw, positionRaw] = rule.split(':')
      const letter = (letterRaw || '').replace(/[^a-z]/g, '')
      const position = Number(positionRaw)

      if (!letter || !position || position < 1 || position > 5) return

      query = query.ilike('word', `%${letter}%`)

      const blockedPattern =
        '_'.repeat(position - 1) + letter + '_'.repeat(5 - position)

      query = query.not('word', 'like', blockedPattern)
    })

    const { data, error } = await query
      .order('frequency', { ascending: false })
      .order('scrabble_score', { ascending: false })
      .order('word')
      .limit(100)

    if (error) {
      return Response.json({ words: [], error: error.message }, { status: 500 })
    }

    return Response.json({ words: data || [] })
  } catch (error) {
    return Response.json(
      { words: [], error: error.message },
      { status: 500 }
    )
  }
}
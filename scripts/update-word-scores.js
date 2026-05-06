require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')
const ws = require('ws')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    realtime: {
      transport: ws,
    },
  }
)

const commonShortWords = new Set([
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her',
  'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man',
  'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let',
  'put', 'say', 'she', 'too', 'use'
])

function scoreWord(word) {
  let score = 0

  if (commonShortWords.has(word)) score += 100
  if (word.length >= 3 && word.length <= 8) score += 30
  if (/[aeiou]/.test(word)) score += 20
  if (!/[qxzj]/.test(word)) score += 10
  if (/(ing|ed|er|ly|tion)$/.test(word)) score += 15

  return score
}

async function run() {
  const pageSize = 1000
  let from = 0
  let totalUpdated = 0

  while (true) {
    const { data, error } = await supabase
      .from('words')
      .select('id, word')
      .range(from, from + pageSize - 1)

    if (error) throw error
    if (!data || data.length === 0) break

    for (const row of data) {
      const { error: updateError } = await supabase
        .from('words')
        .update({ score: scoreWord(row.word) })
        .eq('id', row.id)

      if (updateError) throw updateError
    }

    totalUpdated += data.length
    console.log(`Updated ${totalUpdated} words`)
    from += pageSize
  }

  console.log('Scoring complete!')
}

run()
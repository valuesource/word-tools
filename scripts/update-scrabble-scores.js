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

const values = {
  a: 1, b: 3, c: 3, d: 2, e: 1,
  f: 4, g: 2, h: 4, i: 1, j: 8,
  k: 5, l: 1, m: 3, n: 1, o: 1,
  p: 3, q: 10, r: 1, s: 1, t: 1,
  u: 1, v: 4, w: 4, x: 8, y: 4,
  z: 10,
}

function getScore(word) {
  return word
    .split('')
    .reduce((total, letter) => total + (values[letter] || 0), 0)
}

async function run() {
  const pageSize = 1000
  let from = 0

  while (true) {
    const { data, error } = await supabase
      .from('words')
      .select('id, word')
      .range(from, from + pageSize - 1)

    if (error) throw error
    if (!data.length) break

    for (const row of data) {
      const score = getScore(row.word)

      const { error: updateError } = await supabase
        .from('words')
        .update({ scrabble_score: score })
        .eq('id', row.id)

      if (updateError) throw updateError
    }

    console.log(`Updated ${from + data.length}`)
    from += pageSize
  }

  console.log('Done!')
}

run()
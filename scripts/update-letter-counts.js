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

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

function getCounts(word) {
  const counts = {}

  alphabet.forEach((letter) => {
    counts[`${letter}_count`] = 0
  })

  word.toLowerCase().split('').forEach((letter) => {
    if (alphabet.includes(letter)) {
      counts[`${letter}_count`] += 1
    }
  })

  return counts
}

async function run() {
  const pageSize = 1000
  let from = 0
  let totalUpdated = 0

  while (true) {
    const { data, error } = await supabase
      .from('words')
      .select('id, word')
      .order('id', { ascending: true })
      .range(from, from + pageSize - 1)

    if (error) throw error
    if (!data || data.length === 0) break

    for (const row of data) {
      const counts = getCounts(row.word)

      const { error: updateError } = await supabase
        .from('words')
        .update(counts)
        .eq('id', row.id)

      if (updateError) throw updateError
    }

    totalUpdated += data.length
    console.log(`Updated ${totalUpdated}`)
    from += pageSize
  }

  console.log('Letter counts complete!')
}

run().catch((error) => {
  console.error('Script failed:')
  console.error(JSON.stringify(error, null, 2))
  process.exit(1)
})
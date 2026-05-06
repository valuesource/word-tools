require('dotenv').config({ path: '.env.local' })

const words = require('an-array-of-english-words')
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

function sortLetters(word) {
  return word.split('').sort().join('')
}

const cleanWords = [...new Set(
  words
    .map((w) => w.toLowerCase().trim())
    .filter((w) => /^[a-z]+$/.test(w))
    .filter((w) => w.length >= 2 && w.length <= 15)
)]

async function importWords() {
  console.log(`Preparing to import ${cleanWords.length} words...`)

  for (let i = 0; i < cleanWords.length; i += 1000) {
    const batch = cleanWords.slice(i, i + 1000).map((word) => ({
      word,
      length: word.length,
      sorted: sortLetters(word),
      starts_with: word[0],
      ends_with: word[word.length - 1],
    }))

    const { error } = await supabase.from('words').insert(batch)

    if (error) {
      console.error('Import error:', error)
      process.exit(1)
    }

    console.log(`Imported ${Math.min(i + 1000, cleanWords.length)} / ${cleanWords.length}`)
  }

  console.log('Import complete!')
}

importWords()
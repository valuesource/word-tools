const fs = require('fs')
const words = require('an-array-of-english-words')

function cleanWord(word) {
  return word.toLowerCase().trim()
}

function sortLetters(word) {
  return word.split('').sort().join('')
}

const rows = [
  'word,length,sorted,starts_with,ends_with'
]

const seen = new Set()

words.forEach((rawWord) => {
  const word = cleanWord(rawWord)

  // Keep simple alphabetic words only
  if (!/^[a-z]+$/.test(word)) return

  // Keep useful word-game lengths
  if (word.length < 2 || word.length > 15) return

  if (seen.has(word)) return
  seen.add(word)

  rows.push([
    word,
    word.length,
    sortLetters(word),
    word[0],
    word[word.length - 1],
  ].join(','))
})

fs.writeFileSync('data/words.csv', rows.join('\n'))

console.log(`Created data/words.csv with ${rows.length - 1} words`)
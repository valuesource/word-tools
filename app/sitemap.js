export default async function sitemap() {
  const baseUrl = 'https://wordunscramblr.net'

  const urls = ['']

  for (let i = 2; i <= 15; i++) {
    urls.push(`/${i}-letter-words`)
  }

  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

  letters.forEach((letter) => {
    urls.push('/word-lists')
    urls.push('/wordle-solver')
    urls.push('/best-wordle-starting-words')
    urls.push(`/words-containing/${letter}`)
    urls.push(`/words-starting-with/${letter}`)
    urls.push(`/words-ending-with/${letter}`)
    urls.push('/highest-scoring-words')
    urls.push('/scrabble-word-finder')
    urls.push('/wordle-helper')
    urls.push('/guides')
  })

  const commonCombos = [
    'aert', 'alert', 'alter', 'react', 'trace', 'crate',
    'stone', 'tones', 'notes', 'rates', 'tears', 'stare',
    'listen', 'silent', 'earth', 'heart', 'thing', 'night',
    'right', 'train', 'brain', 'plane', 'words', 'games',
    'solve', 'puzzle'
  ]

  commonCombos.forEach((combo) => {
    urls.push(`/words-with-letters/${combo}`)
  })

  // Generate 676 two-letter pattern pages: aa through zz
  letters.forEach((first) => {
    letters.forEach((second) => {
      urls.push(`/words-containing/${first}${second}`)
    })
  })

  // Add high-value common longer patterns
  const commonPatterns = [
    'ing', 'tion', 'er', 'ed', 'ly', 'qu', 'th', 'sh',
    'ch', 'ph', 'ck', 'oo', 'ee', 'ai', 'ou', 'ea',
    'ar', 'or', 'st', 'tr', 'pr', 'br', 'cr', 'gr'
  ]

  commonPatterns.forEach((pattern) => {
    urls.push(`/words-containing/${pattern}`)
  })

  return urls.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }))
}
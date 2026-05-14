export function canMakeWord(word, letters) {
  const pool = letters.split('')

  for (const char of word) {
    const index = pool.indexOf(char)

    if (index === -1) {
      return false
    }

    pool.splice(index, 1)
  }

  return true
}
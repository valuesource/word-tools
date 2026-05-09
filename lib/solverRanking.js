export function getUniqueLetterScore(word) {
  return new Set(word.split('')).size
}

export function getGuessQuality(word) {
  const uniqueScore = getUniqueLetterScore(word)

  const vowels = word.match(/[aeiou]/g) || []

  if (uniqueScore === 5 && vowels.length >= 2) {
    return 'Excellent Guess'
  }

  if (uniqueScore >= 4) {
    return 'Strong Guess'
  }

  if (vowels.length >= 3) {
    return 'Vowel Heavy'
  }

  return 'Standard Guess'
}
export function wordSelect() {
  return 'word, scrabble_score, frequency'
}

export function applyBestWordOrder(query) {
  return query
    .order('frequency', { ascending: false })
    .order('scrabble_score', { ascending: false })
    .order('word')
}
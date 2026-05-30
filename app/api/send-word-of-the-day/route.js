import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date - start
  const oneDay = 1000 * 60 * 60 * 24

  return Math.floor(diff / oneDay)
}

function buildEmailHtml(word, subscriber) {
  const unsubscribeUrl =
    `https://wordunscramblr.net/unsubscribe/${subscriber.unsubscribe_token}`

  return `

    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h1>Word Of The Day: ${word.word.toUpperCase()}</h1>

      <p><strong>Pronunciation:</strong> ${word.pronunciation || 'Coming soon'}</p>

      <p><strong>Definition:</strong> ${word.definition}</p>

      <p><strong>Etymology:</strong> ${word.etymology || 'Coming soon'}</p>

      <p><strong>Scrabble Value:</strong> ${word.scrabble_score || 0} points</p>

      <p><strong>Wordle Suitability:</strong> ${word.wordle_suitability || 'Not rated yet.'}</p>

      ${word.notes ? `<p><strong>Notes:</strong> ${word.notes}</p>` : ''}

      <p>
        View more word tools:
        <a href="https://wordunscramblr.net/word-of-the-day">Word Of The Day</a>
      </p>
            <p style="font-size:12px;color:#666;margin-top:30px;">
        You are receiving this because you subscribed to WordUnscramblr Word Of The Day.
        <br />
        <a href="${unsubscribeUrl}">Unsubscribe</a>
      </p>
    </div>
  `
}

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`

  if (authHeader !== expected) {
return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: words, error: wordsError } = await supabaseAdmin
    .from('daily_words')
    .select('*')
    .order('id')

  if (wordsError || !words || words.length === 0) {
    return Response.json({ error: 'No daily words found' }, { status: 500 })
  }

  const index = getDayOfYear() % words.length
  const word = words[index]

const { data: subscribers, error: subscribersError } = await supabaseAdmin
  .from('word_of_day_subscribers')
  .select('email, unsubscribe_token')
  .is('unsubscribed_at', null)
  
  if (subscribersError) {
    return Response.json({ error: subscribersError.message }, { status: 500 })
  }

  const emails = subscribers || []

  for (const subscriber of emails) {
    await resend.emails.send({
      from: 'WordUnscramblr <word@wordunscramblr.net>',
      to: subscriber.email,
      subject: `Word Of The Day: ${word.word.toUpperCase()}`,
     html: buildEmailHtml(word, subscriber),
    })
  }

  return Response.json({
    sent: emails.length,
    word: word.word,
  })
  }
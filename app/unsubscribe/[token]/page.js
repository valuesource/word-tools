import { supabaseAdmin } from '@/lib/supabaseAdmin'
import Link from 'next/link'

export default async function UnsubscribePage({ params }) {
  const resolvedParams = await params
  const token = resolvedParams.token

  const { error } = await supabaseAdmin
    .from('word_of_day_subscribers')
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq('unsubscribe_token', token)

  return (
    <main className="page">
      <section className="card">
        <h1>
          {error ? 'Unsubscribe Error' : 'You have been unsubscribed'}
        </h1>

        <p>
          {error
            ? 'We could not process your unsubscribe request.'
            : 'You will no longer receive Word Of The Day emails.'}
        </p>

        <Link href="/">Return to WordUnscramblr</Link>
      </section>
    </main>
  )
}
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request) {
  const formData = await request.formData()
  const email = String(formData.get('email') || '').toLowerCase().trim()

  if (!email || !email.includes('@')) {
    return Response.redirect(
      'https://wordunscramblr.net/word-of-the-day?error=invalid',
      303
    )
  }

  const { error } = await supabaseAdmin
    .from('word_of_day_subscribers')
    .upsert({ email }, { onConflict: 'email' })

  if (error) {
    return Response.redirect(
      'https://wordunscramblr.net/word-of-the-day?error=signup',
      303
    )
  }

  return Response.redirect(
    'https://wordunscramblr.net/word-of-the-day?subscribed=true',
    303
  )
}
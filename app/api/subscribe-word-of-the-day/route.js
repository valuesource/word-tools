import { supabase } from '@/lib/supabase'

export async function POST(request) {
  const formData = await request.formData()
  const email = String(formData.get('email') || '').toLowerCase().trim()

  if (!email || !email.includes('@')) {
    return Response.redirect('https://wordunscramblr.net/word-of-the-day?error=invalid', 303)
  }

  await supabase
    .from('word_of_day_subscribers')
    .upsert({ email }, { onConflict: 'email' })

  return Response.redirect('https://wordunscramblr.net/word-of-the-day?subscribed=true', 303)
}
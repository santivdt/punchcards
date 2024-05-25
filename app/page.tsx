import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const Index = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return redirect('/u/dashboard')
}

export default Index

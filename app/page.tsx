import { redirect } from 'next/navigation'

const Index = async () => {
  return redirect('/u/dashboard')
}

export default Index

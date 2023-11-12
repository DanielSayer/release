import Dashboard from '@/components/Dashboard'
import { db } from '@/db'
import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'

const Page = async () => {
  const { user } = await useAuth('dashboard')

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })

  if (!dbUser) {
    redirect('/auth-callback?orgin=dashboard')
  }

  return <Dashboard />
}

export default Page

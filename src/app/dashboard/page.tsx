import Dashboard from '@/components/Dashboard'
import { db } from '@/db'
import useAuth from '@/hooks/useAuth'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import { redirect } from 'next/navigation'

const Page = async () => {
  const { user } = await useAuth('dashboard')
  const subscriptionPlan = await getUserSubscriptionPlan()

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  })

  if (!dbUser) {
    redirect('/auth-callback?orgin=dashboard')
  }

  return <Dashboard subscriptionPlan={subscriptionPlan} />
}

export default Page

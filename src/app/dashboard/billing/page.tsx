import BillingForm from '@/components/BillingForm'
import Dictaphone from '@/components/Dictaphone'
import { getUserSubscriptionPlan } from '@/lib/stripe'

const Page = async () => {
  const supscriptionPlan = await getUserSubscriptionPlan()
  return <BillingForm subscriptionPlan={supscriptionPlan} />
}
export default Page

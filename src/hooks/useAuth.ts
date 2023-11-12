import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

const useAuth = async (redirectLocation: string) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) {
    redirect(`/auth-callback?origin=${redirectLocation}`)
  }

  return { user }
}

export default useAuth

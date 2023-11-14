import { db } from '@/db'
import { sendMessageValidator } from '@/lib/validators/sendMessageValidator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || !user.id) {
    return new Response('Unauthorized', { status: 401 })
  }
  const { fileId, message } = sendMessageValidator.parse(body)

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  })

  if (!file) {
    return new Response('Not found', { status: 404 })
  }

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId: user.id,
      fileId,
    },
  })
}

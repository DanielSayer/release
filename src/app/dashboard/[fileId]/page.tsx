import { db } from '@/db'
import useAuth from '@/hooks/useAuth'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

interface PageProps {
  params: {
    fileId: string
  }
}
const Page: React.FC<PageProps> = async ({ params }) => {
  const { fileId } = params
  const { user } = await useAuth(`dashboard/${fileId}`)

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: user.id,
    },
  })

  if (!file) {
    notFound()
  }

  return <div>{params.fileId}</div>
}

export default Page

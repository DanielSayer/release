import ChatWrapper from '@/components/ChatWrapper'
import PdfRenderer from '@/components/PdfRenderer'
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

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh - 3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* SECTION NOTES VIEWER */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/**TABS  */}
            <PdfRenderer />
          </div>
        </div>

        <div className="shrik-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-top-0">
          <ChatWrapper />
        </div>
      </div>
    </div>
  )
}

export default Page

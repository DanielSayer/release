'use client'

import { trpc } from '@/app/_trpc/client'
import { Ghost } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import CreateNotesButton from './CreateNotesButton'
import NotesCard from './NotesCard'
import { useState } from 'react'

const Dashboard = () => {
  const utils = trpc.useUtils()
  const { data: files, isLoading } = trpc.getUserFiles.useQuery()
  const [deletingFileId, setDeletingFileId] = useState<string>('')

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate()
    },
    onMutate: ({ id }) => {
      setDeletingFileId(id)
    },
    onSettled: () => {
      setDeletingFileId('')
    },
  })

  return (
    <main className="mx-auto max-w-7xl sm:p-10">
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-5 mx-2 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My Notes</h1>
        <CreateNotesButton />
      </div>

      {files && files.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 mx-2 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <NotesCard
                  id={file.id}
                  name={file.name}
                  createdAt={file.createdAt}
                  isDeleting={deletingFileId === file.id}
                  handleDelete={() => {
                    deleteFile({ id: file.id })
                  }}
                />
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-zinc-800" />
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s create your first note</p>
        </div>
      )}
    </main>
  )
}
export default Dashboard

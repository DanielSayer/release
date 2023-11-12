'use client'

import { format } from 'date-fns'
import { Loader2, MessageSquare, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import DeleteButton from './DeleteButton'

interface NotesCardProps {
  id: string
  name: string
  createdAt: string
  isDeleting: boolean
  handleDelete: () => void
}

const NotesCard: React.FC<NotesCardProps> = ({
  id,
  name,
  createdAt,
  isDeleting,
  handleDelete,
}) => {
  return (
    <>
      <Link href={`/dashboard/${id}`} className="flex flex-col gap-2">
        <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-violet-300 to-violet-500" />
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-lg font-medium text-zinc-900">
                {name}
              </h3>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {format(new Date(createdAt), 'MMM yyyy')}
        </div>
        <div className=" flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />0
        </div>
        <DeleteButton
          fileName={name}
          isDeleting={isDeleting}
          handleDelete={() => handleDelete()}
        />
      </div>
    </>
  )
}

export default NotesCard

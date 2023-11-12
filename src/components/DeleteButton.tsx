'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Loader2, Trash } from 'lucide-react'

interface DeleteButtonProps {
  fileName: string
  isDeleting: boolean
  handleDelete: () => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  fileName,
  isDeleting,
  handleDelete,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v)
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button size="sm" className="w-full" variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <h1 className="max-w-4xl text-md font-bold">
          Are you sure you want to delete{' '}
          <span className="text-violet-600">{fileName}</span>?
        </h1>
        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full"
          >
            No! Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="w-full"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <p className="me-2">Delete</p>
                <Trash className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteButton

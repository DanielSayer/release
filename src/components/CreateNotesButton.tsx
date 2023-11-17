'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import UploadDropzone from './UploadDropzone'
import RecordNotes from './RecordNotes'

interface CreateNotesProps {
  isSubscribed: boolean
}

const CreateNotesButton = ({ isSubscribed }: CreateNotesProps) => {
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
        <Button>Create Notes</Button>
      </DialogTrigger>

      <DialogContent>
        <RecordNotes />
        <UploadDropzone isSubscribed={isSubscribed} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateNotesButton

import { Mic } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useSpeechRecognition } from 'react-speech-recognition'

const RecordNotes = () => {
  const { browserSupportsSpeechRecognition } = useSpeechRecognition()

  return (
    <Link
      href="/record"
      className="border h-64 m-4 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
    >
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col items-center justify-center py-6 px-10 text-center">
          <Mic className="h-6 w-6 text-zinc-500 mb-2" />
          <p className="mb-2 text-sm text-zinc-700 font-semibold">
            Record Notes
          </p>
          {!browserSupportsSpeechRecognition ? (
            <p className="text-xs text-red-500">
              Unfortunately your browser does not support recording, please try
              a different browser
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  )
}
export default RecordNotes

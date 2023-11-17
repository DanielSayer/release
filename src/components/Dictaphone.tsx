'use client'

import React, { useState } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

const Dictaphone = () => {
  const [isListening, setIsListening] = useState<boolean>(false)
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  const startListening = () => {
    setIsListening(true)
    SpeechRecognition.startListening({ continuous: true })
  }

  const stopListening = () => {
    setIsListening(false)
    SpeechRecognition.stopListening()
  }

  return (
    <div className="border h-64 m-4 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"></div>
  )
}
export default Dictaphone

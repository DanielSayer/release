'use client'

import React, { useState } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

const Dictaphone = () => {
  const [isListening, setIsListening] = useState<boolean>(false)
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  const startListening = () => {
    setIsListening(true)
    SpeechRecognition.startListening({ continuous: true })
  }

  const stopListening = () => {
    setIsListening(false)
    SpeechRecognition.stopListening()
  }

  return (
    <div>
      <p>Microphone: {isListening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <p>{transcript}</p>
    </div>
  )
}
export default Dictaphone

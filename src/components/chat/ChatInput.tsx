import React, { useContext, useRef } from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Send } from 'lucide-react'
import { ChatContext } from './ChatContext'

interface ChatInputProps {
  isDisabled?: boolean
}
const ChatInput: React.FC<ChatInputProps> = ({ isDisabled }) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow pt-4">
            <div className="flex items-center">
              <Textarea
                ref={textAreaRef}
                rows={1}
                maxRows={4}
                placeholder="Enter your question..."
                autoFocus
                className="resize-none me-2 text-base pt-3scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                onChange={handleInputChange}
                value={message}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    addMessage()
                    textAreaRef.current?.focus()
                  }
                }}
              />
              <Button
                aria-label="send message"
                disabled={isLoading || isDisabled}
                onClick={() => {
                  addMessage()
                  textAreaRef.current?.focus()
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput

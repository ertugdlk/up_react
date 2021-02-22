import React, { useEffect, useRef, useState } from 'react'
import sendIcon from './send.svg'
import '../css/ChatScroll.css'

function ChatScroll({
  handleSendMessage,
  messages = [],
  handleKeyDown,
  nickname = '',
}) {
  const messageEl = useRef(null)
  const [message, setMessage] = useState('')
  const [massagesToShow, setMassagesToShow] = useState([])
  let chatRef = useRef('')

  const controlMessageFloow = (e, message) => {
    handleSendMessage(e, message)
    chatRef.current.value = ''
  }

  const controlEnterKey = (e, message) => {
    if (e.key === 'Enter' || e.code === 'Enter' || e.which === 13) {
      handleKeyDown(e, message)
      chatRef.current.value = ''
    }
  }

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' })
      })
    }
  }, [])

  useEffect(() => {
    setMassagesToShow(messages)
  }, [messages])

  const chatMessages = (message, i) => {
    return (
      <div
        key={i}
        className={`msg${message.nickname === nickname ? ' dark' : ''}`}
      >
        {message.nickname}:{message.msg}
      </div>
    )
  }

  return (
    <div className='App'>
      <div className='chat'>
        <div className='messages' ref={messageEl}>
          {massagesToShow.map((message, i) => chatMessages(message, i))}
        </div>
        <div className='footer-chat'>
          <input
            type='text'
            placeholder='Type here...'
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => controlEnterKey(e, message)}
            ref={chatRef}
          />
          <button
            className='chat-bot-send'
            onClick={(e) => controlMessageFloow(e, message)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatScroll

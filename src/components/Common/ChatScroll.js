import React, { useEffect, useRef, useState } from 'react'
import sendIcon from './send.svg'
import '../css/ChatScroll.css'

const generateMessage = () => {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  const text = []
  let x = 7
  while (--x) text.push(words[Math.floor(Math.random() * words.length)])
  return text.join(' ')
}

function ChatScroll({ handleSendMessage, setMessages, messages }) {
  const messageEl = useRef(null)
  const [message, setMessage] = useState('')
  const [massagesToShow, setMassagesToShow] = useState([])

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

  //   useEffect(() => {
  //     console.log('ChatScroll - messages:', messages)
  //     // const generateDummyMessage = () => {
  //     //   setInterval(() => {
  //     //     setMessages((prevMsg) => [...prevMsg, message])
  //     //   }, 20000)
  //     // }
  //     // generateDummyMessage()
  //   }, [messages])

  return (
    <div className='App'>
      <div className='chat'>
        <div className='head'>ChatBot</div>
        <div className='messages' ref={messageEl}>
          {massagesToShow.map((message, i) =>
            i % 2 !== 0 ? null : (
              <div key={i} className={`msg${i % 2 !== 0 ? ' dark' : ''}`}>
                {message.nickname}: {message.msg}
              </div>
            )
          )}
        </div>
        <div className='footer-chat'>
          <input
            type='text'
            placeholder='Type here...'
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={(e) => handleSendMessage(e, message)}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default ChatScroll

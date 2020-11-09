import React , {useEffect} from 'react'
const socketio = require('socket.io-client') 
const socket = socketio('http://localhost:5000/', {transports: ['websocket']})

function ChatBox() {

    useEffect(() => {
        socket.emit("join" , "hosgeldin")
    }, [])    

    return(
        <>
        </>
    )
}

export default ChatBox
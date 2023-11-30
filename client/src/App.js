import { useState, useEffect } from 'react'

import './App.css';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')

function App() {
	const [message,setMessage] = useState()
	const sendMessage = ()=>{
		socket.emit('send_message_event',{
			name:"Taufeeq",
			age:"21",
			message:message
		})
	}

	useEffect(()=>{
		socket.on('received_message_event',(data)=>{
			alert(data.message)
		})
	},[socket])

	return (
		<div className="App">
			<input 
				type='text' 
				placeholder='Message ...'
				value={message}
				onChange={(e)=>setMessage(e.target.value)}
			/>
			<button 
				onClick={sendMessage}
			>
				Send !
			</button>
		</div>
	);
}

export default App;

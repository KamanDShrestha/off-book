// import React, { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
// import { BASE_URL } from '../constants';
// import getFromLocalStorage from '../helpers/getFromLocalStorage';
// const Chat = ({ socket }) => {
//   // making the state for storing messages
//   // in useEffect, using let socket = io()
//   const userInfo = getFromLocalStorage('userInfo');
//   //   const [messages, setMessages] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('Socket connected:', socket.connected); // Should be true
//       socket.emit('joining message', userInfo.firstName);

//       socket.on('chat message', (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });
//     });
//     return () => {
//       socket.emit('leaving message');
//     };
//   }, []);

//   function handleSend() {
//     console.log(inputRef.current.value);
//     if (inputRef.current.value) {
//       socket.current.emit('chat message', inputRef.current.value);
//       inputRef.current.value = '';
//     }
//   }
//   return (
//     <div>
//       <div>
//         {messages.map((message, index) => (
//           <p key={index}>{message}</p>
//         ))}
//       </div>
//       <input ref={inputRef} name='chat' />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   );
// };

// export default Chat;
import React from 'react';

const Chat = () => {
  return <div>Chat</div>;
};

export default Chat;

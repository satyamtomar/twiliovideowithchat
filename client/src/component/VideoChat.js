import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import './convo/Video.css'
import ConversationsApp from './ConversationApp';
const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
const [convoId,setConvoId]=useState('');
  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);
  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    const data = await fetch('http://localhost:5001/getToken', {
      method: 'POST',
      body: JSON.stringify({
        identity: username,
        roomName: roomName,
        // convoId:localStorage.getItem('convoId')==='undefined'?'':localStorage.getItem('convoId'),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    console.log(data,'data')
    setToken(data.data.token);
    setConvoId(data.data.convoId);
    // localStorage.setItem("convoId",data.data.convoId);
  }, [username, roomName]);

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <div className="row">  
      <div className='col-lg-8'> 
        <Room roomName={roomName} token={token} handleLogout={handleLogout} />
           </div>
           <div className='col-lg-4'>
               <ConversationsApp token={token} name={username} room={roomName} />
               </div>  
      </div>
    );
  } else {
    render = (
      <Lobby
         username={username}
         roomName={roomName}
         handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat
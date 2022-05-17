import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';
const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

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
        roomName: roomName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    setToken(data.data);
  }, [username, roomName]);

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <div>  
              <Room roomName={roomName} token={token} handleLogout={handleLogout} />

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
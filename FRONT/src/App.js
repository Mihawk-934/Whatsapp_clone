import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';
import './App.css';

const App = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then(res => {
      setMessages(res.data);
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('a157d59b0581ff66c741', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessages) => {
      setMessages([...messages, newMessages]);
    });

    return (() => {
        channel.unbind_all();
        channel.unsubscribe();
      }
    )
  }, [messages])

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;

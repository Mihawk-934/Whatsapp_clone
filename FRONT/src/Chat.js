import React, { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon } from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic";
import axios from './axios';
import './Chat.css';

const Chat = ({ messages }) => {

    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: "Michael",
            received: true
        })

        setInput('');
    }
    
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://www.ensemblepourlesanimaux.org/wp-content/uploads/2018/03/2018-03-21_1816.png"/>
                <div className="chat__headerInfo">
                    <h3>Bastien</h3>
                    <p>Last seen at 12:15 23/11/20</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {
                    messages.map((message, i) => (
                        <p key={i} className={`chat__message ${message.received && "chat__receiver"}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            {/* <span className="chat__timestamp">{message.timestamp}</span> */}
                        </p>
                    ))
                }
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;

import React from 'react';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShLEi7bk-dEHPuJKMUUaCFEqSN2CsYnbF_2A&usqp=CAU"/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search ..." type="text"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat
                    name="Hicham"
                    image="https://img.bfmtv.com/i/0/0/752/1fd380182e2107d58f5502afb1463.jpeg"
                    message="See you tomorow in 42."/>
                <SidebarChat
                    name="Jules"
                    image="https://media.lesechos.com/api/v1/images/view/5c6addf28fe56f5e833491e6/1280x720/0301721472526-web.jpg"
                    message="You're back is good ?"/>
                <SidebarChat
                    name="Mehdi"
                    image="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg):focal(1105x437:1107x435)/origin-imgresizer.eurosport.com/2020/09/08/2882838-59364768-2560-1440.jpg"
                    message="I'm finish Netflix project."/>
            </div>
        </div>
    )
}

export default Sidebar;

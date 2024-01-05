import React, { useState,useEffect } from 'react'
import axios from "axios"
const ChatPage = () => {
   const [chats, setchats] = useState([])
     const fetchData= async ()=>{
        const {data} = await axios.get("/api/chats");
        setchats(data);
     }

     useEffect(()=>{
        fetchData();
     },[])

  return   <div>
        {chats.map((chat)=>{
        <div key={chat._id}> {chat.chatName}</div>
        })}
    </div>
  
}

export default ChatPage
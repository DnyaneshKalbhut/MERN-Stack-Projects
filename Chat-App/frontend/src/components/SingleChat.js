import React from 'react'
import { ChatState } from '../context/ChatProvider'

const SingleChat = ({fetchagain ,setFetchAgain}) => {

    const {user,selectedChat,setselectedChat}=ChatState();
  return (
    <>SingleChat</>
  )
}

export default SingleChat
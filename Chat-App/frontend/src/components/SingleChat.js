import React from 'react'
import { ChatState } from '../context/ChatProvider'
import {Box, IconButton, Text} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons';
const SingleChat = ({fetchagain ,setFetchAgain}) => {

    const {user,selectedChat,setselectedChat}=ChatState();
  return (
   <>   
   { selectedChat?(

      <>
      <Text
      fontSize={{ base: "28px", md: "30px" }}
      pb={3}
      px={2}
      w="100%"
      fontFamily="Work sans"
      display="flex"
      justifyContent={{ base: "space-between" }}
      alignItems="center"
      >
          <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setselectedChat("")}
            />
      </Text>
      </>
    ):(
      <Box display={'flex'} alignItems={"center"} justifyContent={"center"} h={"100%"}>
        <Text fontSize={"4xl"} pb={3} fontFamily={"sans-serif"} ></Text>
        Click on a user to start chatting
      </Box>
    )
}
    </>

  )
}

export default SingleChat
import React from "react";
import { ChatState } from "../context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellenous/ProfileModal";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setselectedChat } = ChatState();
  console.log("SelectedChat-->", selectedChat)
  return (
    <>
      {selectedChat ? (
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
            {!selectedChat?.isGroupChat ? (
              <>
                {selectedChat &&  getSender(user, selectedChat?.users)}
                {/* <ProfileModal user={getSenderFull(user, selectedChat?.user)} /> */}
              </>
            ) : (
              <>
                {selectedChat?.chatName.toUpperCase()}
                {/* <UpdateGroupChatModal 
               fetchAgain={fetchAgain}
               setFetchAgain={setFetchAgain}
              /> */}
              </>
            )}
          </Text>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"4xl"} pb={3} fontFamily={"sans-serif"}></Text>
          Click on a user to start chatting
        </Box>
      )}
    </>
  );
};

export default SingleChat;

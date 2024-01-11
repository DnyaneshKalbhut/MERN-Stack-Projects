import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'

const GroupChatModal = ({children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName ,setgroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search,setSearch] = useState("")
    const [searchResult,setSearchResult] = useState("")
    const [loading,setLoading]=useState(false)

    const toast = useToast();
      
    const {user,chats,setChats} = ChatState()

    const handleGroup = (userToAdd)=>{
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title:"User already added",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top"
      })
      return;
    }
setSelectedUsers([...selectedUsers,userToAdd]);
    }


  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      if (Array.isArray(data)) {
        setSearchResult(data);
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setSearchResult([])
    }
  };
    const handleDelete =(delUser)=>{
      setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id ))
    }
    const handleSubmit = ()=>{}
  return ( 
    <>
    <span onClick={onOpen}>{children}</span>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
        fontSize={"25px"}
        fontFamily={"sans-serif"}
        display={'flex'}
        justifyContent={"center"}
        >Create Group Chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} flexDir={"column"} alignItems={"center"}>
        <FormControl>
          <Input placeholder='Chat Name' mb={3}
          onChange={(e)=>setgroupChatName(e.target.value)}
          />
         </FormControl>
         <FormControl>
          <Input placeholder='Add Users eg: max, pain' mb={1}
          onChange={(e)=>handleSearch(e.target.value)}
          />
         </FormControl>

        <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
        {selectedUsers.map((u)=>{
            <UserBadgeItem 
            key={u._id}
            user={u}
            handleFunction={()=>handleDelete(u)}
            />
        })}
        </Box>
        {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              Array.isArray(searchResult) && (
                <Stack spacing={2}>
                  {searchResult.slice(0, 4).map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleGroup(user)}
                    />
                  ))}
                </Stack>
              )
            )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue'  onClick={handleSubmit}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default GroupChatModal
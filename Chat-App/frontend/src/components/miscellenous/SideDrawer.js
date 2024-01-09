import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Box, Tooltip,Text, Button, Menu, MenuButton, MenuList, MenuItem, Avatar, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerHeader, DrawerContent, DrawerBody, Input,  useToast } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModel from './ProfileModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
const SideDrawer = () => {

    const [search, setSearch] = useState("")
    const [searchResult,setSearchResult]=useState([])
    const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
     const {isOpen,onOpen,onClose} =useDisclosure();  
   const history = useHistory(); 
  const {user}=ChatState();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };
  
  const toast = useToast()
  const handleSearch =async ()=>{
    if (!search) {
     toast({
     title:"Please Enter Something in search",
     status:"warning",
     duration:5000,
     isClosable:true,
     position:"top-left"
     })  ;
     return;    
    }

    try {
        setLoading=(true);
        const config={
            headers:{
                Authorization:`Bearer ${user.token}`,
            }
        }
        const {data} =await axios.get(`/api/user?search=${search}`,config)

        setLoading=(false);
        setSearchResult(data);
    } catch (error) {
        toast({
            title:"Error Occured",
            description:"Failed to Load the search Results",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom-left"
        });
        return;
    }

  }

  const accesChat=(userId)=>{

  }
  return (
    
    <>
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} bg={'white'} w={"100%"}
    p={"5px 10px 5px 10px"}>
        <Tooltip label="Search Users to chat " hasArrow placement='bottom-end'>
         <Button variant={"ghost"} onClick={onOpen}>
         <i className="fas fa-search"></i>
          <Text display={{base:"none", md :'flex' }} px={"4"}>
            Search User
            </Text>   
            </Button>
        </Tooltip>
       <Text fontSize={"2xl"} fontFamily={"sans-serif"}>
        Snappy
       </Text>

        <div>
            <Menu>
                <MenuButton p={1}>
                <BellIcon fontSize={"2xl"} m={1}/>
                </MenuButton>
                {/* {/<MenuList pl={2}>
                <MenuItem>

                    </MenuItem>
                </MenuList> */}
                 <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                 <Avatar size={"sm"} cursor={"pointer"} name={user.name} src={user.pic}/>
                </MenuButton>
                <MenuList>
                    <ProfileModel user={user}>
                    <MenuItem>My Profile</MenuItem>
                    </ProfileModel>
                    <MenuDivider/>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu> 
        </div>
    </Box>
    
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerHeader placement="left">Search Users</DrawerHeader>
        <DrawerBody>
            <Box display={"flex"} pb={2} >
             <Input 
             placeholder='Search by name or email'
             mr={2}
             value={search}
             onChange={(e)=>setSearch(e.target.value)}
             />
             <Button
             onClick={handleSearch}
             >Go</Button>
            </Box>
            {loading ? (
                <ChatLoading/>
            ):(
                searchResult?.map(user=>{
                   <UserListItem 
                   key=
                   {user._id}
                   user={user}
                   handleFunction={()=>accesChat(user._id)}
                   />  
                })
            )}
        </DrawerBody>
        </DrawerContent>

   </Drawer>
    </>
  )
}

export default SideDrawer
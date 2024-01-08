import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Box, Tooltip,Text, Button, Menu, MenuButton, MenuList, MenuItem, Avatar, MenuDivider } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ProfileModel from './ProfileModel';
const SideDrawer = () => {

    const [search, setSearch] = useState("")
    const [searchResult,setSearchResult]=useState([])
    const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {user}=ChatState();

  return (
    <>
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} bg={'white'} w={"100%"}
    p={"5px 10px 5px 10px"}>
        <Tooltip label="Search Users to chat " hasArrow placement='bottom-end'>
         <Button variant={"ghost"}>
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
                 <MenuButton as={Button} rightIcon={<ChevronRightIcon/>}>
                 <Avatar size={"sm"} cursor={"pointer"} name={user.name} src={user.pic}/>
                </MenuButton>
                <MenuList>
                    <ProfileModel user={user}>
                    <MenuItem>My Profile</MenuItem>
                    </ProfileModel>
                    <MenuDivider/>
                    <MenuItem>Logout</MenuItem>
                </MenuList>
            </Menu> 
        </div>
    </Box>
    </>
  )
}

export default SideDrawer
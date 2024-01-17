import React, { useEffect } from "react";
import {
  Box,
  Text,
  Container,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Homepage() {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"#00000076"}
        textTransform={"uppercase"}
        w={"100%"}
        m={"48px 0 15px 0"}
        borderRadius={"1g"}
        borderWidth={"1px"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Text fontSize={"4xl"} color={"#131324"} fontFamily={"Josefin Sans"}>
          Snappy-Tive
        </Text>
      </Box>
      <Box
        bg={"#00000076"}
        w={"100%"}
        borderRadius={"1g"}
        borderWidth={"1px"}
        p={4}
        color={"white"}
      >
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width={"50%"} color={"white"}>
              Login
            </Tab>
            <Tab width={"50%"} color={"white"}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{<Login />}</TabPanel>
            <TabPanel>{<Signup />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;

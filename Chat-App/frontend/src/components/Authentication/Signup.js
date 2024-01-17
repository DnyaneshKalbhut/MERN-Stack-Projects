import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router";
import axios from "axios";

const Signup = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picloading, setpicloading] = useState(false);
  const [confirmpassword, setConfirmpassword] = useState();
  const toast = useToast();

  const submitHandler = async () => {
    setpicloading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicloading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setpicloading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setpicloading(false);
    }
  };

  const handleClick = () => setShow(!show);

const postDetails = async(pics) => {
  setpicloading(true);

  if (pics === undefined) {
    toast({
      title: 'Please Select an Image',
      status: 'warning',
      duration: 5000,
      position: 'bottom',
      isClosable: true,
    });
    return;
  }

  console.log(pics);

  if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
    const data = new FormData();
    data.append('files', pics);
    data.append('upload_preset', 'chat-app');
    data.append('cloud_name', 'dnyanesh');

    const response = await axios.post('http://localhost:5000/upload-to-cloudinary', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Add any additional headers, e.g., authorization headers
      },
    })
  } else {
    toast({
      title: 'Please Select an Image',
      status: 'warning',
      duration: 5000,
      position: 'bottom',
      isClosable: true,
    });
    setpicloading(false);
    return;
  }
};

  return (
    <VStack spacing={"5px"} color={"white"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          color={"white"}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          style={{ "::placeholder": { color: "white" } }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          style={{ "::placeholder": { color: "#3498db" } }}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size={"md"}>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={"1.5"}
          accept="image/"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picloading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Backend_Url } from "../Path";
import {
  BiMenuAltLeft,
  BiSolidContact,
  BiHome,
  BiSolidPlusCircle,
  BiUserCircle,
  BiUser,
  BiLogoAndroid,
  BiLogoPlayStore,
} from "react-icons/bi";
import { FaBlogger } from "react-icons/fa";
import { MdDashboardCustomize,MdLogout } from "react-icons/md";

import {
  Drawer,
  Divider,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  Flex,
  DrawerFooter,
  HStack,
  Text,
  AbsoluteCenter,
  Box,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,

} from "@chakra-ui/react";
import { Image} from "@chakra-ui/react";
import hustleimg  from '../images/hustlelogo.png';
const NavBar = () => {
  const [open, setOpen] = useState(0);
  const[isDev,setisDev] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Navigate = useNavigate();
  let uid;

  const handleOpen = (id) => {


    setOpen(id);
  };
  const handleClose = () => setOpen(0);

  const logout = async () => {
    try {
      const response = await fetch(`${Backend_Url}/0auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      Navigate(`/`);
      window.location.reload();
    } catch (error) {
  
    }
  };

  let token = Cookies.get("accessToken");

  useEffect(() => {
    const Getmyrole = async () => {
      try {
        const response = await fetch(`${Backend_Url}/0auth/getidOfDeveloper`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const { id, role } = await response.json();

       if (role=="Developer" ) {
        setisDev(true);
       }
      
      
      } catch (error) {}

     
    };

      Getmyrole();
  
   
    return () => {
     
    };

  }, []);



  const handleDashboard = async () => {
    try {
      const response = await fetch(`${Backend_Url}/0auth/getidOfDeveloper`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const { id, role } = await response.json();
    
      if (id) {
        uid = id;
     

        if (role == "Hire") {
          Navigate(`/DashBoard/Hire/${uid}`);
        } else {
          Navigate(`/DashBoard/Developer/${uid}`);
        }
      }
    } catch (error) {
  
    }
  };

  return (
    <div className=" px-6 py-3  bg-[#1C1C1C] shadow-md static top-0">
      <div className="    hidden md:flex justify-between text-black font-bold ">
        <Link to="/" className="text-white hover:text-slate-600">
        <Box maxW="25%" h="auto">
      <Image src={hustleimg} alt="Example" />
    </Box>
        </Link>
        <div className="flex  gap-5 pr-4">

        { isDev && token!=null && (
          
          <Link to='/alljobs' className=" cursor-pointer text-white hover:text-slate-600 text-lg">
         Explore
          </Link> 
       
      
      )}

          {token == null && (
            <Link to="/login" className="text-white hover:text-slate-600">
              <p className=" cursor-pointer text-lg">Login </p>
            </Link>
          )}
          {token == null && (
            <Link to="/Register"  className="text-white text-lg hover:text-slate-400">
              Register
            </Link>
          )}
          

          <Link to="/contactUs" className="text-white text-lg hover:text-black">
            Contact
          </Link>

          <Link to="/allblogs" className="text-white text-lg hover:text-slate-600">
            Blogs
          </Link>

          {token != null && (
            <p
              className=" cursor-pointer text-white hover:text-slate-600 text-lg"
              onClick={() => handleDashboard()}
            >
              DashBoard
            </p>
          )}



          {token != null && (
<Menu>
  <MenuButton mt={'-2'}   as={Button} rightIcon={<MdLogout />} >
   <Text className="text-lg">Logout</Text> 
  </MenuButton>
  <MenuList>
    <MenuItem  onClick={() => logout() }  >Logout Profile</MenuItem>
    <MenuItem>Cancel</MenuItem>
  </MenuList>
</Menu>
          
          )}
        </div>
      </div>
      {/* phone resoponsive */}
      <div className="md:hidden flex justify-between  ">
        <div className=" flex  justify-end  ">
          <div className="flex items-center" onClick={onOpen}>
            <BiMenuAltLeft size={"25"} color="white" />
          </div>
          <Drawer isOpen={isOpen} placement={"left"} onClose={onClose}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton color={"black"} />
                <DrawerHeader
                  bg={"whiteAlpha.400"}
                  boxShadow="md"
                  textColor={"white"}
                >
                  <Text fontSize={"md"} textColor={"black"}>
              Showrity
                  </Text>
                </DrawerHeader>
                <DrawerBody bg={"whiteAlpha.400"}>
                  <VStack spacing={"3"} align="stretch">
                    {token == null && (
                      <Button
                        w={"-webkit-fit-content"}
                        textColor={"black"}
                        variant={"ghost"}
                        onClick={onClose}
                      >
                        <Link to={`/Register`}>
                          <Flex alignItems="center">
                            <HStack w={"full"} spacing={"4"}>
                              <BiSolidPlusCircle color="#1c1c1c" size={"25"} />
                              <Text color="#0D6EFD">Create an account</Text>
                            </HStack>
                          </Flex>
                        </Link>
                      </Button>
                    )}

                    {token == null && (
                      <Button
                        w={"-webkit-fit-content"}
                        textColor={"black"}
                        variant={"ghost"}
                        onClick={onClose}
                      >
                        <Link to={`/login`}>
                          <Flex alignItems="center">
                            <HStack w={"full"} spacing={"4"}>
                              <BiUserCircle color="#64CCC5" size={"25"} />
                              <Text color="#053B50">Login</Text>
                            </HStack>
                          </Flex>
                        </Link>
                      </Button>
                    )}

                    <Button
                      w={"-webkit-fit-content"}
                      textColor={"black"}
                      variant={"ghost"}
                      onClick={onClose}
                    >
                      <Link to={"/"}>
                        {" "}
                        <Flex alignItems="center">
                          <HStack w={"full"} spacing={"4"}>
                            <BiHome color="#1c1c1c" size={"25"} />
                            <Text color="#053B50">Home</Text>
                          </HStack>
                        </Flex>
                      </Link>
                    </Button>
                    <Button
                      w={"-webkit-fit-content"}
                      textColor={"black"}
                      variant={"ghost"}
                      onClick={onClose}
                    >
                      <Link to={`/allblogs`}>
                        <Flex alignItems="center">
                          <HStack w={"full"} spacing={"4"}>
                            <FaBlogger color="#1c1c1c" size={"25"} />
                            <Text color="#053B50">Blogs</Text>
                          </HStack>
                        </Flex>
                      </Link>
                    </Button>
                    <Button
                      w={"-webkit-fit-content"}
                      textColor={"black"}
                      variant={"ghost"}
                      onClick={onClose}
                    >
                      <Link to={"/contactUs"}>
                        <Flex alignItems="center">
                          <HStack w={"-webkit-fit-content"} spacing={"4"}>
                            <BiSolidContact color="#1c1c1c" size={"25"} />
                            <Text color="#053B50">Contact</Text>
                          </HStack>
                        </Flex>
                      </Link>
                    </Button>
                    {token != null && (
                      <Button
                        w={"-webkit-fit-content"}
                        textColor={"black"}
                        variant={"ghost"}
                        onClick={onClose}
                      >
                        <p onClick={() => handleDashboard()}>
                          {" "}
                          <Flex alignItems="center">
                            <HStack w={"full"} spacing={"4"}>
                              <MdDashboardCustomize
                                color="#1c1c1c"
                                size={"25"}
                              />
                              <Text color="#053B50">DashBoard</Text>
                            </HStack>
                          </Flex>
                        </p>
                      </Button>
                    )}

                    <Box position="relative" mt={"16"} padding="2">
                      <Divider style={{ height: "3px" }} />
                      <AbsoluteCenter bg="white" px="4">
                        <Text fontFamily={"cursive"}>Download</Text>
                      </AbsoluteCenter>
                    </Box>
                    <Badge
                      bg={"#1c1c1c"}
                      textColor={"white "}
                      w={"-webkit-fit-content"}
                      py={"1"}
                      px={"3"}
                      borderRadius={"base"}
                    >
                      <HStack spacing={"-1"}>
                        <BiLogoPlayStore size={"30"} />
                        <VStack spacing={"-2.5"}>
                          <Text
                            fontSize={"10px"}
                            fontWeight={"light"}
                            fontFamily={"mono"}
                            letterSpacing={"wider"}
                          >
                            Download on the
                          </Text>
                          <Text fontWeight={"bold"} fontSize={"15px"}>
                            Playstore
                          </Text>
                        </VStack>
                      </HStack>
                    </Badge>
                  </VStack>
                </DrawerBody>
                <DrawerFooter >
                  {token != null && (

                    
<Menu>
  <MenuButton mt={'-2'} as={Button} bgColor="#1c1c1c" textColor="white" rightIcon={<MdLogout />}>
    Logout
  </MenuButton>
  <MenuList>
    <MenuItem onClick={() => {
                         logout();
                        }}>Logout Profile</MenuItem>
    <MenuItem >Cancel</MenuItem>
  </MenuList>
</Menu>
                
                  )}
                </DrawerFooter>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </div>
                        
     <Image src={hustleimg} alt="Example"    maxW={{ base: "50%", md: "50%" }} />
        
      </div>
    </div>
  );
};

export default NavBar;

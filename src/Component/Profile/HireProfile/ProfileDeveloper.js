import React, { useEffect, useState } from "react";
import { Backend_Url } from "../../../Path";
import { Link, useNavigate, useParams } from "react-router-dom";
import dummyimg from "../../../images/Profile-Fallback.jpg";

import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  BiArrowBack,
  BiSolidImageAdd,
  BiPhoneCall,
  BiMailSend,
  BiSolidPencil,
} from "react-icons/bi";
import { IoChatbox } from "react-icons/io5";
import { ImLocation } from "react-icons/im";
import axios from "axios";
import Chat from "../../Chat/Chat";
import Attention from "../../Attention/Attention";

const ProfileDeveloper = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [ProfileData, setProfileData] = useState({});
  const [coreSkill, setcoreSkill] = useState([]);
  const [addskill, setaddSkill] = useState(false);
  const [skill, setskill] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setmsg] = useState("");

  const handladdButton = (str) => {
    coreSkill.push(str);

    setskill("");
  };
  useEffect(() => {}, coreSkill);

  const removeaddSkill = (str, i) => {
    setcoreSkill(coreSkill.filter((data) => data !== str));
  };

  useEffect(() => {
    async function fetchData() {
      if (ProfileData[0]?.skill) setcoreSkill(ProfileData[0]?.skill);
    }

    fetchData();

    // Return a cleanup function
    return () => {
      // Perform any cleanup actions here if needed
    };
  }, [ProfileData]);

  const [result, setResult] = useState(null);
  const [isvalid, setisvalid] = useState();
  const [Profileimage, setProfileimage] = useState();
  const [showchat,setshowchat] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${Backend_Url}/0auth/checkifValidchange/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const res = await response.json();

        setisvalid(res.verify);
      } catch (err) {}
    }

    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${Backend_Url}/0auth/showDeveloperProfileById/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const res = await response.json();
        //   console.log(res[0]);

        setResult(res);
        //    console.log(result.mobile);
      } catch (err) {}
    }

    fetchData();

    // Return a cleanup function
    return () => {
      // Perform any cleanup actions here if needed
    };
  }, []);

  useEffect(() => {
    if (result !== null) {
      // Now you can access and set data when result is available
      setProfileData(result);
    }
  }, [result]);

  useEffect(() => {
    setProfileimage(ProfileData[0]?.image?.url);
  }, [ProfileData]);

  const changePhoto = async () => {
    setLoading(true);
    const response = await axios.put(
      `${Backend_Url}/0auth/updateProfileById/${id}`,
      {
        img: Profileimage,
      }
    );
    setmsg(response.data);
    setTimeout(() => {
      setmsg("");
    }, 1500);
    setLoading(false);
  };

  const ChangeProfileDetails = () => {
    Navigate(`/DeveloperProfileForm/${id}`);
  };

  const convertToBase64 = async (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setProfileimage(reader.result);
    };
    reader.onerror = (error) => {};
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
         if (role =="Developer") {
          setshowchat(true);
         }
        console.log(role);
      } catch (error) {}

     
    };


    Getmyrole();
    return () => {
      // Perform any cleanup actions here if needed
    };

  }, []);

  return (
    <>
      {isvalid && (
        <HStack pl={"4"} w={"full"}>
          <Link to={`/DashBoard/Developer/${id}`}>
            <BiArrowBack size={"45"} />
          </Link>
        </HStack>
      )}

      <Stack
        justifyContent={"center"}
        mt={"8"}
        direction={["column", "column", "row"]}
        spacing={"4"}
        // alignItems={'center'}

        mb={"16"}
      >
        <VStack>
          <VStack
            bgColor={"#1c1c1c"}
            h={"70vh"}
            px={"8"}
            py={"4"}
            rounded={['xl',"3xl"]}
            mx={"8"}
            justifyContent="space-between"
           alignItems={'space-between'}
          >
            <VStack  justifyContent="space-between"
           h="full">

            {/* <Image
              borderRadius="full"
              boxSize="70px"
              src={Profileimage ? Profileimage : dummyimg}
              alt="profile image"
              shadow={"lg"}
              zIndex="2"
              mr="4"
            /> */}
        
              <Image 
      src={ProfileData[0]?.imageBanner.url}
      alt='banner image'
      borderRadius='lg'
      
      objectFit={'cover'}
      minW={['80vw','20vw']}
      maxH={['18vh','20vh']}
      />
{/* 
            {isvalid && (
              <>
              <HStack justifyContent={"center"} mt={"1"}>
              <label htmlFor="fileInput">
              <Text
              p={"2"}
              borderRadius={"xl"}
              bg={"whatsapp.100"}
              cursor={"pointer"}
              >
              Change profile
              </Text>
              </label>
              
              <input
              accept="image/*"
              type="file"
              id="fileInput"
              onChange={convertToBase64}
              hidden
              />
              </HStack>
              <Button onClick={changePhoto} cursor={"pointer"}>
              {loading ? <Spinner mx={4} /> : "Save photo"}
              </Button>
              </>
            )} */}

            <Box
              position="fixed"
              top="4%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="100%"
              maxWidth="400px"
              >
              {msg ? (
                <Alert status="success">
                  <AlertIcon />
                  {msg}
                </Alert>
              ) : null}
            </Box>
            <VStack textColor={"white"}>
              <Text
                mt={"8"}
                fontWeight={"medium"}
                fontSize={"2xl"}
                letterSpacing={"wider"}
                >
                <VStack spacing={"-1"}>
                  <Text>HELLO I'AM</Text>
                  <Text textTransform={"uppercase"}>
                    {ProfileData[0]?.name || "Name"}
                  </Text>
                  
                </VStack>
              </Text>
              <Text>
                <b>Achivement</b>
                &nbsp; &nbsp;
                <Badge
                  children={ProfileData[0]?.badges || "Badge"}
                  alignSelf={"start"}
                  px={"2"}
                  bg={"orange.300"}
                  fontSize={"12"}
                  />
              </Text>
            </VStack>
            <HStack mt={"4"} textColor={"white"}>
              <ImLocation size={"25"} />
              <Text fontFamily={"mono"}>
                {ProfileData[0]?.city + "," + ProfileData[0]?.country}
              </Text>
            </HStack>
            
            {isvalid && (
              <>
              <HStack>

                <HStack justifyContent={"center"} >
                  <label htmlFor="fileInput">
                    <Text
                      p={"2"}
                      borderRadius={"xl"}
                      bg={"whatsapp.100"}
                      cursor={"pointer"}
                      >
                      Change profile photo
                    </Text>
                  </label>

                  <input
                    accept="image/*"
                    type="file"
                    id="fileInput"
                    onChange={convertToBase64}
                    hidden
                    />
                </HStack>
                <Button onClick={changePhoto} cursor={"pointer"}>
                  {loading ? <Spinner mx={4} /> : "Save photo"}
                </Button>
                    </HStack>
              </>
            )}
          </VStack>
          
                  </VStack>
        </VStack>

        <VStack p={"4"}>
          {isvalid && (
            <Text mx={"8"} fontSize={"xl"}>
              <HStack p={"2"} bgColor={"ButtonFace"} rounded={"lg"}>
                <Text
                  onClick={() => ChangeProfileDetails()}
                  cursor={"pointer"}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  opacity={".9"}
                >
                  Edit Profile
                </Text>
                <BiSolidPencil />
              </HStack>
            </Text>
          )}
          <VStack spacing={"4"} p={"4"}>
            <HStack w={"full"}>
            <Heading textAlign={"left"}>
              About Me 
            </Heading>
            <Image
              borderRadius="full"
              boxSize="80px"
              src={Profileimage ? Profileimage : dummyimg}
              alt="profile image"
              shadow={"lg"}
            
              mr="2"
              />
            </HStack>
            <Text
              opacity={".8"}
              overflow={"hidden"}
              w={["80vw", "20vw"]}
              letterSpacing={"wider"}
              textAlign={"left"}
              style={{ wordSpacing: "5px" }}
              h={"full"}
            >
              {ProfileData[0]?.summary}
            </Text>
            <Flex flexWrap={"wrap"} gap={"4"}  w={["full","25vw"]}>
              {coreSkill.map((data, index) => (
                <Badge
                  children={data}
                  alignSelf={"start"}
                  textColor={"white"}
                  px={"8"}
                  py={"2"}
                  bg={"#1c1c1c"}
                  fontSize={"12"}
                  rounded={"2xl"}
                />
                
              ))}
              
            </Flex>
          <Stack direction={['column','row']} mt="4" spacing={['2','8']} >
        <HStack>
        <BiPhoneCall opacity='.8' size="20"/>
        <Text opacity='.8'>{ProfileData[0]?.mobile}</Text>
          </HStack>  
          <HStack>
        <BiMailSend opacity='.8' size="20"/>
        <Text opacity='.8'>{ProfileData[0]?.email}</Text>
          </HStack> 
          
          </Stack>
          </VStack>

          {isvalid || showchat ? (
            <></>
          ) : (
            
            // <Button
            //   alignSelf={"flex-end"}
            //   mt={"16"}
            //   variant={"ghost"}
            //   border={"1px solid #9fd3c7 "}
            //   p={"2"}
            //   onClick={onOpen}
            // >
            //   <HStack w={"full"} justifyContent={"center"}>
            //     <IoChatbox size={"20"} />
            //     <Text>Contact Me</Text>
            //   </HStack>
            // </Button>
            <></>
          )}
        </VStack>

        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size={"sm"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              Chat with <b>{ProfileData[0]?.name || "Me"}</b>
            </DrawerHeader>
            <DrawerBody>
              <Chat Seekername={ProfileData[0]?.name || "Me"} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Stack>
      <Attention/>
    </>
  );
};

export default ProfileDeveloper;

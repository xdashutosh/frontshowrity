import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Backend_Url } from "../Path";

import React from "react";
import { useState, useEffect } from "react";

import { HStack, VStack } from "@chakra-ui/react";
import SearchBarHome from "./SearchBarHome";
import { Link, useNavigate } from "react-router-dom";
import Register from "../Pages/Register";
import NavBar from "./NavBar";
import SellerCard from "./SellerCard";

const Headerhire = () => {
  const pills = [
    "Website Design",
    "Figma",
    "Blender",
    "App development",
    "SEO",
    "Full Stack",
  ];

  const [data, setdata] = useState([])

  
const [result, setResult] = useState(null); 
  const Navigate = useNavigate();

  const handleJobPost = async () => {
    try {
      const response = await fetch(`${Backend_Url}/0auth/getidOfDeveloper`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const { id, role } = await response.json();
      if (role == "Hire") {
        console.log(id);
        Navigate(`/JobPost/${id}`);
      }
    } catch (error) {}
  };



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${Backend_Url}/0auth/ShowAllDeveloperProfile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        const resultData = await response.json();
        console.log(resultData);
        const limitedResult = resultData.slice(4, 16);
  
        setResult(limitedResult);
   
        // setResult(resultData); // Update the result state when data is available
  
      } catch (err) {
      }
    }
  
    fetchData();
  
    // Return a cleanup function
    return () => {
      // Cleanup code here (if needed)
    };
  }, []);
  
  
  useEffect(() => {
    if (result !== null) {
      // Now you can access and set data when result is available
      setdata(result);
     
    }
  }, [result]);




  return (
    <section>
      <NavBar />
      <Card
        m={["0", "8"]}
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        shadow={"none"}
        bgColor="#E8F8F5"
      >
        <Image
          objectFit="cover"
          minW={{ base: "100%", sm: "40vw" }}
          maxH={{ base: "30vh", sm: "50vh" }}
          src={
            "https://raw.githubusercontent.com/oragetech/assests/main/hireheaderimg-removebg-preview.png"
          }
          alt="Caffe Latte"
          rounded={"lg"}
        />

        <Stack justifyContent={"space-between"}>
          <aside>
            <CardBody>
              {/* <Text  opacity=".9" letterSpacing="wide" fontSize={['md','xl']} textAlign={['left','center']}>
      Empower your Vision with World-Class Work. Say Goodbye to Endless Interviews and Partner with the World's Best Freelancers.
        </Text> */}
              <HStack w="full" textAlign={"left"}>
                <Heading w={["100%", "60%"]} mt={["2", "4"]}>
                  Find the best Maestro for{" "}
                  <Text fontSize={["4xl", "6xl"]} mt={"-1"}>
                    <b className="text-green-600">Your Job</b>
                  </Text>
                </Heading>
              </HStack>

              <SearchBarHome />

              <HStack w="full" flexWrap={"wrap"}>
                <Badge
                  children={pills[0]}
                  alignSelf={"start"}
                  textColor={"white"}
                  value={pills[0]}
                  px={"4"}
                  py={"2"}
                  bg={"#1c1c1c"}
                  fontSize={["8", "12"]}
                  rounded={"2xl"}
                  cursor={"pointer"}
                  onClick={(e) => Navigate(`/filterdeveloper/${pills[0]}`)}
                />
                <Badge
                  children={pills[1]}
                  alignSelf={"start"}
                  textColor={"white"}
                  value={pills[1]}
                  px={"4"}
                  py={"2"}
                  bg={"#1c1c1c"}
                  fontSize={["8", "12"]}
                  rounded={"2xl"}
                  cursor={"pointer"}
                  onClick={(e) => Navigate(`/filterdeveloper/${pills[1]}`)}
                />{" "}
                <Badge
                  children={pills[2]}
                  alignSelf={"start"}
                  textColor={"white"}
                  value={pills[2]}
                  px={"4"}
                  py={"2"}
                  bg={"#1c1c1c"}
                  fontSize={["8", "12"]}
                  rounded={"2xl"}
                  cursor={"pointer"}
                  onClick={(e) => Navigate(`/filterdeveloper/${pills[2]}`)}
                />{" "}
                <Badge
                  children={pills[3]}
                  alignSelf={"start"}
                  textColor={"white"}
                  value={pills[3]}
                  px={"4"}
                  py={"2"}
                  bg={"#1c1c1c"}
                  fontSize={["8", "12"]}
                  rounded={"2xl"}
                  cursor={"pointer"}
                  onClick={(e) => Navigate(`/filterdeveloper/${pills[3]}`)}
                />{" "}
                <Badge
                  children={pills[4]}
                  alignSelf={"start"}
                  textColor={"white"}
                  value={pills[4]}
                  px={"4"}
                  py={"2"}
                  bg={"#1c1c1c"}
                  fontSize={["8", "12"]}
                  rounded={"2xl"}
                  cursor={"pointer"}
                  onClick={(e) => Navigate(`/filterdeveloper/${pills[4]}`)}
                />
                <Badge
                  children={pills[5]}
                  alignSelf={"start"}
                  textColor={"white"}
                  value={pills[5]}
                  px={"4"}
                  py={"2"}
                  bg={"#1c1c1c"}
                  fontSize={["8", "12"]}
                  rounded={"2xl"}
                  cursor={"pointer"}
                  onClick={(e) => Navigate(`/filterdeveloper/${pills[5]}`)}
                />
              </HStack>
            </CardBody>
          </aside>

          <HStack w="full" justifyContent={"end"}>
            <Button
              variant="unstyled"
              px="2"
              m={"4"}
              alignSelf="start"
              bgColor="#1c1c1c"
              textColor="white"
              onClick={() => handleJobPost()}
            >
              Post your Job
            </Button>
          </HStack>
        </Stack>
      </Card>
      <Heading m={'4'}>Explore best Maestros</Heading>
      <div className='flex gap-3 px-4  flex-wrap justify-center'  >
        
        {
          data.map((item,i)=>(
            <>
                <SellerCard key={i} data={item}/>
                

                
                </>
                
                ))
                
              }
              
              </div>

              <div className='flex justify-center   my-3 '>
              <Link to='/allDeveloper'>   <p className=' cursor-pointer hover:text-[#EEEEEE] hover:bg-[#176B87] bg-[#1C1C1C] px-3 py-2 text-[#FFFFFF] w-18 font-bold rounded-lg '>Expolre all freelancers</p> 
              </Link>
              
              </div>
              
    </section>
  );
};

export default Headerhire;

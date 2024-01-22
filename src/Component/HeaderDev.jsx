import { Badge, Button, Flex, HStack, Heading, Select, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import  { useState, useEffect } from 'react';
import { Backend_Url } from '../Path.js';
import SearchBarHome from './SearchBarHome.jsx';
import TaskCard from './DahBoard/DashBoarddeveloper/TaskCard.js';
import NavBar from './NavBar.js';
import SearchbarDev from './SearchbarDev.jsx';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';
import Filteredjobcard from './Filteredjobcard.jsx';
import { Link } from 'react-router-dom';
const HeaderDev = () => {
  const textArray = ['Join us, shape your freelance future.', 'Elevate your freelancing career with us.', 'Your skills, our global job platform.']; // Your array of texts
  const badgeArray = ['Endless Projects','Global Opportunities', 'Multiple Income Streams']
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [myid,setmyid] = useState();
  const [myname,setmyname] = useState();
  const [result,setResult] = useState([]);
  const [selectedValue, setSelectedValue] = useState(2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % textArray.length); // Move to next index or reset to 0
    }, 2500); // Change text every 1000 milliseconds (1 second)

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [textArray.length]); // Dependency array ensures effect is only re-run if textArray length changes


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex1(prevIndex => (prevIndex + 1) % badgeArray.length); // Move to next index or reset to 0
    }, 2500); // Change text every 1000 milliseconds (1 second)

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [badgeArray.length]); 



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

          setmyid(id);
        
      
      } catch (error) {}
     
    };

 
        Getmyrole();
      

    return () => {
     
    };

  }, []);

  useEffect(() => {
 
    async function fetchData() {
      try {
        const response = await fetch(`${Backend_Url}/0auth/showDeveloperProfileById/${myid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
    
        const result = await response.json();

       
         
      
        setmyname(result[0]?.name)
  
         
       
        
      } catch (err) {
     
      }
    }

  fetchData();


    // Return a cleanup function
    return () => {
      
    };
  }, [myid]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${Backend_Url}/0auth/showAllPost`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

  

        const resultData = await response.json();
        const limitedResult = resultData.slice(0, selectedValue);
  
        setResult(limitedResult);
        console.log(limitedResult);
      } catch (err) {}
    }

    fetchData();

    // Return a cleanup function
    return () => {
      // Perform any cleanup actions here if needed
    };
  }, [selectedValue]);

  const handleperpage = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    console.log(selectedValue);
  };
  
  return (
    <>
     <NavBar/>
   <VStack w={'full'}  h={'full'} border={'1px'}  >
    <VStack w={'full'} >
 
    <Heading w={'full'} fontSize={['lg','2xl']} textAlign={'left'}  p={'4'}>Welcome, {myname}</Heading>
 <HStack h={'30vh'} justifyContent={'center'} w={'full'}>
   <Heading w={'80%'} style={{textShadow:'1px 1px 2px black'}} fontSize={['12vw','5vw']}>{textArray[currentIndex]}</Heading>
  </HStack>
<Stack direction={['column','row']} w={'full'}justifyContent={'space-between'} px={'4'}>  
         <HStack w={['100%','60%']}  px={['0','48']}>
          <SearchbarDev/>                
          </HStack> 
          <Badge
                  children={badgeArray[currentIndex1]}
                  alignSelf={"start"}
                  textColor={"white"}
                  px={"8"}
                  py={"4"}
                  bg={"#1c1c1c"}
                  fontSize={['8',"12"]}
                  rounded={"2xl"}
                  letterSpacing={'wide'}
                  />
                </Stack>
    </VStack>
    <VStack mt={'8'} px={'48'} spacing={'20'} >
 <HStack w={'full'} px={'4'}  justifyContent={'flex-end'}>
  <Text fontSize={'sm'} opacity={'.8'}>Show per page</Text>
  <Select w={['30%','5%']} onChange={handleperpage} value={selectedValue} >
    <option >2</option>
    <option value={4} >4</option>
    <option value={6}>6</option>
    <option value={8} >8</option>
    <option value={10}>10</option>
  </Select>
  </HStack> 

    {result.map((data, index) => (
          
<Filteredjobcard data={data} key={index}/>

           ))}



    </VStack>
    <HStack   m={'16'}>  <Link to='/alljobs'>
    <Button
        
        px={8}
        py={2}
        borderRadius='full'
        variant={'outline'}
        colorScheme='blue'
        fontSize={'sm'}
        >
          Explore all services
        </Button>
          </Link> </HStack>
   </VStack>
                  </>
  )
}

export default HeaderDev

import { Badge, Button, Divider, Flex, HStack, Heading, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Filteredjobcard = ({ data}) => {
  const Navigate = useNavigate();
  const [skill, setskill] = useState([]);
  const[liked,setliked] = useState(false);
  const[hoursago,sethoursago] = useState();
  useEffect(() => {
  
      const postDate = new Date(data.TimeOfPosting);
      const currentDate = new Date();
      const differenceInHours = Math.abs(currentDate - postDate) / 36e5;
      if (differenceInHours >= 24) {
        // Calculate days if 24 hours or more
        const differenceInDays = differenceInHours / 24;
        sethoursago(`${Math.round(differenceInDays)} day${Math.round(differenceInDays) > 1 ? 's' : ''} ago`);
      } else {
     
        sethoursago(`${Math.round(differenceInHours)} hours ago`);
      }
  

    let skillstring = data.technology;
    setskill(skillstring.split(","));
  }, [data]);

  const handleClick = (id) => {
    Navigate(`/ProjectDetails/${id}`);
  };
  const toast = useToast();
  const handleaddtofav=(name)=>{
    if (liked == false) {
        setliked(true);
        showToast(`${name} added to favourites`,'success')
    }
    else{
        setliked(false);
        showToast(`${name} removed from favourites`,'success')

    }
  }

  const showToast = (text, color) => {
    toast({
      title: text,
      position: "top",
      isClosable: true,
      status: color,
    });
  };

  return (
    <>
    <VStack p={"4"} w={"100%"} _hover={{backgroundColor:'#f5f5f5'}} >
      <Stack w={"full"} direction={['column','row']} spacing={'4'} justifyContent={"space-between"}>
        <HStack spacing={'4'}>

        <Heading w={"-webkit-max-content"} textAlign={"left"} >
          {data.companyName}
        </Heading>
        <Text fontSize={'sm'} opacity={'.8'}>Posted <b>{hoursago}</b></Text>
        </HStack>
       <HStack spacing={'8'}>
       <Badge
            children={`Minimum Badge ${data.level}`}
            alignSelf={"start"}
            textColor={"white"}
            px={"4"}
            py={"2"}
            bg={"orange"}
            fontSize={"10"}
            rounded={"lg"}
            />
         
         <Text fontWeight={'bold'} fontSize={'xl'}>${data.ProjectMoney}</Text>
         {
             liked?<BsFillHeartFill size={'28'} onClick={()=>handleaddtofav(data.companyName)} />:<BsHeart size={'28'} onClick={()=>handleaddtofav(data.companyName)}/>
            }
        </HStack>
        
      </Stack>

      <Text w={'full'} fontSize={'lg'} textAlign={'left'}>{data.ProjectSummary}</Text>
      <HStack w={'full'} justifyContent={'space-between'} >
      <Flex flexWrap={"wrap"} gap={"4"} >
        {skill.map((eachskill, index) => (
            <Badge
            children={eachskill}
            alignSelf={"start"}
            textColor={"white"}
            px={"4"}
            py={"2"}
            bg={"#1c1c1c"}
            fontSize={"10"}
            rounded={"2xl"}
            key={index}
            />
            ))}
      </Flex>
               <Button
        
        px={8}
        py={2}
        borderRadius='full'
        variant={'outline'}
        colorScheme='blue'
        onClick={() => handleClick(data._id)}
        fontSize={'sm'}
        >
          Propose
        </Button>
            </HStack>
            <Text fontSize={'sm'} opacity={'.8'}>Number of applicants <b>{data.appliedUser.length}</b></Text>
           
    </VStack>
  
              </>
  );
};

export default Filteredjobcard;

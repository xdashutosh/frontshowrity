import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCookie } from '../Utils/getCookies';
import { Card, CardHeader,Stack, CardBody, CardFooter, Button, Image, Text, Box, Heading, ButtonGroup, Avatar, Flex, HStack, Badge, VStack } from '@chakra-ui/react'
const SellerCard = ({data}) => {

  const [badgecolor,setbadgecolor] = useState('orange');

  const img="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
const Navigate=useNavigate();
// const {id}=useParams();
  const handleClick=(id)=>{
  

    const refreshToken =getCookie('refreshToken')
    if(!refreshToken){
      window.location.href = '/login';
    }
    
      Navigate(`/DeveloperProfile/${id}`)
  }
const [SummaryDetails, setSummaryDetails] = useState('')
  useEffect(() => {
    if (data.summary) {
      // Split the summary into words
      const words = data.summary.split(' ');

      // Slice the array to include words 10 through 15 (0-based index)
      const selectedWords = words.slice(0, 15);

      // Join the selected words back into a string
      const slicedSummary = selectedWords.join(' ');

      // Update the state with the sliced summary
      setSummaryDetails(slicedSummary);
      

    }

    if(data.badges =="Recommended")
    {
      setbadgecolor('teal');
    }
    if (data.badges =="Gold") {
      setbadgecolor('yellow.500');
      
    }
  }, [data.summary,data.Badges]);
  

  
  return (
   

<Card maxW='sm' bgColor="transparent" shadow="none" >
  <CardBody>
    <Image 
      src={data?.imageBanner?.url ? data?.imageBanner?.url : "https://refine.dev/img/generic-profile.png"}
      alt='banner image'
      borderRadius='lg'
      
      objectFit={'cover'}
      minW={['80vw','20vw']}
      maxH={['18vh','20vh']}
    />
    <Stack mt='6' spacing='3'>
     <HStack>
     {/* <Avatar name={data.name}  />  */}
      <Heading size='md' textTransform={'uppercase'}>{data.name}</Heading> 
      {/* {data.badges =="Recommended"?setbadgecolor('teal'):} */}
     <Badge bgColor={badgecolor} textColor="white" p={1.5} borderRadius="lg">
     {data.badges}
      </Badge>
      </HStack> 
      <Text align="left" opacity={'.8'}>
      {SummaryDetails}
      </Text>
    </Stack>
  </CardBody>

 
      <Button m="2" w={['40%','30%']}  textColor="white" px="2"  bgColor ="#1c1c1c" variant="unstyled" onClick={()=>handleClick(data.userId)}>
        Visit Profile
      </Button>
    

</Card>
   
    
  )
}

export default SellerCard

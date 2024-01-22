import React, { useEffect, useState } from 'react'
import AppliedUser_Project from './AppliedUser_Project'
import { useParams } from 'react-router-dom'
import { Backend_Url } from '../../Path';
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Badge, Box, Button, Card, CardBody, CardFooter, Flex, FormControl, FormLabel, HStack, Heading, Image, Input, Stack, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import Attention from '../Attention/Attention';

const ProjectDetails = () => {

  const [JobDetails, setJobDetails] = useState({})
  const {id}=useParams();
  const [details, setdetails] = useState([]);
  const [myid,setmyid] = useState();
  const [skill,setskill]= useState(["tech1"]);
  const[projectdate,setdate] = useState("");
  const[projecttime,settime] = useState("");
 
 let vis = "Apply";
  let bgcol ="#1c1c1c";
  let textcol ="white";
  
  
 const role=localStorage.getItem('role');

useEffect(() => {
    async function fetchData() {
      try {
        

        const response = await fetch(`${Backend_Url}/0auth/GetProjectDetialsByProjectID/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const result = await response.json();
       
         
         setJobDetails(result.project);
        

         let skillstring = result.project.technology;
         setskill( skillstring.split(','));
         setdetails(result.project.appliedUser);
         const dateObj = new Date(result.project.TimeOfPosting);
         const date = dateObj.toISOString().split('T')[0];
         setdate(date);
    const time = dateObj.toTimeString().split(' ')[0];
       settime(time);
        
      } catch (err) {
     
      }
    }

    fetchData();

    // Return a cleanup function
    return () => {
      
    };
  }, [id]);

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



  const handleApply=async(id)=>{
    try {
     
      const response = await fetch(`${Backend_Url}/0auth/taskApply/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
     
      
      const result = await response.json();
      if(result.eligible==false){
        showToast('you are not eligible because of your rating','error');
        
         return 
      }
      showToast('Applied ', 'success');
      
       
        setTimeout(() => {
           window.location.reload();  
        }, 1000);
     
     
      
      
      
    
      
    } catch (err) {
      
    }
  }

  const toast = useToast();
  const showToast = (text,color) => {
    toast({
      title: text,
      position: 'top',
      isClosable: true,
      status:color,
      
    })
  };



  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef()




  

  return (
    <div>


<HStack  h={'80vh'} m={'4'} justifyContent={'center'} alignItems={'center'}>

    <Card m={['0','8']} mt={'32'} 
    
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    shadow={['none','lg']}
    borderBottom={['4px','none']} 
    
    >
    <Image
      objectFit='Center'
      maxW={{ base: '0%', sm: '35vw' }}
      minH={{ base: '0vh', sm: '50vh' }}
      src={'https://raw.githubusercontent.com/oragetech/assests/main/DALL%C2%B7E%202024-01-08%2019.23.40%20-%20Create%20an%20SVG%20illustration%20for%20a%20job%20post%20page.%20The%20illustration%20should%20depict%20a%20notice%20board%20with%20various%20job%20listings%20posted%20on%20it.%20Include%20small%20no.png'}
      alt='Caffe Latte'
     
      
      
      />
  
    <Stack>

      <CardBody>
        <VStack  justifyContent="space-between" h="full" >

      <VStack
      
      w={['full','40vw']}
      
      >
           
        <VStack spacing={2} w={'full'}>

       <Heading textTransform={'uppercase'}>{JobDetails.companyName}</Heading>
       <Text  mt={'4'}
              opacity={".8"}
              overflow={"hidden"}
              w={["80vw", "30vw"]}
              letterSpacing={"wider"}
              textAlign={"left"}
              style={{ wordSpacing: "5px" }}
              h={"-webkit-fit-content"}
             
              >
             {JobDetails.ProjectSummary}
            </Text>

           
            
       <VStack mt={'8'} spacing={'4'} alignItems={'center'} w={'full'} >
        <Heading fontSize={'lg'}>Recommended technology</Heading>
        
         <Flex flexWrap={'wrap'} gap={'4'}  justifyContent={'center'}>
         {skill.map((eachskill, index) => (
           <Badge
           children={eachskill}
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
         <VStack mt={'2'} w={'full'} justifyContent={'center'}>
<Heading  fontSize={'lg'}>Minimal Badge level </Heading>
 <Badge
                  children={JobDetails.level}
                  rounded={'lg'}
                  px={"4"}
                  py={'2'}
                  bg={"orange.300"}
                  fontSize={"16"}
                  />
         </VStack>

         <VStack  alignSelf={'self-start'} spacing={'-2'}>
             <HStack  w={'full'}>
<Text opacity={".8"} letterSpacing={"wider"} >Estimated Time</Text>
<Text fontSize={'lg'}>{JobDetails.estimateTime} Days</Text>
         </HStack>
         <HStack  w={'full'} >
<Text opacity={".8"} letterSpacing={"wider"} >Project Amount</Text>
<Text fontSize={'lg'}>${JobDetails.ProjectMoney}</Text>
         </HStack>
         </VStack>

              </VStack>
         
        </VStack>
              
      </VStack>
     <Text w={'full'} opacity={'.6'} fontSize={'sm'}  textAlign={'right'}>posted at {projecttime},{projectdate}</Text>
                  </VStack>
      </CardBody>
    </Stack>
  </Card>
              </HStack>



   
        <div className=' my-4 flex flex-col gap-4'>
          <p className='text-2xl font-bold  text-[#1c1c1c] text-center'>Who applied for <span className='text-[#64CCC5]'> the job</span></p>
          <div className=' flex flex-col gap-2'>
              {
                details.map((data,index)=>(
                  <AppliedUser_Project data={data}  amount={JobDetails.ProjectMoney} />
                ))
              }

          </div>
          
        </div>
        {
          role=='Hire' ?<></>:<>
              {
  details.map((eachid) => {
  
    if (myid == eachid) {
      vis = "You have already applied for this job!";
      bgcol="white";
      textcol="black";
     
    }
  return ""; // map expects a return value, but here it's not used
})

              }
                <Button mb={'2'} bgColor={bgcol} variant={'unstyled'}  p={'2'} textColor={textcol} onClick={onOpen}  >{vis}</Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Are you interested for this project?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
        Make sure you are eligible as per your badges...
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Later
            </Button>
            <Button colorScheme='cyan' textColor={'white'} ml={3}  onClick={()=>handleApply(id)}>
              Apply
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
              <Attention/>
       </>
        }
        
    </div>
  )
}

export default ProjectDetails
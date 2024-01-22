import React, { useEffect, useRef, useState } from 'react'
// import JobDoneCard from './JobDoneCard';
// import TaskApply from './TaskApply';
import DashBoardright from '../DashBoarddeveloper/DashBoardright';
import DashBoardHireRight from './DashBoardHireRight';
import { useNavigate, useParams} from 'react-router-dom';

import {BiChart, BiCheck, BiCheckCircle, BiCog, BiLogoGraphql, BiParagraph, BiRightIndent, BiSearch} from 'react-icons/bi'
import {RiHandbagFill} from 'react-icons/ri'
import { Avatar,Heading, RadioGroup, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import {Button,AlertDialog,AlertDialogOverlay,AlertDialogHeader,AlertDialogContent,AlertDialogBody,AlertDialogCloseButton,Radio} from '@chakra-ui/react';
import api from '../../../Utils/api';
import {FiFilePlus} from 'react-icons/fi';
import { Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,Flex,DrawerFooter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Backend_Url } from '../../../Path';
import { FaHospitalUser } from 'react-icons/fa';

const DashBoradProfileHire = () => {
    const [IsOpen, setIsOpen] = useState(false);
    const Navigate=useNavigate();
    const {id}=useParams();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef();
    const handleclick=()=>{
            setIsOpen(!IsOpen);
    }

    const [Active, setActive] = useState(0);

      const handleActive=(id)=>{
           setActive(id);
      }

      const[currentPage , setCurrentPage]=useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(3)
      

      const data=[
            {"img":"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            "name":"gaurav",
            "level":"Top rated",
            "desc" :"I will Create 2D animation explainer video and sales video",
            "rating":"5",
            "price":"10,000"
        },
        {"img":"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            "name":"gaurav",
            "level":"Top rated",
            "desc" :"I will Create 2D animation explainer video and sales video",
            "rating":"5",
            "price":"10,000"
        },
        {"img":"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            "name":"gaurav",
            "level":"Top rated",
            "desc" :"I will Create 2D animation explainer video and sales video",
            "rating":"5",
            "price":"10,000"
        },
        {"img":"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            "name":"kk",
            "level":"Top rated",
            "desc" :"I will Create 2D animation explainer video and sales video",
            "rating":"5",
            "price":"10,000"
        },
        {"img":"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            "name":"ll",
            "level":"Top rated",
            "desc" :"I will Create 2D animation explainer video and sales video",
            "rating":"5",
            "price":"10,000"
        },
        {"img":"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            "name":"gaurav",
            "level":"Top rated",
            "desc" :"I will Create 2D animation explainer video and sales video",
            "rating":"5",
            "price":"10,000"
        },
        {"img":"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            "name":"dd",
            "level":"Top rated",
            "desc" :"I will Create 2D animation explainer video and sales video",
            "rating":"5",
            "price":"10,000"
        },
        {"img":"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            "name":"lklk",
            "level":"Top rated",
            "desc" :"I will Create 2D animation explainer video and sales video",
            "rating":"5",
            "price":"10,000"
        }
]


const handlePageChange=(page)=>{
    setCurrentPage(page);
}





  function calculateItemsPerPage() {
    if(window.innerWidth>1440){
           return 3;
    }
    else if(window.innerWidth>640){
        return 2;
    }
    else{
      return 1;
    }
    // return window.innerWidth < 768 ? 1 : 3; // Adjust as needed
  }

  const autoclosepop = (id)=>{
    handleActive(id)
    onClose(onClose)
  }

  // Update itemsPerPage when the window size changes
  useEffect(() => {
    function handleResize() {
      setItemsPerPage(calculateItemsPerPage());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [itemsPerPage]);

  const handleAdd=()=>{
    Navigate(`/JobPost/${id}`);
  }


  const[avatarname,setavatarname] = useState('');
      const[trimmedname,settrimmedname] = useState('');
      const[companybanner,setcompanyBanner] = useState('');



useEffect(() => {
  async function fetchData() {
    try {
      const response = await api.get(`/getDetailsByID/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
        credentials: 'include',
      });


      if (response.status === 200) {
        const { userData } = response.data;
setavatarname(userData.email);
settrimmedname(avatarname.replace(/@gmail.com$/, "").replace(/\d/g, ''));
setcompanyBanner(userData.image);
       
       
      } else {
      }
    } catch (error) {
    }
  }

  fetchData(); // Call the fetchData function

  // Specify dependencies for the useEffect hook (e.g., id, apiBaseUrl)
}, [id,avatarname]);

const logout=async()=>{
  try {
    const response = await fetch(`${Backend_Url}/0auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
   
    
    

    
        Navigate(`/login`)
      

    
  } catch (error) {
  }
};


  
  return (
    <div>
       <div className='flex  '>
       <div className=" text-white  hidden md:flex sm:h-[95vmin] sm:w-[30vmin]  pt-3 px-3 bg-[#1c1c1c] opacity-90 relative"  >
              <div  className='flex flex-col items-start gap-5'>
                <div className='flex gap-2 items-center'>
                        <Avatar name={trimmedname} size={'md'} />
                        <p className=' cursor-pointer'>{trimmedname}</p>
                </div>
                <div className='flex flex-col items-start gap-3   '>
             
                    <div
                        className={` ${Active==0?'text-white':'text-white'} bg-${Active==1?'white opacity-70':''} rounded-${Active==1?'xl':''} pl-2 pr-4 flex justify-between  gap-1 items-center py-2 w-36 md:w-32    `}
                        onClick={()=>handleActive(0)}
                        >
                          <RiHandbagFill size={'25'} />
                         
                         <p className={`  text-sm  cursor-pointer text-right`}>Assignments</p>      
                    </div>
                    
                    <div
                        className={` ${Active==2?'text-black':'text-white'} bg-${Active==2?'white opacity-70 ':'' } rounded-${Active==2?'xl':''}  pl-2 pr-7 flex justify-between gap-2 items-center py-2 w-36 md:w-32    `}
                        onClick={()=>handleActive(2)}
                        >
                          <BiCheck size={'25'}/>
                         <p className={`  text-sm  cursor-pointer text-right`}>Assigned</p>      
                    </div>
                    <div
                        className={` ${Active==5?'text-black':'text-white'} bg-${Active==5?'white opacity-70 ':''  } rounded-${Active==5?'xl':''} pl-2 pr-7 flex justify-between gap-2 items-center py-2 w-36 md:w-32    `}
                        onClick={()=>handleActive(5)}
                        >
                         <BiCheckCircle size={'25'}/>
                         
                         <p className={`  text-sm  cursor-pointer text-right`}>Complete</p>      
                    </div>
                    <div
                        className={` ${Active==3?'text-black':'text-white'} bg-${Active==3?'white opacity-70 ':''} rounded-${Active==3?'xl':''}  pl-2 pr-7 flex justify-between gap-2 items-center py-2 w-36 md:w-32    `}
                        onClick={()=>handleActive(3)}
                        >
                         <BiCog size={'25'}/>
                         <p className={`  text-sm  cursor-pointer text-right`}>Setting</p>      
                    </div>
                    <div
                        className={` ${Active==4?'text-black':'text-white'} bg-${Active==4?'white opacity-70 ':'' } rounded-${Active==4?'xl':''}  cursor-pointer pl-2 pr-7 flex justify-between gap-2 items-center py-2 w-36 md:w-32 text-right   `}
                        onClick={()=>handleAdd()}
                        >
                        <FiFilePlus size={'25'}/> 
                         <p className={`  text-sm  cursor-pointer text-right`}>Add Job</p>      
                    </div>
                    
                    
                   
                </div>
               
              </div>
              

              

           </div>
           <div className='absolute block md:hidden   '>
          <div className='w-10 md:hidden flex '>
			      <span className='w-12  ' href="index.html"> 


            <Avatar bg={'#1c1c1c'} textColor="white" style={{
    animation:"glow 1s infinite alternate"
  }}  name={trimmedname} src="https://example.com/jane.jpg" size={'md'}onClick={onOpen}  m={'4'}/>
  <style>
    {`
      @keyframes glow{
        0%{ 
        transform:scale(.9)
        }
        100%{ 
        transform:scale(1.1)

      }
    
    `}
  </style>


  <Drawer isOpen={isOpen} placement={'top'} onClose={onClose} size={'xl'}  >
<DrawerOverlay >
    <DrawerContent>
        <DrawerCloseButton color={'black'}/>
        <DrawerHeader bg={'whiteAlpha.600'} shadow={'md'} textColor={'black'}>{trimmedname}</DrawerHeader>
<DrawerBody bg={'whiteAlpha.300'}  my={'16'} >
    <VStack spacing={'4'} align="stretch" alignItems={'center'}>
    <FaHospitalUser size={'45'} color="#1c1c1c"/>
     <Text fontWeight={'bold'} letterSpacing={'widest'}>Profile</Text>
    <Button w={'50%'} bg={'none'} textColor={'black'}  border={'1px solid'}   onClick={()=>autoclosepop(0)}>Assignment</Button>
    <Button w={'50%'} bg={'none'} textColor={'black'}  border={'1px solid'}   onClick={()=>autoclosepop(2)}>Assigned</Button>
    <Button w={'50%'} bg={'none'} textColor={'black'}  border={'1px solid'}   onClick={()=>autoclosepop(5)}>Complete</Button>
    <Button w={'50%'} bg={'none'} textColor={'black'}  border={'1px solid'}   onClick={()=>autoclosepop(3)}>Settings</Button>
    <Button w={'50%'} bg={'none'} textColor={'black'}  border={'1px solid'}   onClick={()=>handleAdd()}>Add job</Button>
  
 
    
    </VStack>
</DrawerBody>
<DrawerFooter > 
           <Link to={'/logout'}>
            <Button bg={'#1c1c1c'}  textColor="white" onClick={()=>{logout()}}>Log out</Button>
           </Link>
          </DrawerFooter>
    </DrawerContent>
</DrawerOverlay>
    </Drawer>
         
            

   
            </span>

                  </div>
                   

                        

           </div>
           
           <DashBoardHireRight Active={Active}/>
       </div>

    </div>
  )
}

export default DashBoradProfileHire
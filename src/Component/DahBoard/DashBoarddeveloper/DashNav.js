import React, { useState , useEffect } from 'react';
import { useNavigate , Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Backend_Url } from '../../../Path.js';
import {BiMenuAltLeft,BiWindowClose,BiAtom, BiHome, BiUserPlus, BiMoney, BiCoinStack, BiCoin, BiUserCheck, BiNotification, BiPodcast, BiNotificationOff, BiMessageAdd, BiRadio, BiSpeaker, BiMailSend} from 'react-icons/bi'
import { Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,Button,useDisclosure,VStack,Flex ,DrawerFooter, Avatar, HStack, Text, MenuButton, MenuList, MenuItem, Menu } from '@chakra-ui/react';
import api from '../../../Utils/api.js';
import DashBoardright from './DashBoardright';
import { FaBlogger } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';

const NavBar = () => {
  const Role=localStorage.getItem('role');
  
      const [open, setOpen] = useState(0);
      const Navigate =useNavigate();
      const[avatarname,setavatarname] = useState('');
      const[trimmedname,settrimmedname] = useState('');
      const {isOpen , onOpen , onClose}=useDisclosure();
      let uid;

      const handleOpen = (id) =>{
      
        
        setOpen(id);
      } 
      const handleClose = () => setOpen(0);
      const{id}=useParams();
        
      const logout=async()=>{
        try {
          const response = await fetch(`${Backend_Url}/0auth/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
         
          
          

          
              Navigate(`/`)
            

          
        } catch (error) {
         
        }
      };

  let token = Cookies.get('accessToken');
  // let token =localStorage.getItem('accessToken');


 const handleDashboard=async()=>{
      try {
          const response = await fetch(`${Backend_Url}/0auth/getidOfDeveloper`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
         
         
      
          // If using React Router
          // history.push({ search: params.toString() });
      
          // If not using React Router
       
          const { id ,role } = await response.json();
          if (id) {
            uid = id;
     
            
            if(role=='Hire'){
              Navigate(`/HireProfile/${uid}`)
            }
            else{
              Navigate(`/DeveloperProfile/${uid}`)
            }

          }
        } catch (error) {
  
        }
      };

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
   
             
             
            } else {
           
            }
          } catch (error) {
        
          }
        }
      
        fetchData(); // Call the fetchData function
      
        // Specify dependencies for the useEffect hook (e.g., id, apiBaseUrl)
      }, [id,avatarname]);
 

  const handleProfile=()=>{
    handleDashboard();
    onClose(onClose);

  }
  
     

      

  return (
      <div className=' px-6 py-3  bg-[#E6F7FF] shadow-md static top-0'>

      
    <div className='   hidden md:flex justify-between text-black font-bold ' >
         <Link className='text-black hover:text-slate-600' to='/'>Home</Link>
         <div className='flex  gap-5 pr-4'>
         {token!=null && Role!='Hire' &&
              <Link to={`/walletDeveloper/${id}`} className='text-black hover:text-slate-600'>Balance</Link>
              
              }
         
              <Link to={`/Notification/${id}`} className='text-black hover:text-slate-600'>Notification</Link>
              
              
            
              <Link to="/contactUs" className='text-black hover:text-slate-600'>Contact Us</Link>
              
              
            
           
            <Link to="/allBlogs" className='text-black hover:text-slate-600'>Blogs</Link>
             
            {token==null &&
               <Link to='/login' className='text-black hover:text-slate-600'>Login</Link>

            }
           { token ==null && 
             
              <Link to='/Register' className='text-black hover:text-slate-600'> Register</Link>
              }
              { token !=null && <p className=' cursor-pointer  hover:text-slate-600'
                onClick={()=>handleDashboard()}
              >
              Profile
                        
              </p>}
              {
                token !=null && <Menu>
                <MenuButton mt={'-2'} as={Button} rightIcon={<MdLogout />} variant={'ghost'}>
                  Logout
                </MenuButton>
                <MenuList>
                  <MenuItem  onClick={() => logout()}        >Logout Profile</MenuItem>
                  <MenuItem >Cancel</MenuItem>
                </MenuList>
              </Menu>
              }
      </div>
      </div>
       {/* phone resoponsive */}
       <div className='md:hidden flex justify-between m-1  '>
			<div className=" flex  justify-end  " >
                        <div className='flex items-center' onClick={onOpen}>
                                         <BiMenuAltLeft size={'25'} color="black" />
                        </div>
                        <Drawer isOpen={isOpen} placement={'left'} onClose={onClose}  >
<DrawerOverlay >
    <DrawerContent>
        <DrawerCloseButton color={'black'}/>
        <DrawerHeader bg={'whiteAlpha.600'} shadow={'md'} textColor={'white'}><Text textColor={'black'}>🆂🅷🅾🆆🆁🅸🆃🆈</Text></DrawerHeader>
<DrawerBody bg={'whiteAlpha.300'} >
    <VStack spacing={'3'} align="stretch">
     <Button w={'-webkit-fit-content'}textColor={'black'} variant={'ghost'} onClick={onClose} >
     <Link to={'/'}>  <Flex alignItems="center">
       
     <HStack w={'full'} spacing={'4'}>
       <BiHome color='#64CCC5' size={'25'}/>
        <Text color='#053B50'>Home</Text>
       </HStack>
      </Flex></Link>
     </Button>
     {Role!='Hire' && <Button w={'-webkit-fit-content'} textColor={'black'} variant={'solid'} onClick={onClose} bg={'none'}>
     <Link to={`/walletDeveloper/${id}`}>
     <Flex alignItems="center">
     <HStack w={'full'} spacing={'4'}>
       <BiCoin color='#64CCC5' size={'25'}/>
        <Text color='#053B50'>balance</Text>
       </HStack>    
   
      </Flex>
     </Link>
     </Button>}
     
     <Button w={'-webkit-fit-content'}textColor={'black'}variant={'ghost'} onClick={handleProfile} >
       <Flex alignItems="center">
     
     <HStack w={'full'} spacing={'4'}>
       <BiUserCheck color='#64CCC5' size={'25'}/>
        <Text color='#053B50'>Profile</Text>
       </HStack>
      </Flex>
     </Button>
     <Button w={'-webkit-fit-content'} textColor={'black'} variant={'ghost'} onClick={onClose}>
     <Link to={`/Notification/${id}`}>
     <Flex alignItems="center">
        
     <HStack w={'full'} spacing={'4'}>
       <BiMessageAdd color='#64CCC5' size={'25'}/>
        <Text color='#053B50'>Notification</Text>
       </HStack>
      </Flex>
     </Link>
     </Button>
     <Button w={'-webkit-fit-content'}textColor={'black'}variant={'ghost'} onClick={onClose} >
     <Link to={'/contactUs'}><Flex alignItems="center">
       
     <HStack w={'full'} spacing={'4'}>
       <BiMailSend color='#64CCC5' size={'25'}/>
        <Text color='#053B50'>Contact us</Text>
       </HStack>
      </Flex></Link>
     </Button>
     <Button w={'-webkit-fit-content'}textColor={'black'}variant={'ghost'} onClick={onClose} >
     <Link to={'/allBlogs'}>  <Flex alignItems="center">
     
     <HStack w={'full'} spacing={'4'}>
       <FaBlogger color='#64CCC5' size={'25'}/>
        <Text color='#053B50'>Blogs</Text>
       </HStack>
      </Flex></Link>
     </Button>
    
    </VStack>
</DrawerBody>
<DrawerFooter bg={'cyan.900'}> 
          
            <Button bg={'#64CCC5'}  onClick={()=>{logout()}}>Log out</Button>
           
          </DrawerFooter>
    </DrawerContent>
</DrawerOverlay>
    </Drawer>
      
      
                                                     
                       

     
			</div>
          
{/* for mobile  */}
            

		</div>
         

    </div>
    
  )
}

export default NavBar
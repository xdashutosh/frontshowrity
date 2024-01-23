import React, { useState , useEffect } from 'react';
import { useNavigate , Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Backend_Url } from '../../../Path.js';
import {BiMenuAltLeft,BiWindowClose,BiAtom, BiHome, BiCoin, BiUserCheck, BiMessageAdd, BiMailSend} from 'react-icons/bi'
import { Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,Button,useDisclosure,VStack,Flex ,DrawerFooter, Avatar, Text, HStack, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import api from '../../../Utils/api.js';
import { FaBlogger } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
// import DashBoardright from './DashBoardright';

const NavBar = () => {
  
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




      const handleProfile=()=>{
        handleDashboard();
        onClose(onClose);
    
      }


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
 

  
  
     

      

  return (
      <div className=' px-6 py-3  bg-white shadow-lg static top-0'>

      
    <div className='    hidden md:flex justify-between text-black font-bold ' >
         <p className=' cursor-pointer hover:text-white'><Link className='text-black hover:text-slate-600' to='/'>Home</Link></p>
         <div className='flex  gap-5 pr-4'>
        
         <p className=' cursor-pointer hover:text-white'>
              <Link to={`/Notification/${id}`} className='text-black hover:text-slate-600'>Notification</Link>
              
              </p>
            
              <Link to="/contactUs" className='text-black hover:text-slate-600'>Contact Us</Link>
              
              
            
            
            <Link to="/allblogs" className='text-black hover:text-slate-600'>Blogs</Link>
              
            {token==null &&
               <Link to='/login' className='text-black hover:text-slate-600'>Login</Link>

            }
           { token ==null && 
             
              <Link to='/Register' className='text-black hover:text-slate-600'> Register</Link>
              }
              { token !=null && <p className=' cursor-pointer hover:text-slate-600'
                onClick={()=>handleDashboard()}
              >
              Profile
                        
              </p>}
              {
                token !=null &&<Menu>
                <MenuButton mt={'-2'} as={Button} variant={'ghost'} rightIcon={<MdLogout />}>
                  Logout
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => {
                                       logout();
                                      }}>Logout Profile</MenuItem>
                  <MenuItem >Cancel</MenuItem>
                </MenuList>
              </Menu>
              }
      </div>
      </div>
       {/* phone resoponsive */}
         <div className='md:hidden flex justify-between  '>
			<div className=" flex  justify-end  " >
                        <div className='flex items-center' onClick={onOpen}>
                                         <BiMenuAltLeft size={'25'} />
                        </div>
                        <Drawer isOpen={isOpen} placement={'left'} onClose={onClose}>
<DrawerOverlay >
    <DrawerContent>
        <DrawerCloseButton color={'black'}/>
        <DrawerHeader bg={'whiteAlpha.600'} shadow={'md'} textColor={'white'}><Text textColor={'black'}>Showrity</Text></DrawerHeader>
<DrawerBody bg={'whiteAlpha.300'} >
    <VStack spacing={'3'} align="stretch">

    <Button w={'-webkit-fit-content'}textColor={'black'} variant={'ghost'} onClick={onClose} >
     <Link to={'/'}>  <Flex alignItems="center">
       
     <HStack w={'full'} spacing={'4'}>
       <BiHome color='#1c1c1c' size={'25'}/>
        <Text color='#053B50'>Home</Text>
       </HStack>
      </Flex></Link>
     </Button>

     
    
     <Button w={'-webkit-fit-content'}textColor={'black'}variant={'ghost'} onClick={handleProfile} >
        <Flex alignItems="center">
      
      <HStack w={'full'} spacing={'4'}>
        <BiUserCheck color='#1c1c1c' size={'25'}/>
          <Text color='#053B50'>Profile</Text>
        </HStack>
        </Flex>
     </Button>
     <Button w={'-webkit-fit-content'} textColor={'black'} variant={'ghost'} onClick={onClose}>
      <Link to={`/Notification/${id}`}>
      <Flex alignItems="center">
          
      <HStack w={'full'} spacing={'4'}>
        <BiMessageAdd color='#1c1c1c' size={'25'}/>
          <Text color='#053B50'>Notification</Text>
        </HStack>
        </Flex>
      </Link>
     </Button>
     <Button w={'-webkit-fit-content'}textColor={'black'} variant={'ghost'} onClick={onClose} >
     <Link to={'/contactUs'}><Flex alignItems="center">
       
     <HStack w={'full'} spacing={'4'}>
       <BiMailSend color='#1c1c1c' size={'25'}/>
        <Text color='#053B50'>Contact us</Text>
       </HStack>
      </Flex></Link>
     </Button>
     <Button w={'-webkit-fit-content'}textColor={'black'}variant={'ghost'} onClick={onClose} >
     <Link to={'/allblogs'}>  <Flex alignItems="center">
     
     <HStack w={'full'} spacing={'4'}>
       <FaBlogger color='#1c1c1c' size={'25'}/>
        <Text color='#053B50'>Blogs</Text>
       </HStack>
      </Flex></Link>
     </Button>
    
    </VStack>
</DrawerBody>
<DrawerFooter > 
           
<Menu>
  <MenuButton mt={'-2'} bgColor="#1c1c1c" textColor="white" as={Button} rightIcon={<MdLogout />}>
    Logout
  </MenuButton>
  <MenuList>
    <MenuItem onClick={() => {
                         logout();
                        }}>Logout Profile</MenuItem>
    <MenuItem >Cancel</MenuItem>
  </MenuList>
</Menu>
           
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
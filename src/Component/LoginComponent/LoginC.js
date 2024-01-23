











import { Box, Button, Card, CardBody, CardFooter, FormControl, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect } from 'react';
import LoginGoogle from '../../Googleauth/LoginGoogle';
import hustleimg  from '../../images/hustlelogodark.png';
import { Link, useNavigate } from 'react-router-dom';

import { Backend_Url } from '../../Path';

import { useToast } from '@chakra-ui/react'
import { FaBackward, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginC  = () => {

    const images = [
      "https://raw.githubusercontent.com/oragetech/assests/main/DALL%C2%B7E%202024-01-05%2019.26.50%20-%20Design%20a%20captivating%20banner%20for%20a%20job%20providing%20company%20named%20'Hustle%20for%20Work'.%20The%20banner%20should%20encapsulate%20the%20essence%20of%20a%20dynamic%20and%20progressiv.png?token=GHSAT0AAAAAACMLYPRN6XMSJ6END4TZRS4CZMYB3CA"
      ];
    
      
    


   const [username, setusername] = useState('');
   const[password,setPassword]=useState('');
   const [error, setError] = useState(null);
   const [hidepass,sethidepass] = useState('password');         
   const Navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
 
    // window.location.href = 'https://www.paypal.com/paypalme/oragepayments?country.x=IN&locale.x=en_GB';

    
    try {
      // console.log(Backend_Url);
        const response = await fetch(`${Backend_Url}/0auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password  }),
          credentials: 'include',
        });
     
        
      const {userExists ,userVerified , uid , accessToken ,role } = await response.json();
      
      if(userExists==false){
         
        showToast('Invalid Credentials','error');
        

      }
      if (response.ok) {
     
  // const expiredate=new Date();
  //  expiredate.setDate(expiredate.getDate()+1);
  //       setCookie('accessToken',accessToken,{expires: expiredate});
  showToast('Login in SuccessFully','success');
       
         if(userVerified ==false){
            Navigate(`/otp/${uid}`);
            return;
        }
        else{

        
              
              // localStorage.setItem('accessToken',accessToken);
             if(role=='Hire'){
                localStorage.setItem('role','Hire');
                // Navigate(`/DashBoard/Hire/${uid}`);
                Navigate(`/`);

             }
             else{
                localStorage.setItem('role','Developer');
                // Navigate(`/DashBoard/Developer/${uid}`);
                Navigate(`/`);
             }

              
        }
  
        
        
        // Authentication successful, you can redirect or perform other actions here
      
      } else if (response.status==401) {
        // const {userExists ,userVerified , uid } = await response.data;
        // console.log(uid);
        showToast('Invalid Credentials','error');
        // Navigate(`/otp/${uid}`);
        return;
        
      }
    } catch (error) {
    
      setError('An error occurred while processing your request');
    }
  };
  const toast = useToast();
  const showToast = (text,color) => {
    toast({
      title: text,
      position: 'top',
      isClosable: true,
      status:color,
      
    })
  };




  return (
    <section>
<Heading m={'4'} w={'full'} textAlign={'left'} >
 <Link to="/">
 <FaBackward color='#1c1c1c'/>
 </Link> 
  </Heading>
<HStack  h={'80vh'} m={'4'} justifyContent={'center'} alignItems={'center'}>
    <Card m={['0','8']}
    
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    shadow={'lg'}
    mt={['15vh','20vh']}
    
    >
    <Image
      objectFit='Center'
      maxW={{ base: '0%', sm: '35vw' }}
      minH={{ base: '0vh', sm: '50vh' }}
      src={images[0]}
      alt='Caffe Latte'
     
      
      
      />
  
    <Stack>

      <CardBody>
      <VStack
      
       w={['full','20vw']}
      >
           <form className="w-full" onSubmit={handleSubmit} >
        <VStack spacing={2} w={'full'}>
        <Box  h="auto">
      <Image src={hustleimg} alt="Example" />
    </Box>
       <Text >Welcome to Showrity</Text>
       <VStack mt={'16'} spacing={'4'} w={'full'}>

          <FormControl id="email" >
            <Input placeholder="Email Address"  onChange={(e)=>setusername(e.target.value)}  required={true}/>
          </FormControl>

          <FormControl id="password" >
          <HStack>
            <Input placeholder="password"  value={password} onChange={(e)=>setPassword(e.target.value)}
                         type={hidepass} required={true} />
                       {
                         hidepass==="password"?<FaEyeSlash onClick={()=>{return(sethidepass('text') )}}/>:<FaEye onClick={()=>{sethidepass('password')}}/>
                        }
                        </HStack>
          </FormControl>
          <Button
            bgColor="#1c1c1c"
            w="full"
            size={[ 'md' ,'lg']}
            textColor={'white'}
            type="submit"
            variant={'outlined'}
            >
            Login
          </Button>
              </VStack>
         
        </VStack>
              </form>
      </VStack>
      <CardFooter>
        <VStack w={'full'} alignItems={'center'}>
                            <Link
                        to="/forgetPassword"
                        className="text-xs text-[#053B50] hover:underline"
                       >                       Forget Password?
</Link>
                  <Text className='text-gray-700'>
                     Don't have an account?
                    <Link
                        to="/Register"
                        
                        className="font-medium  m-1 text-[#1c1c1c] hover:underline"
                        >
                        Sign up
                     </Link>
               
                          </Text> 
               
             
                <LoginGoogle />
                          </VStack>
          


      </CardFooter>
      </CardBody>
    </Stack>
  </Card>
              </HStack>
      </section>
  )
}

export default LoginC

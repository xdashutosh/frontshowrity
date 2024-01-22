import React, { useState } from 'react'
import { Backend_Url } from '../../Path';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Input, Text, VStack } from '@chakra-ui/react';


const ForgetPasswordP = () => {

  const [Email, setEmail] = useState();
  const Navigate=useNavigate();

  const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
              const response = await fetch(`${Backend_Url}/0auth/forgetPassword`, {

                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: Email }),
              });

              const{userExists , uid}=await response.json();
           
              if(userExists===false){
                window.alert("this email is not exist in database");
                return;
              }
              else{
                Navigate(`/otpForget/${uid}`);
              }
             
        }
        catch(err){
        }
  }


  return (
    // <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
    //         <div className=" p-6 m-auto border-1 rounded-md  lg:max-w-xl ">
    //             <h1 className="text-3xl font-semibold text-center text-[#176B87] ">
    //                Enter The Email
    //             </h1>
    //             <form className="mt-6" onSubmit={handleSubmit}>
    //                 <div className="mb-2">
    //                     <label
    //                         for="email"
    //                         className="text-left ml-4 block text-sm font-semibold text-gray-800"
    //                     >
    //                         Email 
    //                     </label>
    //                     <input
    //                         onChange={(e)=>setEmail(e.target.value)}
    //                         className="  block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                            
    //                     />
    //                 </div>
                    
    //                 <a
    //                     href="/login"
    //                     className="text-xs text-[#053B50] hover:underline"
    //                 >
    //                     Login
    //                 </a>
    //                 <div className="mt-6">
    //                     <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#053B50] rounded-md hover:bg-[#053B50] focus:outline-none focus:bg-[#053B50]">
    //                         submit
    //                     </button>
    //                 </div>
    //             </form>

    //             <p className="mt-8 text-xs font-light text-center text-gray-700">
    //                 {" "}
    //                 Don't have an account?{" "}
    //                 <a
    //                     href="/Register"
    //                     className="font-medium text-[#053B50] hover:underline"
    //                 >
    //                     Sign up
    //                 </a>
    //             </p>
       
    //         </div>
    // </div>
    <Center h="100vh">
    <Box w="sm" p={8} boxShadow="md" borderRadius="lg">
      <VStack spacing={4}>
        <Center>
          {/* Replace this text with the actual icon */}
          <Text fontSize="4xl">📨</Text>
        </Center>
        <Text fontSize="md" textAlign="center">
          Enter your email address to Reset
        </Text>
        <Text fontSize="sm" textAlign="center" color="gray.500">
          We will send a 6-digit OTP 
        </Text>

        <form onSubmit={handleSubmit}>
            <label for="email"/>
        <Input
          placeholder="Email address"
          type='email'
          onChange={(e)=>setEmail(e.target.value)}
          size="lg"
          />
        <Button mt={'4'}  bgColor={"#1c1c1c"} textColor={'white'} w="full" type='submit'>
          Continue
        </Button>
          </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
                
                    Don't have an account?
                    <a
                        href="/Register"
                        className="font-medium text-[#053B50] hover:underline"
                   >
                       Sign up
                </a>
        </p>
       
      </VStack>
    </Box>
  </Center>
  )
}

export default ForgetPasswordP
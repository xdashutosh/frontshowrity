import React, { useState } from 'react'
import { Backend_Url } from '../../Path';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Center, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react';

const OtpForget = () => {
  const [err, setError] = useState('')
  const [Otp, setOtp] = useState('');
  const[sendOtp , setsendOtp]=useState(false);
  
  const { id } = useParams();

  const Navigate=useNavigate();
  


  const handleSubmit = async (e) => {
      e.preventDefault();


      
  
      try {
        const response = await fetch(`${Backend_Url}/0auth/verifyOtp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ otp: Otp, userId : id }),
        });
   const {otpExpired , otpValid ,role } = await response.json();
   
       if (otpValid ) {
         
          
          if(otpExpired){
            showToast('Otp expired','error');
          }
          else{
          //Navigate with id 
          showToast(' Otp verified','success');
            Navigate(`/SetPassword/${id}`)
           
            
           
          }
    
          
          
          // Authentication successful, you can redirect or perform other actions here
          
        } else {
          // Authentication failed, handle the error
          showToast('Invalid Otp','error');
          setError('Invalid otp');
        }
      } catch (error) {
    
        setError('An error occurred while processing otp verification');
      }
    };

  const handleResend= async()=>{


    try{
      const response = await fetch(`${Backend_Url}/0auth/resendOtp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId : id }),
      });
     

      if(response.ok){
        const {userVerified , otpResent } = await response.json();
         if(otpResent==false){
          Navigate('/NotaRegisterUser');
         }
         else{
          //  setsendOtp(true);
          //  setTimeout(() => {
          //    setsendOtp(false);
          //  }, 2000);
          showToast('Otp sended','success');
         }

      }

    }
    catch (error) {

      setError('An error occurred while send the otp');
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

return (
  // <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
  //           <div className="w-full p-6 m-auto bg-white rounded-md  border-1 lg:max-w-xl ">
  //               <h1 className="text-3xl font-semibold text-center text-[#176B87] underline">
  //                  Enter your Otp
  //               </h1>
  //               <form className="mt-6" onSubmit={handleSubmit}>
  //                   <div className="mb-2">
  //                       <label
                            
  //                           className="text-left ml-4 block text-sm font-semibold text-gray-800"
  //                       >
  //                          type otp sent in your mail
  //                       </label>
  //                       <input
  //                           onChange={(e)=>setOtp(e.target.value)}
  //                           className="  block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                            
  //                       />
  //                   </div>
  //                   <div className="mt-6">
  //                       <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#053B50] rounded-md hover:bg-[#053B50] focus:outline-none focus:bg-[#053B50]">
  //                           Enter
  //                       </button>
  //                   </div>
                    
                    
  //               </form>
  //               <div className='flex justify-center my-3 cursor-pointer'>
  //                 <HStack>
  //               <Text fontSize={'sm'}>not received?</Text>
  //                  <Button bg={'none'} border={'1px solid'} onClick={()=>handleResend()}>Resend</Button>
  //                 </HStack>

  //               </div>
                

                
            
  //           </div>
  //       </div>
  <Center h="100vh">
  <Box w="sm" p={8} boxShadow="md" borderRadius="lg">
    <VStack spacing={4}>
      <Center>
        {/* Replace this text with the actual icon */}
        <Text fontSize="4xl">📱</Text>
      </Center>
      <Text fontSize="md" textAlign="center">
        Enter your code
      </Text>
      <Text fontSize="sm" textAlign="center" color="gray.500">
        We sent a 6-digit OTP 
      </Text>
      <Input
        placeholder="OTP"
        type='number'
        onChange={(e)=>setOtp(e.target.value)}
        size="lg"
      />
      <Button bgColor={"#1c1c1c"} textColor={'white'} w="full" onClick={handleSubmit}>
        Continue
      </Button>
      <Button variant="link" w="full" onClick={handleResend}>
        Resend
      </Button>
     
    </VStack>
  </Box>
</Center>
)
}

export default OtpForget
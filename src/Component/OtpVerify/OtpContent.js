
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Backend_Url } from '../../Path';
import { Box, Button, Center, HStack, Input, Text, VStack, useToast } from '@chakra-ui/react';


const OtpContent = () => {

  const [err, setError] = useState('')
    const [Otp, setOtp] = useState('');
  
    
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
        //  console.log(response.json()); 
         if (otpValid ) {
           
            
            if(otpExpired){
              showToast('Invalid expired','error');
            }
            else{
           
              if(role=="Developer"){
                  Navigate(`/DeveloperProfileForm/${id}`);
              }
              else{
                Navigate(`/HireProfileForm/${id}`)

              }
              
             
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

export default OtpContent






import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Backend_Url } from '../../Path';
import axios from 'axios';
import { HStack, Image, Text } from '@chakra-ui/react';

const AppliedUser_Project = ({data , amount}) => {
  
  const [details, setdetails] = useState([])
  const role=localStorage.getItem('role');
  // const firstpayment=10;
  const [firstPay, setfirstPay] = useState();
  const{id}=useParams();

  let projectId=id;

  const moneyamount=Number(amount);
  useEffect(() => {
    async function fetchFirstPay() {
      try {
        

        const response = await fetch(`${Backend_Url}/0auth/getFirstPay`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const result = await response.json();
        const nres=Number(result.firstpay);
     
        setfirstPay(nres);
      
     
 
      } catch (err) {
      
      }
    }

    fetchFirstPay();

    // Return a cleanup function
    return () => {
      
    };
  }, []);

  useEffect(() => {
 
    async function fetchData() {
      try {
        const response = await fetch(`${Backend_Url}/0auth/showDeveloperProfileById/${data}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
    
        const result = await response.json();

       
         
         setdetails(result[0])
        
         console.log(result[0]);
         
       
        
      } catch (err) {
     
      }
    }

    fetchData();

    // Return a cleanup function
    return () => {
      
    };
  }, []);


    const Navigate=useNavigate();
    const handleclick=()=>{
      
       Navigate(`/DeveloperProfile/${details.userId}`)
    }

    // const handleAssign=()=>{
    //   window.location.href = 'https://www.paypal.com/paypalme/oragepayments?country.x=IN&locale.x=en_GB';
    // }


  const checkoutHandler=async(amount)=>{
      const {data:{key}}=await axios.get(`${Backend_Url}/0auth/getrazerkey`);
      // const {data:{order}}=await axios.post("http://localhost:5000/0auth/checkout",{
      //   amount , userId:details.userId , 
      //  })
    
      const requestData = {
        amount,
        userId: details.userId,
        projectId,
      };
      const {data:{order}}= await axios.post(`${Backend_Url}/0auth/checkout`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Axios uses withCredentials for credentials
      });
      
  
       const options = {
        key, 
        amount: order.amount, 
        currency: "INR",
        name: "Orage Tech",
        description: "Test Transaction",
        image: "",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "https://hustleforwork.com:5000/0auth/paymentverification",
        prefill: {
            name: "Gaurav Gangola",
            email: "gaurav.gangola444@gmail.com",
            contact: "9810654125"
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#1c1c1c"
        }
    };
    const razor =  window.Razorpay(options);
   
    razor.open();
    
  }

    
    

  return (
    <div className='flex justify-center  '>
      
          
            <div className='flex gap-3'>
                  {role=='Hire'?
                  <HStack borderBottom={'1px'} px={'1'} >
                     <HStack w={['40vw','15vw']} spacing={'4'} p={'1'} rounded={'base'} justifyContent={'center'}>
                      {
                        details.image? <Image rounded={'full'} objectFit={'cover'} h={'8'} w={'8'} src={details?.image?.url} alt='profile'/>: <Image rounded={'full'} objectFit={'cover'} h={'8'} w={'8'} src={'https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg'} alt='profile'/>
                      }
                     
            <Text fontWeight={'bold'} w={'32'} >{details?.name}</Text>
            </HStack> 
                    <p className='text-white bg-[#64CCC5] px-2 py-1 rounded-lg cursor-pointer'
                onClick={()=>checkoutHandler((moneyamount/100)*10)}
                >Assign</p>
                <p className='text-white bg-[#1c1c1c] px-2 py-1 rounded-lg cursor-pointer'
                onClick={()=>handleclick()}
                >Check Profile</p>                
                </HStack>
                :<></>}
              
            </div>
            

       

    </div>
  )
}

export default AppliedUser_Project
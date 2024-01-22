import React, { useEffect, useState } from 'react'
import { Backend_Url } from '../../../Path';
import { Heading } from '@chakra-ui/react';

const CompletedProjectsCard = ({data}) => {
    const [UserDetails, setUserDetails] = useState({});
   
    useEffect(() => {
        let userID=data.userId;
        async function fetchData() {
          try {
            const response = await fetch(`${Backend_Url}/0auth/showDeveloperProfileById/${data.userId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
        
            const result = await response.json();
          
             
            setUserDetails(result);
           
            
          } catch (err) {
         
          }
        }
    
        fetchData();
    
        // Return a cleanup function
        return () => {
          // Perform any cleanup actions here if needed
        };
      }, []);

      const dateString = data?.createdAt;
    const date = new Date(dateString);

    const formattedDate = `${date.toLocaleDateString()}`;

    
 return (
<div className='  shadow-lg p-4 rounded-lg'>
    <div className='flex flex-col gap-1'>
       
    <div className='flex flex-col pl-1 gap-2'>
            <div className='flex justify-between mb-2 '>
                    <Heading className='font-bold font-sans'>{data?.companyName}</Heading> 
                    <p className='bg-[#1c1c1c] px-2 py-1 rounded-lg text-white font-bold'>
                        Completed
                    </p> 
                </div> 
                <p className='text-left text-slate-700 font-medium font-sans'>{data?.ProjectSummary.split(' ').slice(0, 15).join(' ')}</p>
                <p className='text-left text-slate-700 font-medium font-sans flex gap-2 items-center'>
                  <b>Completed on</b> &nbsp; {formattedDate} 
                </p>
                <p className='text-left text-slate-500 font-medium font-sans'><b>Money Paid</b> &nbsp; ${data?.ProjectMoney}</p>
                <p className='text-left text-slate-500 font-medium font-sans'><b>Completed By</b>&nbsp; {UserDetails[0]?.name}</p>
               
    </div>
        
    </div>
</div>
  )
}

export default CompletedProjectsCard
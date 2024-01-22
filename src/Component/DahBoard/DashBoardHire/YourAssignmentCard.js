import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading } from '@chakra-ui/react';

const YourAssignmentCard = ({data}) => {




  const Navigate=useNavigate();

  const handleclick=(id)=>{
     Navigate(`/ProjectDetails/${id}`)

  }

  return (
        <div className='  shadow-lg p-4 rounded-lg cursor-pointer  '
          onClick={()=>handleclick(data._id)}
        >
            <div className='flex flex-col gap-1'>
              
               <div className='flex flex-col pl-1 gap-2'>
                    <div className='flex justify-between mb-2 '>
                    <Heading className='font-bold font-sans w-[30%] text-[#1c1c1c]'>{data.companyName}</Heading>
                <p className=' px-2 py-1 rounded-lg text-orange-800 font-bold'>
                  <b className="text-[#1c1c1c]">Required Badge</b> {data.level}
                </p>
              </div>
              <p className='text-left text-slate-700 font-medium font-sans'>{data.ProjectSummary.split(' ').slice(0, 15).join(' ')}</p>
              <p className='text-left flex gap-2 items-center text-slate-500 font-medium font-sans'>
              <b>Estimated Time</b>{data.estimateTime} Days
              </p>
              <p className='text-left text-slate-500 font-medium font-sans'><b>Worrk Budget</b> &nbsp; ${data.ProjectMoney}</p>
               </div>
                
            </div>
        </div>
      )
  
}

export default YourAssignmentCard
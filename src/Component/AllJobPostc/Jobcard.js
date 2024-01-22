  import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';

const Jobcard = ({data}) => {

 
    const Navigate= useNavigate();
     const handleClick=()=>{
      Navigate(`/ProjectDetails/${data._id}`)
    
     }
      
     
     
    
    
      return (
        <div className='  shadow-lg p-4 rounded-lg w-5/6 sm:w-1/3 lg:w-1/4'>
        <div className='flex flex-col gap-1 cursor-pointer'
         onClick={()=>handleClick()}
        
        >
         
                                       <div className='flex flex-col pl-1 gap-2 mt-2'>
                                            <div className='flex justify-between mb-2 '>
                                                    <p className='font-bold font-sans text-3xl'>{data.companyName}</p> 
                                                    <p className='bg-orange-300 px-2 py-1 rounded-lg text-orange-800 font-bold'>
                                                        {data.level}
                                                    </p> 
                                                </div> 
                                                <p className='text-left text-slate-700 font-medium font-sans'><b>{data.technology}</b></p>
                                                <p className='text-left    text-slate-500 font-medium font-sans'>{data.ProjectSummary.split(' ').slice(0, 15).join(' ')}</p>
                                                <p className='text-left text-slate-400 font-medium font-sans'>
                                                <b>
                                                 Duration 
                                               </b>
                                                &nbsp;
                                                  {data.estimateTime} days
                                                </p>
                                                <p className='text-left text-slate-400 font-medium font-sans'><b>Project Budget</b> ${data.ProjectMoney}</p>
                                                
                                       </div>
            
        </div>
    </div>
  )
}

export default Jobcard
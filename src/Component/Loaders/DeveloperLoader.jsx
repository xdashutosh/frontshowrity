import {
    Box,
    HStack,
    Skeleton,
    SkeletonCircle,
    Stack
  
  } from "@chakra-ui/react";
  import React from "react";

  
  const DeveloperLoader = () => {
    return (
      <div className="flex flex-col mt-4 ">
           <p className='text-2xl text-black font-bold my-4'>All <span className='text-[#64CCC5]'>Developer's</span>  </p>
          <div className='flex  justify-center  gap-2'>
                            <input
                               placeholder='serach on technology'
                                
                                  className="  block  px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                                  
                              />
                              

                              
          </div>
          <div className='flex justify-center  gap-2'>
                            <input
                               placeholder='serach by name'
                                
                                  className="  block  px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                                  
                              />
                                          
          </div>
           <div className='mt-2 mb-3 w-1/4 flex justify-center mx-auto '
                               
                              >
                                  <p className='text-white bg-[#053B50] px-3 cursor-pointer  py-2 rounded-lg'>Search</p>

          </div>  
        <div className=" flex flex-col gap-4  sm:flex-row sm:flex-wrap">
        <div className="container w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/5 shadow-xl p-0  rounded-lg">
 <SkeletonCircle size='14' mb="4" />
  <Skeleton height="20px" w={"full"} />
              <Skeleton height="20px" w={"70%"} mt={"2"} mb="2" />
            <Skeleton h="20vh" w="full"></Skeleton>
            <Stack spacing={"4"}>
            </Stack>
          </div>
  
          <div className="container w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/5 shadow-xl p-0  rounded-lg">
 <SkeletonCircle size='14' mb="4" />
  <Skeleton height="20px" w={"full"} />
              <Skeleton height="20px" w={"70%"} mt={"2"} mb="2" />
            <Skeleton h="20vh" w="full"></Skeleton>
            <Stack spacing={"4"}>
            </Stack>
          </div>
  
          <div className="container w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/5 shadow-xl p-0  rounded-lg">
 <SkeletonCircle size='14' mb="4" />
  <Skeleton height="20px" w={"full"} />
              <Skeleton height="20px" w={"70%"} mt={"2"} mb="2" />
            <Skeleton h="20vh" w="full"></Skeleton>
            <Stack spacing={"4"}>
            </Stack>
          </div>
          <div className="container w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/5 shadow-xl p-0  rounded-lg">
 <SkeletonCircle size='14' mb="4" />
  <Skeleton height="20px" w={"full"} />
              <Skeleton height="20px" w={"70%"} mt={"2"} mb="2" />
            <Skeleton h="20vh" w="full"></Skeleton>
            <Stack spacing={"4"}>
            </Stack>
          </div>
        </div>
        <div className="flex justify-center   my-3 "></div>
      </div>
    );
  };
  
  export default DeveloperLoader;
  
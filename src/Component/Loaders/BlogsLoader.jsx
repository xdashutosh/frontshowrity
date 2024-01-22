import {
  Box,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const BlogsLoader = () => {
  return (
    <div className="flex flex-col mt-4 ">
      <p className="text-2xl text-black font-bold my-4">
        Some <span className="text-[#64CCC5]">Blogs </span>{" "}
      </p>
      <div className=" flex flex-col gap-4  sm:flex-row sm:flex-wrap">
        <div className="container w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/5 shadow-xl p-0  rounded-lg">
          <Skeleton h="20vh" w="full"></Skeleton>
          <Stack spacing={"4"}>
            <Skeleton height="20px" w={"full"} mt={"1"} />
            <Skeleton height="20px" w={"70%"} mt={"-1"} />

            <Skeleton height="20px" w={"full"} />
            <Skeleton height="20px" w={"full"} />

            <HStack w={"full"} justifyContent={"center"}>
              <Skeleton height="40px" w={"20%"} borderRadius={'xl'} mb={"4"} />
            </HStack>
          </Stack>
        </div>

        <div className="container w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/5 shadow-xl p-0  rounded-lg">
          <Skeleton h="20vh" w="full"></Skeleton>
          <Stack spacing={"4"}>
            <Skeleton height="20px" w={"full"} mt={"1"} />
            <Skeleton height="20px" w={"70%"} mt={"-1"} />

            <Skeleton height="20px" w={"full"} />
            <Skeleton height="20px" w={"full"} />

            <HStack w={"full"} justifyContent={"center"}>
              <Skeleton height="40px" w={"20%"} mb={"4"}  borderRadius={'xl'} />
            </HStack>
          </Stack>
        </div>

        <div className="container w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/5 shadow-xl p-0  rounded-lg">
          <Skeleton h="20vh" w="full"></Skeleton>
          <Stack spacing={"4"}>
            <Skeleton height="20px" w={"full"} mt={"1"} />
            <Skeleton height="20px" w={"70%"} mt={"-1"} />

            <Skeleton height="20px" w={"full"} />
            <Skeleton height="20px" w={"full"} />

            <HStack w={"full"} justifyContent={"center"}>
              <Skeleton height="40px" w={"20%"} mb={"4"}  borderRadius={'xl'} />
            </HStack>
          </Stack>
        </div>

        <div className="container w-3/4 sm:w-1/2 md:w-2/5 lg:w-1/5 shadow-xl p-0  rounded-lg">
          <Skeleton h="20vh" w="full"></Skeleton>
          <Stack spacing={"4"}>
            <Skeleton height="20px" w={"full"} mt={"1"} />
            <Skeleton height="20px" w={"70%"} mt={"-1"} />

            <Skeleton height="20px" w={"full"} />
            <Skeleton height="20px" w={"full"} />

            <HStack w={"full"} justifyContent={"center"}>
              <Skeleton height="40px" w={"20%"} mb={"4"}  borderRadius={'xl'} />
            </HStack>
          </Stack>
        </div>
      </div>
      <div className="flex justify-center   my-3 "></div>
    </div>
  );
};

export default BlogsLoader;

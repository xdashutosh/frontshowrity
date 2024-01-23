import React, { useEffect, useState } from "react";
import NavBar from "../Component/NavBar";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import SellerCard from "../Component/SellerCard";

import Client from "../Component/Client";
import Blog from "../Component/Blog/Blog";
import { Backend_Url } from "../Path.js";
import { Link, useNavigate } from "react-router-dom";
import api from "../Utils/api";
import config from "../Config";
import imgvid from "../images/vid.mp4";
import {
  HStack,
  Stack,
  useDisclosure,
  Button,
  VStack,
  Image,
  Heading,
  Text,
  Card,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import { getCookie } from "../Utils/getCookies";
import ImageSlider from "../Component/SliderC/ImageSlider";
import Carousel from "../Component/Carosouls/Carousel";
import Attention from "../Component/Attention/Attention.jsx";
import HeaderDev from "../Component/HeaderDev.jsx";
import Headerhire from "../Component/Headerhire.jsx";

const Home = () => {
  const [data, setdata] = useState([]);
  const [isdev, setisdev] = useState(null);

  const [result, setResult] = useState(null); // Initialize result as null

  let myrole = "";
  const Navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const apiBaseUrl = config.API_BASE_URL;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${Backend_Url}/0auth/ShowAllDeveloperProfile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const resultData = await response.json();
        const limitedResult = resultData.slice(0, 8);

        setResult(limitedResult);
        onOpen(onOpen);
        // setResult(resultData); // Update the result state when data is available
      } catch (err) {}
    }

    fetchData();

    // Return a cleanup function
    return () => {
      // Cleanup code here (if needed)
    };
  }, []);

  useEffect(() => {
    if (result !== null) {
      // Now you can access and set data when result is available
      setdata(result);
    }
  }, [result]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${Backend_Url}/0auth/refresh/${435789}}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
      } catch (error) {}
    }

    fetchData();

    return () => {};
  }, []);

  useEffect(() => {
    const Getmyrole = async () => {
      try {
        const response = await fetch(`${Backend_Url}/0auth/getidOfDeveloper`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const { id, role } = await response.json();
        myrole = role;
        if (role == "Developer" && token) {
          setisdev(true);
          Navigate(`/freelancer`);
        }
        if (role != "Developer" && token) {
          Navigate(`/hire`);
        }
      } catch (error) {}
    };

    Getmyrole();

    return () => {};
  }, [myrole]);

  const token = getCookie("accessToken");

  if (token) {
    return;
  }
  return (
    <div className="relative bg-[#E8F8F5]">
      <NavBar />

      <Header />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={["sm", "sm", "2xl"]}
      >
        <ModalOverlay />

        <ModalContent h={"60vh"}>
          <ModalCloseButton />
          <Stack
            w={["", "full"]}
            h={["", "full"]}
            direction={["column", "column", "row"]}
            spacing={"0"}
            boxSize={"borderbox"}
          >
            <VStack h={["0%", "0%", "full"]} w={"full"} p={"-1"}>
              <Image
                h={["0%", "0%", "full"]}
                w={["0%", "0%", "full"]}
                rounded="md"
                objectFit={"cover"}
                src="https://media.istockphoto.com/id/637229346/photo/teamwork-holds-the-capacity-for-increased-productivity.jpg?s=612x612&w=0&k=20&c=mFU5BPJXcLc7zEOXoFT3eb0V6n9Y3RAf60VkY4PfIZw="
              />
            </VStack>
            <VStack h={"full"} w={"full"} p={"4"}>
              <Heading
                p={"2"}
                w={"full"}
                fontSize={"md"}
                letterSpacing={"wider"}
              >
                Create account with us
              </Heading>
              <Link to={"/register"} className="w-full">
                <Button
                  w={"full"}
                  letterSpacing={"widest"}
                  variant="unstyled"
                  bgColor="#1c1c1c"
                  textColor="white"
                >
                  Signup
                </Button>
              </Link>
              <Heading
                p={"2"}
                w={"full"}
                mt={"8"}
                fontSize={"md"}
                letterSpacing={"wider"}
              >
                Already have an account?
              </Heading>
              <Link to={"/login"} className="w-full">
                <Button w={"full"} letterSpacing={"widest"}>
                  Login
                </Button>
              </Link>
              <Text mt={["", "4"]} fontSize={"xs"}>
                By joining, you agree to the Showrity Terms of Service and to
                occasionally receive emails from us. Please read our Privacy
                Policy to learn how we use your personal data.
              </Text>
            </VStack>
          </Stack>
        </ModalContent>
      </Modal>

      <div className="flex flex-col ">
        <p className="text-2xl text-[#1C1C1C] font-bold my-4">
          Top rated Maestros @{" "}
          <span className="text-[#22495baa]">Showrity</span>{" "}
        </p>
        <div className="flex gap-3 px-4  flex-wrap justify-center">
          {data.map((item, i) => (
            <>
              <SellerCard key={i} data={item} />
            </>
          ))}
        </div>

        <div className="flex justify-center   my-3 ">
          <Link to="/allDeveloper">
            {" "}
            <p className=" cursor-pointer hover:text-[#EEEEEE] hover:bg-[#176B87] bg-[#1C1C1C] px-3 py-2 text-[#FFFFFF] w-18 font-bold rounded-lg ">
              EXPLORE
            </p>
          </Link>
        </div>
      </div>

      <ImageSlider />

      <Stack
        direction={["column", "column", "row"]}
        w={"full"}
        h={["85vh", "85vh", "70vh"]}
        bg={"#f1fdf7"}
        my={"8"}
      >
        <VStack
          w={"full"}
          h={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={"6"}
          mt={"4"}
        >
          <HStack w={["70%", "50%"]}>
            <Heading textAlign={"left"}>why choose us?</Heading>
          </HStack>
          <HStack w={["70%", "50%"]}>
            <Text textAlign={"left"}>
              <b>👉 Go Global:</b>Take your skills and services to a global
              audience, expanding your reach and opportunities like never
              before.
            </Text>
          </HStack>
          <HStack w={["70%", "50%"]}>
            <Text textAlign={"left"}>
              <b>👉 On-Time Project Delivery & Payouts:</b>Count on us for
              on-time project delivery and prompt payouts, ensuring a seamless
              experience for our users.
            </Text>
          </HStack>
          <HStack w={["70%", "50%"]}>
            <Text textAlign={"left"}>
              <b>👉 Quality Assurance:</b>We guarantee that the work delivered
              to clients meets the highest standards of excellence.
            </Text>
          </HStack>
        </VStack>
        <VStack
          w={"full"}
          h={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          mt={"8"}
          mb={"8"}
        >
          <Stack w={["80%", "80%", "100%", "60%"]}>
            <video
              controls
              poster="https://github.com/xdashutosh/images/blob/main/untitled.png?raw=true"
            >
              <source src={imgvid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Stack>
        </VStack>
      </Stack>

      <Carousel />

      <Blog />

      <HStack position={"relative"} top={"44"} left={"20"}>
        <Heading borderBottom={"3px solid"} p={"2"}>
          Our Badges✨
        </Heading>
      </HStack>

      <Card maxW="4xl" my={"16"} ml={["0", "0", "0", "40%"]}>
        <Image
          objectFit="cover"
          src="https://raw.githubusercontent.com/Gaurav-9810/fivimages/470de3dcfe1e1730ca275be27dbfcd04b36ec2b0/SHOWRITY%20Recommended.svg"
          alt="Chakra UI"
        />
      </Card>

      <Footer />
      <Attention />
    </div>
  );
};

export default Home;

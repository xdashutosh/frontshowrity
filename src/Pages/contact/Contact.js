import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Backend_Url } from "../../Path";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  HStack,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const Contact = () => {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [msg, setmsg] = useState("");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const isValidEmail = emailPattern.test(email);

  const [Loading, setLoading] = useState(false);
  const [toastmsg, settoastmsg] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      if (name == "" || email == "" || msg == "") {
        settoastmsg("please fill all data  😢");

        return;
      }

      if (isValidEmail) {
        const response = await fetch(
          `${Backend_Url}/0auth/SendNotificationtoAdmin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, msg }),
            credentials: "include",
          }
        );

        const { NotificationSend } = await response.json();
        if (response.ok) {
          setname("");
          setemail("");
          setmsg("");

          showToast("Email sent successfully ", "success");
        }
      } else {
        // Handle error (e.g., show an error message)

        showToast("Invalid email", "error");
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        settoastmsg("");
      }, 2000);
    }
  };

  const toast = useToast();
  const showToast = (text, color) => {
    toast({
      title: text,
      position: "top",
      isClosable: true,
      status: color,
    });
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <NavBar />
      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="start"
        p={["4", "36"]}
        spacing={'16'}
      >
        <VStack bg="#1c1c1c" color="white" p={12} rounded={"lg"}  alignItems={'start'}>
          <Heading as='h1'  mb={4}  >
            Get in Touch
            <Divider/>
          </Heading>
          <Heading  as='h3' size='md' mb={4} w={'80%'} textAlign={'left'} >
            Need to get in touch with us? Either fill the form with you inquiry
            or directly jump to our whatapp handle
          </Heading>
          <Text fontWeight="bold" mb={2}>
            2615A - 2616, 26th Floor, Supernova Astralis, Sector 94
          </Text>
          <Text fontWeight="bold" mb={2}>
            Noida, Uttar Pradesh 201301
          </Text>
          <HStack spacing={2} mb={2}>
            <Icon as={HiOutlinePhone} />
            <Text>+91 9958360795 </Text>
          </HStack>
          <HStack spacing={2}>
            <Icon as={HiOutlineMail} />
            <Text>support@showrity.gmail</Text>
          </HStack>
        </VStack>

        <VStack w={["full", "30%"]} mt={["8", "4"]}>
          <form className="w-full" onSubmit={handleSubmit}>
            <VStack spacing={4} w={"full"}>
              <FormControl id="name">
                <Input
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required={true}
                />
              </FormControl>
              <FormControl id="email">
                <Input
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required={true}
                />
              </FormControl>
              <FormControl id="msg">
                <Textarea
                  placeholder="Enter Your Message"
                  id="exampleFormControlTextarea1"
                  value={msg}
                  onChange={(e) => setmsg(e.currentTarget.value)}
                  rows={5}
                  required={true}
                />
              </FormControl>
              <Button
                bgColor="#1c1c1c"
                w="full"
                size={isMobile ? "md" : "lg"}
                textColor={"white"}
                type="submit"
              >
                Submit
              </Button>
            </VStack>
          </form>
        </VStack>
      </Stack>
      <Footer />
    </>
  );
};

export default Contact;

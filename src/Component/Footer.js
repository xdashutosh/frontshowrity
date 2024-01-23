import React, { useState } from "react";
import {
  BiLogoWhatsapp,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoLinkedin,
  BiLogoYoutube,
  BiLocationPlus,
  BiPhone,
  BiLogoGmail,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { Image ,Box} from "@chakra-ui/react";
import hustleimg  from '../images/hustlelogo.png';

const Footer = () => {
  const [show, setshow] = useState("0");
  const whatapp = (phoneNumber, message) => {
    const whatsappBaseUrl = "https://api.whatsapp.com/send";
    const encodedMessage = encodeURIComponent(message);
    
    const url = `${whatsappBaseUrl}?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(url, "_blank");
  };
  const phoneNumber = "9045153128"; // Replace with the recipient's phone number
  const message = "Hello! i am new to showrity";

  const handleClick = (c) => {
    if (show === c) {
      setshow("null");
    } else {
      setshow(c);
    }
  };

  const  sendWhatsAppMessage = () => {
    // Replace '123456789' with the recipient's phone number
    const phoneNumber = '9045153128';

    // Replace 'Hello, how can I help you?' with your desired message
    
   
const message = 'Hello, i am new to showrity,tell me about all opportunities';

// Construct the WhatsApp API URL

const whatsappBaseUrl = 'https://api.whatsapp.com/send';
    
   
const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${whatsappBaseUrl}?phone=${phoneNumber}&text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
  }

  return (
    <footer className="px-10 py-6 bg-[#1C1C1C]  text-white w-full opacity-93  ">
      <div className="container mx-auto px-auto">
        <div className=" hidden  md:flex  flex-wrap  gap-10">
          <div className="w-full  sm:w-1/4 md:w-1/6 lg:w-1/5 flex flex-col gap-2 font-sans text-left ">
            <p className="font-bold mr-10 ">
              
             <Link to={'/'}>
             <Image src={hustleimg}  maxW={{ base: "100%", md: "150%" }}  />
             </Link> 
            
            </p>
          
          </div>
          <div className="w-full sm:w-1/4 md:w-1/5 lg:w-1/5 flex flex-col gap-2 font-sans text-left">
            <p className="font-bold underline">Quick Link</p>
            <p className="cursor-pointer text-sm hover:opacity-80 font-bold">
              <Link to="/">Home</Link>
            </p>
            <p className="cursor-pointer text-sm hover:opacity-80 font-bold">
              <Link to="/contactUs">Contact Us</Link>
            </p>
            <p className="cursor-pointer text-sm hover:opacity-80 font-bold">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </p>
            <p className="cursor-pointer text-sm hover:opacity-80 font-bold">
              <Link to="/allblogs">Blogs</Link>
            </p>
          </div>
          <div className="w-full sm:w-1/4 md:w-1/5 lg:w-1/5 flex flex-col gap-2 font-sans text-left">
            <p className="font-bold underline">Social Links</p>
            <div className="flex flex-col gap-2 ">
              <span
                onClick={() => whatapp(phoneNumber, message)}
                className="cursor-pointer text-sm hover:opacity-80 flex gap-2"
               
              >
                <BiLogoWhatsapp size={25} />
                <span className="font-bold flex flex-col justify-center">
                  WhatsApp
                </span>
              </span>
              <a
                href="https://www.instagram.com"
                target="_blank" rel="noreferrer"
              >
                <p className="cursor-pointer text-sm hover:opacity-80 flex gap-2">
                  <BiLogoInstagram size={"25"} />
                  <span className="font-bold flex flex-col justify-center">
                    Instagram
                  </span>{" "}
                </p>
              </a>
              <a
                href="https://twitter.com"
                target="_blank" rel="noreferrer"
              >
                <p className="cursor-pointer text-sm hover:opacity-80 flex gap-2">
                  <BiLogoTwitter size={"25"} />
                  <span className="font-bold flex flex-col justify-center">
                    Twitter
                  </span>{" "}
                </p>
              </a>
              <a
                href="https://in.linkedin.com"
                target="_blank" rel="noreferrer"
              >
                <p className="cursor-pointer text-sm hover:opacity-80 flex gap-2">
                  <BiLogoLinkedin size={"25"} />
                  <span className="font-bold flex flex-col justify-center">
                    Linkedin
                  </span>
                </p>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank" rel="noreferrer"
              >
                <p className="cursor-pointer text-sm hover:opacity-80 flex gap-2">
                  <BiLogoYoutube size={"25"} />
                  <span className="font-bold flex flex-col justify-center">
                    Youtube
                  </span>
                </p>
              </a>
            </div>
          </div>
          <div className="w-full sm:w-1/4 md:w-1/4 lg:w-1/4 flex flex-col gap-2 font-sans text-left">
            <p className="font-bold underline">Get In Touch</p>

            <a href="mailto:ashuchaudhary6969@gmail.com" className="flex gap-2">
              <span className="cursor-pointer  hover:opacity-80 flex gap-2">
                <BiLogoGmail size={"20"} />
              </span>
              <span className="font-bold flex sm:text-sm md:text-[12px] flex-col justify-center ">
                info@Showrity.gmail
              </span>
            </a>
            <p className="cursor-pointer text-sm hover:opacity-80 flex gap-2">
              <BiPhone size={"20"} />
              <span className="font-bold flex flex-col justify-center">
              9045153128
              </span>
            </p>
            <p className="cursor-pointer  text-sm hover:opacity-80 flex gap-2">
              <BiLocationPlus size={"20"} />
              <span className="font-bold flex flex-col justify-center">
              GreaterNoida 
             
              </span>
            </p>
          </div>
        </div>
        <div className="md:hidden ">
          <div>
            <div
              className="lg:mr-4 lg:ml-4 mb-4  rounded-md cursor-pointer  "
              onClick={() => handleClick("1")}
            >
              <div className="  rounded-md pb-px  ">
                <h2 className="pl-2 font-semibold  text-left md:pl-4 text-White  py-2 flex justify-between  ">
                  Quick Link
                  {show === "1" ? (
                    <span className=" mr-4  ">
                      <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    </span>
                  ) : (
                    <span className="mr-4 z-30">
                      <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 320 512"
                      >
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                      </svg>
                    </span>
                  )}{" "}
                </h2>

                {show === "1" && (
                  <p className=" mb-2  faq-question rounded-b-md  py-2 px-3  text-left md:px-8 md:py-4 flex flex-col gap-1">
                    <Link to="/" className="cursor-pointer font-bold">
                      Home
                    </Link>
                    <Link to="/contactUs" className="cursor-pointer font-bold">
                      Contact US
                    </Link>
                    <Link to="/service" className="cursor-pointer font-bold">
                      Service
                    </Link>
                    <Link to="/allblogs" className="cursor-pointer font-bold">
                      Blogs
                    </Link>
                  </p>
                )}
              </div>
            </div>

            <div
              className="lg:mr-4 lg:ml-4 mb-4  rounded-md cursor-pointer  "
              onClick={() => handleClick("2")}
            >
              <div className="  rounded-md pb-px  ">
                <h2 className="pl-2 font-semibold  text-left md:pl-4 text-White  py-2 flex justify-between  ">
                  Social Link
                  {show === "2" ? (
                    <span className=" mr-4  ">
                      <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    </span>
                  ) : (
                    <span className="mr-4 z-30">
                      <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 320 512"
                      >
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                      </svg>
                    </span>
                  )}{" "}
                </h2>

                {show === "2" && (
                  <p className=" mb-2  faq-question rounded-b-md  py-2 px-3  text-left md:px-8 md:py-4 flex flex-col gap-2">
                    <span
                      onClick={() => whatapp(phoneNumber, message)}
                      className="cursor-pointer text-sm hover:opacity-80 flex gap-2"
                    
                    >
                      <BiLogoWhatsapp size={25} />
                      <span className="font-bold flex flex-col justify-center">
                        WhatsApp
                      </span>
                    </span>
                    <a
                      href="https://www.instagram.com"
                      target="_blank" rel="noreferrer"
                    >
                      <p className="cursor-pointer text-sm hover:opacity-80 flex gap-2">
                        <BiLogoInstagram size={"25"} />
                        <span className="font-bold flex flex-col justify-center">
                          Insta
                        </span>{" "}
                      </p>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="__blank"
                    >
                      <p className="cursor-pointer text-sm hover:opacity-80 flex gap-2">
                        <BiLogoTwitter size={"25"} />
                        <span className="font-bold flex flex-col justify-center">
                          Twitter
                        </span>{" "}
                      </p>
                    </a>
                    <a
                      href="https://in.linkedin.com/company/orage-technologies-private-limited"
                      target="__blank"
                    >
                      <p className="cursor-pointer text-sm hover:opacity-80 flex gap-2">
                        <BiLogoLinkedin size={"25"} />
                        <span className="font-bold flex flex-col justify-center">
                          Linkedin
                        </span>
                      </p>
                    </a>
                    <a
                      href="https://www.youtube.com"
                      target="__blank"
                    >
                      <p className="cursor-pointer text-sm hover:opacity-80 flex gap-2">
                        <BiLogoYoutube size={"25"} />
                        <span className="font-bold flex flex-col justify-center">
                          Youtube
                        </span>
                      </p>
                    </a>
                  </p>
                )}
              </div>
            </div>
            <div
              className="lg:mr-4 lg:ml-4 mb-4  rounded-md cursor-pointer  "
              onClick={() => handleClick("3")}
            >
              <div className="  rounded-md pb-px  ">
                <h2 className="pl-2 font-semibold  text-left md:pl-4 text-White  py-2 flex justify-between  ">
                  Get in Touch
                  {show === "3" ? (
                    <span className=" mr-4  ">
                      <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    </span>
                  ) : (
                    <span className="mr-4 z-30">
                      <svg
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 320 512"
                      >
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                      </svg>
                    </span>
                  )}{" "}
                </h2>

                {show === "3" && (
                  <p className=" mb-2  faq-question rounded-b-md  py-2 px-3  text-left md:px-8 md:py-4 flex flex-col gap-2">
                    <a href="mailto:orage@gmail.com" className="flex gap-2">
                      <span className="cursor-pointer  hover:opacity-80 flex gap-2">
                        <BiLogoGmail size={"20"} />
                      </span>
                      <span className="font-bold flex sm:text-sm md:text-[12px] flex-col justify-center ">
                        info@showrity.gmail
                      </span>
                    </a>
                    <a href="#" onClick={sendWhatsAppMessage}>
                    <p className="cursor-pointer text-sm hover:opacity-80 flex gap-2">
                      <BiPhone size={"20"} />
                      <span className="font-bold flex flex-col justify-center">
                        9045153128
                      </span>
                    </p>
                    </a>
                    <p className="cursor-pointer  text-sm hover:opacity-80 flex gap-2">
                      <BiLocationPlus size={"20"} />
                      <span className="font-bold flex flex-col justify-center">
                     GreaterNoida
                     
                      </span>
                    </p>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className=" mt-4 mb-3 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
        <p className=" ml-4">
        &#169; 2023-2024 <span className="font-bold">showrity.com &#174;</span>. All Rights
          Reserved. <b className="text-2xl">Developed by Ashutosh chaudhary</b>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

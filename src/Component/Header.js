import React, { useState, useEffect } from 'react';
import { Button, HStack, Image, Stack } from '@chakra-ui/react';

const Header = () => {
  const images = [
    'https://raw.githubusercontent.com/Abhs15github/Graphics-Data/main/headerhustle1-unscreen.gif',
   'https://github.com/Abhs15github/Graphics-Data/blob/main/headerhustle2-unscreen.gif?raw=true'
  
    // Add more image URLs here
  ];

  const texts = [
    'Verified Clients, Reliable Earnings, Always',
    'Your Work, Your Terms, Our Assurance',
    'Start Now, Earn Right, Every Time', // Add more text strings here
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    // Function to cycle through images and text
    const cycleContent = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    };

    // Set up an interval to switch content every 3 seconds (adjust as needed)
    const contentInterval = setInterval(cycleContent, 2000); // 3000 milliseconds (3 seconds)

    // Clean up the interval when the component unmounts
    return () => clearInterval(contentInterval);
  }, []);

  return (
    <Stack
      w={'full'}
      direction={['column', 'column', 'row']}
      bg={'#1C1C1C'}
      h={['40vh', '50vh', '60vh']}
    >
      <style>
        {`
          /* Add this CSS code to your stylesheets */
          .image-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .image-fade {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity .5s ease-in-out; /* Adjust the transition duration as needed */
           pointer-events: none;
          }

          .image-fade.active {
            opacity: 1;
          }

          .text-container {
            text-align: left;
          }

          .rotating-text {
            font-weight: bold;
            font-size: 2xl;
            color: #EEEEEE;
          }

          /* Hide the image-container on small screens */
          @media (max-width: 768px) {
            .image-container {
              display: none;
            }
          }
        `}
      </style>

      <HStack w={'full'} p={'16'}  justifyContent={'center'} alignItems={'center'} h={'full'} className='text-container'>
      <div className='flex flex-col gap-3 '>
          <div className='text-left border-l-4 p-3'>
            <p className='rotating-text text-[#EEEEEE] font-bold text-xl sm:text-3xl'>{texts[currentTextIndex]} </p>
            <p className=' text-[#EEEEEE] font-bold text-sm sm:text-2xl'>With <b className='tracking-tight border-b-2  text-[#6ad6a0]' >Hustle for Work</b></p>
            
          </div>
        </div>
      </HStack>
      <HStack w={['0', '0', 'full']} justifyContent={'center'} className='image-container'>
        {images.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`Hero Image ${index}`}
            objectFit='contain'
            h='100%'
            w='100%'
            
            className={`image-fade ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
      </HStack>
    </Stack>
  );
};

export default Header;

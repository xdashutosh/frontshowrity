import { HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const ImageSlider = () => {
  const initialImages = [
    "https://github.com/Gaurav-9810/fivimages/blob/main/lower%20card%2007@4x-100.jpg?raw=true",
    "https://github.com/Gaurav-9810/fivimages/blob/main/lower%20card%2006@4x-100.jpg?raw=true",
    "https://github.com/Gaurav-9810/fivimages/blob/main/lower%20card%2005@4x-100.jpg?raw=true",
    "https://github.com/Gaurav-9810/fivimages/blob/main/lower%20card%2004@4x-100.jpg?raw=true",
    "https://github.com/Gaurav-9810/fivimages/blob/main/lower%20card%2003@4x-100.jpg?raw=true",
    "https://github.com/Gaurav-9810/fivimages/blob/main/lower%20card%2002@4x-100.jpg?raw=true",
    "https://github.com/Gaurav-9810/fivimages/blob/main/lower%20card%2001@4x-100.jpg?raw=true",

  ];

  const [images, setImages] = useState([...initialImages, ...initialImages]);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setImages(prevImages => {
        // Move the first image to the end
        const updatedImages = [...prevImages];
        updatedImages.push(updatedImages.shift());
        return updatedImages;
      });
    }, 5000); // Adjust the interval duration as needed

    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <HStack w={'full'} overflowX={['auto','auto','hidden']} overflowY={'hidden'}>

    <div className="logo-slider" data-v-4ef8651c="">
      <div className="logos-slide" data-v-4ef8651c="">
        {images.map((image, index) => (
            <img 
            key={index}
            className="image-enlarge-effect"
            src={image}
            alt={`Image ${index}`}
            data-v-4ef8651c=""
            />
            ))}
      </div>
    </div>
            </HStack>
  );
};

export default ImageSlider;

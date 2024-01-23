import React from 'react'
import { Drawer,  DrawerCloseButton, DrawerContent,DrawerHeader, DrawerOverlay, Text, useDisclosure } from '@chakra-ui/react'
import  { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Attention = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();


    // Use useEffect to trigger the delay
    useEffect(() => {
      const timer = setTimeout(() => {
        onOpen();
      }, 3000); // 4000 milliseconds equals 4 seconds
  
      // Clean up the timer when the component unmounts
      return () => clearTimeout(timer);
    }, [onOpen]); 
  return (
    <Drawer
    isOpen={isOpen}
    placement='bottom'
    onClose={onClose}
  
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton mt="4" />
      <DrawerHeader>Please Note
      <Text opacity={'.8'} fontSize={'md'}>Showrity For Work is only responsible for payment of projects obtained from the Showrity platform. Choose security, choose us! <Link to={'/privacy-policy'} style={{color:'blue',textDecoration:'underline'}}>Learn more</Link></Text>
      </DrawerHeader>
    </DrawerContent>
  </Drawer>
  )
}

export default Attention

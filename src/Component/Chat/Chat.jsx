import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  useColorModeValue,
  IconButton,

} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';

const ChatMessage = ({ message, isUser,timestamp }) => {
  const align = isUser ? 'flex-end' : 'flex-start';
  const color = useColorModeValue('gray.100', 'gray.700');
  return (
    <HStack alignSelf={align} bg={color} borderRadius="lg" p={2} mr={'2'} maxW="70%">
          <VStack align={align}>
      <Text color={isUser ? 'blue.500' : 'green.500'}>{message}</Text>
      <Text fontSize="xs" color="gray.500">
          {timestamp}
        </Text>
          </VStack>
    </HStack>
  );
};

const Chat = ({Seekername}) => {
  const [messages, setMessages] = React.useState([
    { text: `Hi this is ${Seekername} `, isUser: false },
    // Add more initial messages if needed
  ]);
  const [inputValue, setInputValue] = React.useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    const newMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <Box p={5} borderWidth="1px"  borderRadius="lg" shadow="md" w="100%">
         <style>
        {`
    @media (max-width: 768px) {
      /* Hide the scrollbar on small devices */
      ::-webkit-scrollbar {
        display: none;
      }
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background: #1c1c1c; // Color of the scrollbar thumb
      border-radius: 4px; // Adjust the thumb's border radius
    }
  `}
      </style>
      <VStack  spacing={4} align="stretch" h="70vh" overflowY="auto" >
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser}  timestamp={msg.timestamp} />
        ))}
      </VStack>
      <HStack mt={4}>
        <Input
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <IconButton
          bgColor="#1c1c1c"
          aria-label="Send message"
          icon={<FiSend />}
          color={'white'}
          onClick={handleSendMessage}
        />
      </HStack>
    </Box>
  );
};

export default Chat;

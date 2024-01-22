import React, { useState, useEffect } from 'react';
import { InputGroup, InputLeftElement, Input, Box, List, ListItem, VStack, InputRightElement, Button, HStack, Text } from '@chakra-ui/react';
import { FiCrosshair, FiSearch,FiXCircle } from 'react-icons/fi';
import { Spinner } from '@chakra-ui/react';
import { Backend_Url } from '../Path.js'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AnotherLoader = ()=>{

    return (
     
      <Spinner size='xl' mt="2" />
    
    )
    }
    

    const techJobs = [
      "Logo Design", "Social Media Marketing", "SEO Consulting", "Voice Over",
      "Translation Services", "Website Development", "Mobile App Development", "Video Editing",
      "3D Modeling", "Animation", "WordPress Support", "E-commerce Website",
      "Copywriting", "Article Writing", "Blog Writing", "Resume Writing",
      "Illustration", "Photo Editing", "Digital Marketing Strategy", "Email Marketing",
      "Facebook Advertising", "Google Ads Services", "YouTube Marketing", "Content Marketing",
      "Podcast Editing", "Music Composition", "Audio Mixing", "Sound Design",
      "Virtual Assistant Services", "Data Entry", "Market Research", "Business Consulting",
      "Financial Consulting", "Legal Consulting", "Career Counseling", "Personal Styling",
      "Fitness Coaching", "Nutrition Planning", "Yoga Instruction", "Meditation Guidance",
      "Life Coaching", "Astrology Readings", "Tarot Readings", "Psychic Reading",
      "UI/UX Design", "Landing Page Design", "Brochure Design", "Banner Ad Design",
      "Poster Design", "Book Cover Design", "Packaging Design", "Fashion Design",
      "T-shirt Design", "Jewelry Design", "Tattoo Design", "Interior Design",
      "Landscape Design", "Architecture Services", "Engineering Drawing", "CAD Design",
      "3D Printing", "Drone Photography", "Real Estate Photography", "Product Photography",
      "Portrait Photography", "Video Production", "Scriptwriting", "Storyboarding",
      "VFX Services", "Game Development", "Game Design", "Character Modeling",
      "App Testing", "Website Testing", "Cybersecurity Services", "Blockchain Consulting",
      "Data Analysis", "Machine Learning Services", "AI Development", "Database Management",
      "Cloud Computing Services", "Network Support", "IT Support", "Teaching and Tutoring",
      "Online Courses", "Workshop Planning", "Event Planning", "Travel Planning",
      "Cooking Lessons", "Baking Services", "Catering Services", "Recipe Development",
      "Pet Care Advice", "Veterinary Consultation", "Plant Care Guidance", "Sustainable Living Consulting",
      "Graphic Novel Artist", "Comic Creation", "Storyboard Artist", "Caricature Drawing","full stack","Mern Stack","Content Writer","CONTENT WRITING","flutter"
    ];
    
    



function SearchbarDev() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [search, setsearch] = useState('');
  const Navigate = useNavigate();

  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }






    
    
    
    const filteredSuggestions = techJobs.filter(job => {
      const words = job.split(' ').slice(0, 3); // Get the first three words of the job title
      return words.some(word => word.toLowerCase().startsWith(inputValue.toLowerCase()));
    });
    
    setSuggestions(filteredSuggestions);
  }, [inputValue]);
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
    setsearch(e.target.value);
    
  };

  const handlesearch = (e) => {
    setInputValue(e);
   setsearch(e);

  }
  const HandleClear = () => {
    setInputValue("");

  };
  const handledata = async() => {
    try {  
    
      Navigate(`/filteredjobs/${search}`)
   
    
  } catch (err) {}

  }




  return (
 
    <Box py={'4'} position="relative" width={['full','80%']}>
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FiSearch color="gray.400" />
      </InputLeftElement>
         <InputRightElement mr={['12','16']} onClick={HandleClear}>
         <FiXCircle color="gray.400" />
         </InputRightElement>
         <InputRightElement  onClick={HandleClear}>
         <Button bgColor={'#1c1c1c'}  borderRadius="full" variant={'outline'} textColor={'white'} px={['8','12']} _hover={{textColor:'black',bgColor:'white'}} onClick={handledata}>Search</Button>
         </InputRightElement>
      <Input
        value={inputValue}
        onChange={handleChange}
        placeholder="Search your need"
        borderRadius="full"
        bgColor={'white'}
        shadow={'md'}
        style={{outline:'none',border:'none'}}
        // _hover={{ borderColor: 'gray.300' }}
        // _focus={{ borderColor: '#1c1c1c', boxShadow: '0 0 0 1px #1c1c1c' }}
        _focus={{borderWidth:'none', borderColor: 'white', boxShadow: '0 0 0 1px white' }}
      />
    </InputGroup>
    <VStack w="full" alignItem="centre" boxSizing='border-box' >
      <List mt={1} position="absolute" bg="white" width="100%" borderRadius="md" zIndex={'2'}>
        {suggestions.map((suggestion, index) => (
          <ListItem
            key={index}
            p={2}
            borderColor="#1c1c1c"
            _hover={{ bg: '#f9f9f9' }}
            cursor="pointer"
            rounded="md"
            onClick={() => handlesearch(suggestion)}
            opacity=".8"
            
          
          >
               <HStack>

<FaSearch/> 
<Text>
  {suggestion}
</Text>  
    </HStack>
          </ListItem>
        ))}

      </List>
    </VStack>
  </Box>
  );
}

export default SearchbarDev;



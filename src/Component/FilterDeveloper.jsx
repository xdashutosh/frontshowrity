import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Backend_Url } from '../Path.js';
import { Badge, Box, Button, Divider, Flex, HStack,  Stack, Tag, TagCloseButton, TagLabel, Text, VStack, Wrap, WrapItem,Select } from '@chakra-ui/react';

import { MdArrowBackIosNew } from "react-icons/md";
import SellerCard from './SellerCard.js';
import Searchbarfilterpage from './Searchbarfilterpage.jsx';

import axios from 'axios';





const FilterDeveloper = () => {
 const Navigate = useNavigate();
    let { id } = useParams();
    const [allPost, setAllPost] = useState([]);
    const badges = ['Bronze','Silver','Gold','Platinum','Recommended'];
    const [selectedbadge, setSelectedbadge] = useState(null);
let searchdeveloper ="";


const [selectedCountries, setSelectedCountries] = useState([]);
const [selectedValue, setSelectedValue] = useState("");
const [countries, setCountries] = useState([]);

const handleSelectChange = (event) => {
  const { value } = event.target;
  setSelectedValue(value);
  if (value && !selectedCountries.includes(value)) {
    setSelectedCountries([...selectedCountries, value]);
  }
 
};

const removeCountry = (countryToRemove) => {
  setSelectedCountries(selectedCountries.filter(country => country !== countryToRemove));
};




    async function fetchData() {
        try {
        
    
          const response = await fetch(
            `${Backend_Url}/0auth/SearchDeveloperbyTechnologyAndName?Name=${searchdeveloper}&technology=${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
    
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setAllPost(result.developer);
      
          console.log(result.developer);
        } catch (err) {
          
        } 
      }
    
      useEffect(() => {
        fetchData();
     
      }, [id]);


      const country = async () => {
        try {
          const response = await axios.get("https://restcountries.com/v3/all");
          const countryNames = response.data.map(country => country.name.common);
      
          setCountries(countryNames);
          
        } catch (error) {
       
        }
      };
    
      useEffect(() => {
        country();
      }, []);

      
      const filteredPosts = useMemo(() => {
        return allPost
    .filter((data)=>{
      return selectedbadge === null || data.badges === selectedbadge;
    });

      }, [allPost,selectedbadge]);


  return (
<>
<HStack w={'full'} p={'4'}>  <Badge
                  children={<MdArrowBackIosNew size={'32'} />}
                  alignSelf={"start"}
                  textColor={"white"}
                  px={"2"}
                  py={"2"}
                  bg={"#1c1c1c"}
                  onClick={()=>Navigate('/')}
                  rounded={"full"}
                 letterSpacing={'wide'}
                /></HStack>
    <Stack direction={['column','row']} w={'100vw'} h={'90vh'}  px={['4','10vw']}>
<VStack  h={['10%','full']} w={['100%','25vw']} p={'2'}  >
    <VStack >

<HStack><Text fontSize={'xl'} opacity={'0.7'} fontWeight={'bold'} letterSpacing={'wider'}>Filter by Category</Text></HStack>
<VStack  visibility={['hidden','visible']}>
<HStack w={'full'} p={'2'} >
    <Text fontSize={'sm'}  fontWeight={'bold'}>Filter by Badge level</Text>
    </HStack> 
<Flex   flexWrap={'wrap'} gap={'4'}>
      {badges.map((category) => (
          <Button
          key={category}
          px={4}
          py={2}
          borderRadius='full'
          variant={selectedbadge === category ? 'solid' : 'outline'}
          colorScheme='blue'
          onClick={() => setSelectedbadge(category)}
          fontSize={'sm'}
          >
          {category}
        </Button>
      ))}
      </Flex>
      <HStack w={'full'}>
      <Button
          px={4}
          py={2}
          borderRadius='full'
          bgColor={'#1c1c1c'}
          textColor={'white'}
          variant={'unstyled'}
          onClick={() => setSelectedbadge(null)}
          fontSize={'sm'}
          >
          Clear
        </Button>
              </HStack>

      </VStack>
   <Divider/>
    <VStack w={'full'} visibility={['hidden','visible']}>
    <HStack w={'full'} p={'2'} >
    <Text fontSize={'sm'}  fontWeight={'bold'}>Filter by Country</Text>
    </HStack> 
      <Select placeholder={null} onChange={handleSelectChange} value={selectedValue} >
      {countries.map(country => (
          <option key={country} value={country}>{country}</option>
          ))}
      </Select>
        <Box>
      <Wrap spacing={2} mt={2}>
        {selectedCountries.map(country => (
            <WrapItem key={country}>
            <Tag size="md" borderRadius="full" variant="solid" colorScheme="blue">
              <TagLabel>{country}</TagLabel>
              <TagCloseButton onClick={() => removeCountry(country)} />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
        </VStack>
        </VStack>

</VStack>

<style>
        {`
    @media (max-width: 768px) {
      /* Hide the scrollbar on small devices */
      ::-webkit-scrollbar {
        display: none;
      }
    }

    ::-webkit-scrollbar {
      width: 0px;
      height: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background: green; // Color of the scrollbar thumb
      border-radius: 4px; // Adjust the thumb's border radius
    }
  `}
      </style>

<VStack h={'full'} w={'full'}  >
    <VStack  p={'2'} w={'full'}  justifyContent={'space-around'} >
    
        <Text  alignSelf={'self-start'}  fontSize={'3xl'} opacity={'.9'} letterSpacing={'wider'} >Results for <b>{id}</b></Text>
    
      
<Searchbarfilterpage/>
        </VStack>
  
    {
filteredPosts.length>0?
        <Flex w={'full'} flexWrap={'wrap'} gap={'16'}  justifyContent={'center'} overflowY={'scroll'}  >
    
       {allPost.map((data, index) => (
           <SellerCard data={data}/>
           ))}
     </Flex>
     :<>
     <Box m={'4'}
           bgImage="url('https://raw.githubusercontent.com/oragetech/assests/main/what-is-empty-state-userguiding-0-removebg-preview.png')"
          bgSize="cover"
          bgPosition="center"
          h="50vh"
          w={['100vw',"30vw"]}
        />
     </>
     
        }
</VStack>
    </Stack>
           </>

   
  )
}

export default FilterDeveloper

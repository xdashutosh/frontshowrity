import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Backend_Url } from "../Path.js";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
  Wrap,
  WrapItem,
  Select,
  Checkbox,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import { MdArrowBackIosNew } from "react-icons/md";
import SellerCard from "./SellerCard.js";
import axios from "axios";
import SearchbarDev from "./SearchbarDev.jsx";
import TaskCard from "./DahBoard/DashBoarddeveloper/TaskCard.js";
import Filteredjobcard from "./Filteredjobcard.jsx";

const FilterDeveloper = () => {
  const Navigate = useNavigate();
  let { id } = useParams();
  const [allPost, setAllPost] = useState([]);
  const [Maxamountfilter, setMaxamountfilter] = useState(99999999999);
  const [Minamountfilter, setMinamountfilter] = useState(0);
  const [checkedItem, setCheckedItem] = useState("");
  const badges = ["Bronze", "Silver", "Gold", "Platinum", "Recommended"];
  const [selectedbadge, setSelectedbadge] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All"); // State for the selected tab

  // ... fetchData function ...

  const handleTabChange = (index) => {
    setSelectedTab(index === 0 ? "Latest" : "All");
  };
  let search = "";

  async function fetchData() {
    try {
      const response = await fetch(
        `${Backend_Url}/0auth/SearchProjectbyTechnologyAndCompany?companyName=${id}&technology=${search}`,
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
      setAllPost(result.project);
      console.log(result.project);
    } catch (err) {}
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  const handlePrice = (min, max, item) => {
    setMinamountfilter(min);
    setMaxamountfilter(max);
    setCheckedItem(item);
  };

  const filteredPosts = useMemo(() => {
    const now = new Date();
    return allPost
      .filter((data) => {
        const postDate = new Date(data.TimeOfPosting);
        const isLatest = (now - postDate) / 36e5 <= 24; // Check if the post is within the last 24 hours
        return selectedTab === "All" || (selectedTab === "Latest" && isLatest);
      })
      .filter(
        (data) =>
          data.ProjectMoney > Minamountfilter &&
          data.ProjectMoney < Maxamountfilter
      )
.filter((data)=>{
  return selectedbadge === null || data.level === selectedbadge;
});
  }, [allPost, Minamountfilter, Maxamountfilter, selectedTab,selectedbadge]);

  return (
    <>
      <HStack w={"full"} p={"4"}>
        {" "}
        <Badge
          children={<MdArrowBackIosNew size={"32"} />}
          alignSelf={"start"}
          textColor={"white"}
          px={"2"}
          py={"2"}
          bg={"#1c1c1c"}
          onClick={() => Navigate("/")}
          rounded={"full"}
          letterSpacing={"wide"}
        />
      </HStack>
      <Stack
        direction={["column", "row"]}
        w={"100vw"}
        h={"90vh"}
        px={["4", "10vw"]}
        bgColor={'white'}
       
      >
        <VStack h={["10%", "full"]} w={["100%", "25vw"]} p={"8"} bgColor={'white'} rounded={'2xl'} >
          <VStack>
            <VStack visibility={["hidden", "visible"]}>
              <HStack w={"full"} p={"2"}>
                <Text fontSize={"md"} fontWeight={"bold"}>
                  Badge level
                </Text>
              </HStack>
              <Flex flexWrap={"wrap"} gap={"4"}>
                {badges.map((category) => (
                  <Button
                    key={category}
                    px={4}
                    py={2}
                    borderRadius="full"
                    variant={selectedbadge === category ? "solid" : "outline"}
                    colorScheme="blue"
                    onClick={() => setSelectedbadge(category)}
                    fontSize={"sm"}
                  >
                    {category}
                  </Button>
                ))}
              </Flex>
              <HStack w={"full"}>
                <Button
                  px={4}
                  py={2}
                  borderRadius="full"
                  bgColor={"#1c1c1c"}
                  textColor={"white"}
                  variant={"unstyled"}
                  onClick={() => setSelectedbadge(null)}
                  fontSize={"sm"}
                >
                  Clear
                </Button>
              </HStack>
            </VStack>
            <VStack
              w={"full"}
              mt={'16'}
              alignItems={"self-start"}
              visibility={["hidden", "visible"]}
            
            >

              <Text fontSize={"md"} fontWeight={"bold"}>
                Filter Price
              </Text>
              <Box  >
                <Stack spacing={'4'}>
                  <Checkbox
                    name="lessThan100"
                    isChecked={checkedItem === "checkbox1"}
                    onChange={() => handlePrice(0, 100, "checkbox1")}
                    >
                    Less than $100
                  </Checkbox>
                  <Checkbox
                    name="is500"
                    isChecked={checkedItem === "checkbox2"}
                    onChange={() => handlePrice(100, 500, "checkbox2")}
                    >
                    $100 to $500
                  </Checkbox>
                  <Checkbox
                    name="is300"
                    isChecked={checkedItem === "checkbox3"}
                    onChange={() => handlePrice(500, 1000, "checkbox3")}
                    >
                    $500 - $1000
                  </Checkbox>
                  <Checkbox
                    name="is300"
                    isChecked={checkedItem === "checkbox4"}
                    onChange={() => handlePrice(1000, 5000, "checkbox4")}
                    >
                    $1000 -$5000
                  </Checkbox>
                  <Checkbox
                    name="is300"
                    isChecked={checkedItem === "checkbox5"}
                    onChange={() => handlePrice(5000, 999999999, "checkbox5")}
                    >
                    More than 5000
                  </Checkbox>
                </Stack>
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

        <VStack h={"full"} w={"full"}>
          <Stack
            direction={["column", "row"]}
            p={"2"}
            w={"full"}
            justifyContent={"space-around"}
         
          
          >
            <VStack w={"full"}>
              <Text
                alignSelf={"self-start"}
                fontSize={["xl", "3xl"]}
                opacity={".9"}
                letterSpacing={"wider"}
              >
                Results for <b>{id}</b>
              </Text>
              <SearchbarDev />
              <Tabs
                isFitted
                variant="line"
                defaultIndex={1}
                onChange={handleTabChange}
              >
                <TabList mb="1em">
                  <Tab fontSize={"lg"} w={"100px"}>
                    Latest
                  </Tab>
                  <Tab fontSize={"lg"} w={"100px"}>
                    All
                  </Tab>
                </TabList>
              </Tabs>
            </VStack>
          </Stack>

          {allPost.length > 0 ? (
            <Flex
              w={"full"}
              flexWrap={"wrap"}
              gap={"16"}
              justifyContent={"center"}
              overflowY={"scroll"}
            >
              {filteredPosts.map((data, index) => (
                <Filteredjobcard key={index} data={data} />
              ))}
            </Flex>
          ) : (
            <>
              <Box
                m={"4"}
                bgImage="url('https://raw.githubusercontent.com/oragetech/assests/main/what-is-empty-state-userguiding-0-removebg-preview.png')"
                bgSize="cover"
                bgPosition="center"
                h="50vh"
                w={["100vw", "30vw"]}
              />
            </>
          )}
        </VStack>
      </Stack>
    </>
  );
};

export default FilterDeveloper;

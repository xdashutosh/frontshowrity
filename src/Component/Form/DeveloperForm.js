import React, {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Backend_Url } from "../../Path";
import "react-phone-number-input/style.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import {

  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,

  Input,

  Stack,
  Step,

  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import PhoneInput from "react-phone-number-input";
import Select from "react-dropdown-select";
import axios from "axios";

import { IoMdAdd } from "react-icons/io";
import Searchbarfilterpage from "../Searchbarfilterpage";

const steps = [
  { title: "Personal Details", form: FirstForm },
  { title: "Experience and Skills", form: SecondForm },
  { title: "Detailed summary", form: ThiredForm },
];


const Titles = [
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
  "Graphic Novel Artist", "Comic Creation", "Storyboard Artist", "Caricature Drawing","full stack","Mern Stack","Content Writer","CONTENT WRITING","blender"
];



const DeveloperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [firstFormSubmitted, setFirstFormSubmitted] = useState(false);
  const [secondFormSubmitted, setSecondFormSubmitted] = useState(false);
  const [thiredFormSubmitted, setthiredFormSubmitted] = useState(false);



  const handleFirstFormSubmit = () => {
    setFirstFormSubmitted(true);
    setActiveStep(activeStep + 1); // Move to the second step
  };

  const handleSecondFormSubmit = () => {
    setSecondFormSubmitted(true);
    setActiveStep(activeStep + 1);
    // Move to the third step
  };

  const handleback = () => {
    setActiveStep(activeStep - 1);
    setFirstFormSubmitted(false);
  };
  const handleback1 = () => {
    setActiveStep(activeStep - 1);
    setSecondFormSubmitted(false);
  };

  return (
    <>
      <Stack
        w={"full"}
        h={"full"}
        mt={"16"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stepper
          index={activeStep}
          orientation="vertical"
          size={"lg"}
          height="full"
          gap="0"
        >
          {steps.map((step, index) => (
            <Step key={index} m="2">
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Stack>
                <Box flexShrink="0">
                  <StepTitle fontSize="2xl">{step.title}</StepTitle>
                </Box>

                {index === 0 && !firstFormSubmitted && (
                  <step.form onSubmit={handleFirstFormSubmit} />
                )}

                {index === 1 && firstFormSubmitted && !secondFormSubmitted && (
                  <step.form
                    onSubmit={handleSecondFormSubmit}
                    activeStep={handleback}
                  />
                )}

                {index === 2 &&
                  firstFormSubmitted &&
                  secondFormSubmitted &&
                  !thiredFormSubmitted && (
                    <step.form activeStep={handleback1} />
                  )}
              </Stack>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Stack>
    </>
  );
};

function FirstForm({ onSubmit }) {
  const [name, setname] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [Country, setCountry] = useState("");
  const [linkdinurl, setLinkUrl] = useState("");
  const [PortfolioUrl, setPortfolioUrl] = useState("");


  const [mycountry, setmycountry] = useState();

  const options = mycountry?.map((item, id) => ({
    value: id,
    label: item.name.common,
    flags: item.flags[1],
  }));

  const country = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3/all");

      setmycountry(response?.data);
    } catch (error) {}
  };
  useEffect(() => {
    country();
  }, []);

  const customStyles = {
    border: "2px solid #ccc",
    borderRadius: "5px",
    padding: "8px",
    fontSize: "16px",
  };

  const form1Data = {
    name: name,
    country: Country,
    state: city,
    mobile: mobile,
    linkdinurl: linkdinurl,
    PortfolioUrl: PortfolioUrl,
  };
  const handleSubmit = () => {
  
    localStorage.setItem("form1Data", JSON.stringify(form1Data));
  
  };

  const getfromlocal = async () => {
    try {
      const form1datafromlocalstring = localStorage.getItem("form1Data");
      if (form1datafromlocalstring != null) {
        const form1datafromlocal = JSON.parse(form1datafromlocalstring);
        setname(form1datafromlocal.name);
        setCity(form1datafromlocal.state);
        setMobile(form1datafromlocal.mobile);
        setLinkUrl(form1datafromlocal.linkdinurl);
        setPortfolioUrl(form1datafromlocal.PortfolioUrl);
        setCountry(form1datafromlocal.country);
        console.log(form1datafromlocal);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getfromlocal();
  }, []);

  return (
    <VStack w={["full", "20vw"]} m={["0", "16"]}>
      <form
        onSubmit={() => {
          handleSubmit();
          onSubmit();
        }}
        style={{ width: "100%" }}
      >
        <VStack spacing={4} align="flex-start">
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              name="fullname"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel for="Country">Country</FormLabel>
            <Select
              options={options}
              onChange={(values) => {
                if (values && values.length > 0) {
                  setCountry(values[0].label);
                }
              }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>State</FormLabel>
            <Input
              type="text"
              name="state"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <PhoneInput
              international
              defaultCountry="IN"
              value={mobile}
              onChange={setMobile}
              className="PhoneInputInput "
              style={customStyles}
            />
          </FormControl>

          <FormControl>
            <FormLabel>LinkedIn Profile </FormLabel>
            <Input
              type="url"
              name="linkedInProfile"
              value={linkdinurl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Personal Website </FormLabel>
            <Input
              type="url"
              name="personalWebsite"
              onChange={(e) => setPortfolioUrl(e.target.value)}
              value={PortfolioUrl}
            />
          </FormControl>

          <Button type="submit" bgColor={"#1c1c1c"} textColor={"white"}>
            Next
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}






function SecondForm({ onSubmit, activeStep }) {

  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [Experience, setExperience] = useState("");
  const [content, setContent] = useState('');

  const handleChange = (content, delta, source, editor) => {
    setContent(content);
    console.log(content);
  };

  const addTag = (value) => {
    // Prevent adding empty or duplicate tags
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
    setInput("");
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };






  const form2Data = {
    skillarray: tags,
    experience:content
  };
  const handleSubmit = () => {
    localStorage.setItem("form2Data", JSON.stringify(form2Data));
  
  };

  const getfromlocal = async () => {
    try {
      const form2datafromlocalstring = localStorage.getItem("form2Data");
      if (form2datafromlocalstring != null) {
        const form2datafromlocal = JSON.parse(form2datafromlocalstring);
        setTags(form2datafromlocal.skillarray);
        setExperience(form2datafromlocal.experience);
        
      
      }
    } catch (error) {}
  };

  useEffect(() => {
    getfromlocal();
  }, []);




  return (
    <VStack w={["full", "30vw"]}  m={["0", "16"]}>

<HStack w={'100%'}>
<ReactQuill  placeholder="Tell us your work experiences" onChange={handleChange} style={{width:'70vw'}} />
        </HStack>
        {/* <div dangerouslySetInnerHTML={{ __html: Experience }} /> */}

      <form
        onSubmit={() => {
          handleSubmit();
          onSubmit();
        }}
        style={{ width: "100%" }}
      >
        <VStack spacing={4} align="flex-start">
          <FormControl>
            <HStack>
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Add Skills"
              />
              <IconButton
                aria-label="Add tag"
                icon={<IoMdAdd />}
                onClick={() => addTag(input.trim())}
              />
            </HStack>
            <Flex flexWrap={'wrap'} gap={'2'} w={'full'} mt={'2'}>

          
              {tags.map((tag, index) => (
                <Tag size="lg" key={index} borderRadius="full">
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => removeTag(index)} />
                </Tag>
              ))}
            
              </Flex>
          </FormControl>

          <HStack w={"full"} justifyContent={"space-between"}>
            <Button
              onClick={() => activeStep(0)}
              bgColor={"#1c1c1c"}
              textColor={"white"}
            >
              Prev
            </Button>
            <Button type="submit" bgColor={"#1c1c1c"} textColor={"white"}>
              Next
            </Button>
          </HStack>
        </VStack>
      </form>
    </VStack>
  );
}



function ThiredForm({ activeStep }) {

  const { id } = useParams();
  const Navigate = useNavigate();
const [name,setname]= useState('');
const [city,setcity]= useState('');
const [country,setcountry]= useState('');
const [skillarray,setskillarray]= useState('');
const [linkdinurl,setlinkdinurl]= useState('');
const [weburl,setweburl]= useState('');
const [mobile,setmobile]= useState('');
const [summary,setsummary]= useState('');
const [img,setImg]= useState('');
const [Experience,setExperience]= useState('');
const [file, setFile] = useState(null);
const [base64URL, setBase64URL] = useState("");
const [Title, setTitle] = useState("");



const handleChange = (content, delta, source, editor) => {
  setsummary(content);
  console.log(content);
};

const handleFileInputChange = (e) => {
  const file = e.target.files[0];
  setFile(file);
};
useEffect(() => {
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64URL(reader.result);
      setImg(reader.result);
      console.log(reader.result);
    };
  }
}, [file]);






  const getfromlocal = async () => {
    try {
      const form1datafromlocalstring = localStorage.getItem("form1Data");
      const form2datafromlocalstring = localStorage.getItem("form2Data");
      if (form1datafromlocalstring != null) {
        const form1datafromlocal = JSON.parse(form1datafromlocalstring);
        setcity(form1datafromlocal.state);
        setcountry(form1datafromlocal.country);
        setlinkdinurl(form1datafromlocal.linkdinurl);
        setweburl(form1datafromlocal.PortfolioUrl);
        setname(form1datafromlocal.name);
        setmobile(form1datafromlocal.mobile);
      
      }
      if (form2datafromlocalstring != null) {
        const form2datafromlocal = JSON.parse(form2datafromlocalstring);
        setskillarray(form2datafromlocal.skillarray);
        setExperience(form2datafromlocal.experience);
      
      }

      
    } catch (error) {}
  };

  useEffect(() => {
    getfromlocal();
  }, []);





const SubmitFormsHandle = async(e)=>{
  e.preventDefault();

  try {

      const response = await fetch(
        `${Backend_Url}/0auth/CreateDeveloperProfile/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: country,
            city,
            summary: summary,
            mobile,
            name,
            skill: skillarray,
            img,
            experience:Experience,
            linkdin: linkdinurl,
            website: weburl,
            jobtitle:Title
          }),
          credentials: "include",
        }
      );



      if (response.status == 200) {
        localStorage.removeItem('form1Data');
        localStorage.removeItem('form2Data');
        showToast("Registered successfully!", "success");
        Navigate(`/login`);

      } else {
        showToast("Failed to make Profile", "error");

      }
    
  } catch (error) {
console.log("from submit"+error);
  }

}
const toast = useToast();
const showToast = (text, color) => {
  toast({
    title: text,
    position: "top",
    isClosable: true,
    status: color,
  });
};

const [currentTextIndex, setCurrentTextIndex] = useState(0);
useEffect(() => {
  // Function to cycle through images and text
  const cycleContent = () => {
    setCurrentTextIndex((prevIndex) => (prevIndex + 1) % Titles.length);
  };

  // Set up an interval to switch content every 3 seconds (adjust as needed)
  const contentInterval = setInterval(cycleContent, 1000); // 3000 milliseconds (3 seconds)

  // Clean up the interval when the component unmounts
  return () => clearInterval(contentInterval);
}, []);


  return (
    <>

 <VStack w={["full", "30vw"]}  m={["0", "16"]} >
           <Text fontSize={'xl'} w={'full'} letterSpacing={'wider'} textAlign={'left'}>I do <b>{Titles[currentTextIndex]} </b> </Text>
           <FormControl isRequired>
            <Input
              type="text"
              name="title"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write your role here..."
            />
          </FormControl>
         
          <HStack w={"full"}   >
                      <label htmlFor="avatar" className="cursor-pointer">
                        <img
                          src={
                            base64URL
                            ? base64URL
                            : "https://github.com/oragetech/assests/blob/main/uploadbannercover-removebg-preview.png?raw=true"
                          }
                          alt="Avatar"
                          style={{
                            width: "100px",
                            height: "100px",
                 
                            objectFit: "cover",
                          }}
                          />
                      </label>
                    <Text opacity={'.8'}>Upload Banner</Text>
                    <Text opacity={'.8'} fontSize={'sm'}>(1080 X 1920)</Text>
                    </HStack>
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      hidden
                      onChange={handleFileInputChange}/>
                    

 <HStack w={'100%'} >
<ReactQuill className="ql"  placeholder="Tell us about you briefly" onChange={handleChange} style={{width:'80vw'}} />
        </HStack>
        {/* <div dangerouslySetInnerHTML={{ __html: Experience }} /> */}
                
      <HStack w={"full"}  justifyContent={"space-between"}>
        <Button
          onClick={() => activeStep(1)}
          bgColor={"#1c1c1c"}
          textColor={"white"}
          >
          Prev
        </Button>
        <Button onClick={SubmitFormsHandle} bgColor={"#1c1c1c"}  textColor={"white"}>
          Submit 
        </Button>
      </HStack>
          </VStack>
    </>
  );
}

export default DeveloperForm;

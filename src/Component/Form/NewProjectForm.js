import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Backend_Url } from "../../Path.js";
import api from '../../Utils/api.js';
import { HStack, Stack, VStack, useToast,Tooltip } from '@chakra-ui/react';
import { MdOutlineWorkHistory, MdWorkOutline } from 'react-icons/md'
import { BiArrowBack } from 'react-icons/bi';

const NewProjectForm = () => {
  const [CompanyName, setCompany] = useState('');
  const [estimateTime, setestimateTime] = useState('');
  const [Technology, setTechnology] = useState('');
  const [ProjectSummary, setProjectSummary] = useState('')
  const [ProjectMoney, setProjectMoney] = useState('');
  const [level, setLevel] = useState("Bronze");
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [toastmsg, settoastmsg] = useState('');
  const Navigate = useNavigate();

  const [byteArray, setByteArray] = useState(null);


  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const arrayBuffer = e.target.result;

  //       if (arrayBuffer) {
  //         const byteArray = new Uint8Array(arrayBuffer);

  //         // Set the byte data in state
  //         setByteArray(JSON.stringify(Array.from(byteArray)));

  //         // Optionally, you can store it in local storage
  //         // localStorage.setItem('myByteArray', JSON.stringify(Array.from(byteArray)));
  //       }
  //     };

  //     reader.readAsArrayBuffer(file);
  //   }
  // };


  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLoading) {
      return; // Do nothing if the button is already in the loading state
    }

    setIsLoading(true);

    // Simulate a 3-second delay before allowing the form to be submitted
    setTimeout(() => {
      // After 3 seconds, submit the form programmatically
      e.target.submit();
    }, 3000);
    try {
      if (CompanyName == '' || estimateTime == '' || Technology == '') {
        showToast('Please fill all details ', 'error');
    

        return;
      }
      else {
        const response = await fetch(`${Backend_Url}/0auth/createProject/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ technology: Technology, estimateTime, ProjectSummary, ProjectMoney, CompanyName, level }),
          credentials: 'include',
        });


        const responseData = await response.json();
    
        if (response.status == 200) {
          showToast('task Posted ', 'success');
          Navigate(`/DashBoard/Hire/${id}`)
     
        }
        else {
          showToast('Failed to make post ', 'error');
       
        }
      }
    } catch (error) {
 

    }


  }



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/getDetailsByID/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });


        if (response.status === 200) {
          const { userData } = response.data;

        } else {
        }
      } catch (error) {
      }
    }

    fetchData(); // Call the fetchData function

    // Specify dependencies for the useEffect hook (e.g., id, apiBaseUrl)
  }, [id]);


  const toast = useToast();
  const showToast = (text, color) => {
    toast({
      title: text,
      position: 'top',
      isClosable: true,
      status: color,

    })
  };



  return (
    <>

      <Stack >

        <div className=" flex flex-col mt-14   ">

          <div className="flex  justify-center mx-4 sm:mx-0 ">
            <div className="  w-3/4  md:w-2/5  px-6 sm:px-24 py-10  box-content rounded-xl">
              <HStack><Link to={`/DashBoard/Hire/${id}`}><BiArrowBack size={'24'} /></Link></HStack>
              
              <VStack>
                <MdOutlineWorkHistory color='#1c1c1c' size={'30'} />
                <p className=' text-lg  sm:text-3xl font-bold text-[#1c1c1c] '>New Job Post</p>
              </VStack>
              <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit} >
                <div className="mb-2">
                      
                  <input
                    placeholder='Job Title*'
                    required={true}
                    onChange={(e) => setCompany(e.target.value)}
                    className="  block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"

                  />
                </div>
                <Stack w={'full'} justifyContent={'space-between'} direction={['column', 'row']}>

                  <div className="mb-2">
                    <label
                      for="name"
                      className="text-left ml-4 block text-sm font-semibold text-gray-800"
                    >
                    Technical requirements
                    </label>
                    <input
                      placeholder="dotnet,MERN,Blender"
                      required={true}
                      onChange={(e) => setTechnology(e.target.value)}
                      className="  block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"

                    />
                  </div>
                  <div className="mb-2">
                    <label
                      for="name"
                      className="text-left ml-4 block text-sm font-semibold text-gray-800"
                    >
                      Project Duration (Days)
                    </label>
                    <input
                      placeholder='10 days '
                      type='number'
                      required={true}
                      onChange={(e) => setestimateTime(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </Stack>

                <div>
                  <label
                    for="msg"
                    className="text-left ml-4  block text-sm font-semibold text-gray-800"
                  >
                    Project Summary
                  </label>
                  <textarea
                    required={true}
                    className={`block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40
                        `}
                    id="exampleFormControlTextarea1"
                    rows={3}
                    placeholder="Project Summary"
                    defaultValue={""}
                    value={ProjectSummary}
                    onChange={(e) => setProjectSummary(e.currentTarget.value)}
                  />
                </div>


                <div className="mb-2">
                  <label
                    for="Mobile"
                    className="text-left ml-4  block text-sm font-semibold text-gray-800"
                  >
                    Project Money
                  </label>
                  <input
                  type='number'
                    placeholder='$'
                    required={true}
                    onChange={(e) => setProjectMoney(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="level" // Use htmlFor instead of "for" for accessibility
                    className="text-left ml-4 block text-sm font-semibold text-gray-800"
                  >
                    Set Level
                  </label >
                  <select
                    id="level"

                    value={level} // Assuming you have a state variable named "role" to store the selected value
                    onChange={(e) => setLevel(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  >

                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Recommended">Recommended</option>


                    {/* Add more role options as needed */}
                  </select>
                </div>
                {/* <div>
                          <input type="file" onChange={handleFileChange} />
                         
                      </div> */}

                <div

                  className="mt-6">
                  <button type='submit'  disabled={isLoading} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#1c1c1c] rounded-md hover:bg-[#1c1c1cb9] focus:outline-none focus:bg-[#053B50]">
                  {isLoading ? 'Loading...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </Stack>

    </>


  );
}

export default NewProjectForm;
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Backend_Url } from '../../Path';
import { Button, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import { BsBuildingCheck } from 'react-icons/bs'
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from 'axios';
import Select from 'react-dropdown-select';

const HireProfileForm = () => {
    const [email, setemail] = useState('');
    const [company, setCompany] = useState('');
    const [city, setCity] = useState('');
    const [mobile, setMobile] = useState('');
    const [Summary, setSummary] = useState('');
    const [Country, setCountry] = useState('');
    const [value, setValue] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [toastmsg, settoastmsg] = useState('');
    const [loading, setloading] = useState(false);
  const [img, setImg] = useState(null);


    const Navigate = useNavigate();
    const options = value?.map((item, id) => ({
        value: id,
        label: item.name.common,
        flags: item.flags[1],
    }));
    const country = async () => {
        try {
            const response = await axios.get("https://restcountries.com/v3/all");
            setValue(response?.data);
        } catch (error) {
           
        }
    };

    useEffect(() => {
        country();
    }, []);
    const handleFileChange = (e) => {
        setloading(true);
        const file = e.target.files[0];
    
        const fileReader = new FileReader();
    
        fileReader.onload = () => {
          if (fileReader.readyState === FileReader.DONE) {
            setImg(fileReader.result);
            setloading(false);
          }
        };
        fileReader.readAsDataURL(file);
      };
 

    const { id } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (mobile.replace(/\D/g, '').length != 12) {
            // If the phone number has less than 10 digits, show an error message
            alert('Phone number must have at least 10 digits');
            return; // Prevent the form from submitting
          }
        try {
            if (company == '' || city == '' || mobile == '' || Country == '' || Summary == '' || img == " ") {
                showToast('Please fill all details ', 'error');
            

                return;
            }
            else {
                const response = await fetch(`${Backend_Url}/0auth/CreateHireProfile/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ country: Country, city, summary: Summary, mobile, name: company , img }),
                    credentials: 'include',
                });


                const responseData = await response.json();
             
                if (response.status == 200) {
                    showToast('profile added', 'success');
                    Navigate(`/DashBoard/Hire/${id}`)
                 
                }
                else {
                    showToast('error happened', 'error');
                  
                }
            }
        } catch (error) {

        }


    }
    const toast = useToast();
    const showToast = (text, color) => {
        toast({
            title: text,
            position: 'top',
            isClosable: true,
            status: color,

        })
    };
    const customStyles = {
        border: '2px solid #ccc',
        borderRadius: '5px',
        padding: '8px',
        fontSize: '16px',

    };

    return (
        <>
            <div className='h-full mt-4 '>


                <div className=" flex flex-col mt-24   ">

                    <div className="flex justify-center mx-4 sm:mx-0 ">
                        <div className="  w-3/4  md:w-2/5  border-1  px-6 sm:px-24 py-10  box-content rounded-xl">
                            <VStack>
                                <BsBuildingCheck size={'40'} />
                                <Text textColor={'#1c1c1c'} fontSize={'2xl'}>Register Oragnization</Text>

                            </VStack>
                            <form className="mt-6" onSubmit={handleSubmit}>
                            {loading ? (
                  <Spinner size="lg" />
                ) : (
                  <>
                    <VStack w={"full"} alignItems={"center"}>
                      <label htmlFor="avatar" className="cursor-pointer">
                        <img
                          src={
                            img
                              ? img
                              : "https://refine.dev/img/generic-profile.png"
                          }
                          alt="Avatar"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </label>
                      <Button
                        variant={"solid"}
                        
                        htmlFor="avatar"
                        as="label"
                        style={{ cursor: "pointer" }}
                      >
                        Upload Oragnization photo
                      </Button>
                    </VStack>
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange}
                    />
                  </>
                )}
                                <div className="mb-2">
                                    <label
                                        for="Company Name"
                                        className="text-left ml-4  block text-sm font-semibold text-gray-800"
                                    >
                                        Oragnization
                                    </label>
                                    <input
                                        required={true}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        for="City"
                                        className="text-left ml-4  block text-sm font-semibold text-gray-800"
                                    >
                                        City
                                    </label>
                                    <input
                                        required={true}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="mb-2 text-left">
                                    <label
                                        for="Mobile"
                                        className="text-left ml-4  block text-sm font-semibold text-gray-800"
                                    >
                                        Country
                                    </label>
                                    <Select 
                                        options={options}
                                        onChange={(values) => {
                                            if (values && values.length > 0) {
                                                setCountry(values[0].label);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        for="Mobile"
                                        className="text-left ml-4  block text-sm font-semibold text-gray-800"
                                    >
                                        Mobile
                                    </label>
                                    {/* <input
                                required={true}
                                onChange={(e)=>setMobile(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
                                /> */}
                                    <PhoneInput
                                        international
                                        defaultCountry="IN"
                                        value={mobile}
                                        onChange={setMobile}
                                        className="PhoneInputInput "
                                        style={customStyles}

                                    />
                                </div>
                                <div>
                                    <label
                                        for="Summary"
                                        className="text-left ml-4  block text-sm font-semibold text-gray-800"
                                    >
                                       Write about your Oragnization
                                    </label>
                                    <textarea
                                        required={true}
                                        className={`block w-full px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40`}
                                        id="exampleFormControlTextarea1"
                                        rows={3}
                                        placeholder="Your message"
                                      
                                        value={Summary}
                                        onChange={(e) => setSummary(e.currentTarget.value)}
                                    />
                                </div>
                                <div className="mt-6">
                                    <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#053B50] rounded-md hover:bg-[#053B50] focus:outline-none focus:bg-[#053B50]">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>


        </>


    );
}

export default HireProfileForm
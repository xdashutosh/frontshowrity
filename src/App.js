
import './App.css';
import { messaging } from "./Firebase/FirebaseConfig";
import { getToken } from "firebase/messaging";
import SpinnerLoader from './Component/LoaderC/SpinnerLoader';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import { lazy ,Suspense, useEffect, useState } from 'react';
import axios from 'axios';


import { Backend_Url } from './Path';
import BlogsLoader from './Component/Loaders/BlogsLoader';
import { Spinner, VStack } from '@chakra-ui/react';
import DeveloperLoader from './Component/Loaders/DeveloperLoader';
import Service from './Pages/Service';
import FilterDeveloper from './Component/FilterDeveloper';
import HeaderDev from './Component/HeaderDev';
import Headerhire from './Component/Headerhire';
import Filteredjobs from './Component/Filteredjobs';
const Home = lazy(() => import('./Pages/Home'));
const LoginPage = lazy(() => import('./Pages/LoginPage'));
const Register = lazy(() => import('./Pages/Register'));
const DashBoardDeveloper = lazy(() => import('./Pages/DashBoard/DashBoardDeveloper'));
const Blog = lazy(() => import('./Pages/Blog'));
const Profile = lazy(() => import('./Pages/Profile'));
const DashBoardHire = lazy(() => import('./Pages/DashBoard/DashBoardHire'));
const ProjectHire = lazy(() => import('./Pages/ProjectDetail/ProjectHire'));
const OtpVerify = lazy(() => import('./Pages/OtpVerify'));
const Contact = lazy(() => import('./Pages/contact/Contact'));
const HireProfileForm = lazy(() => import('./Component/Form/HireProfileForm'));
const DeveloperForm = lazy(() => import('./Component/Form/DeveloperForm'));
const NewProjectForm = lazy(() => import('./Component/Form/NewProjectForm'));
const HireProfile = lazy(() => import('./Pages/HireProfile'));
const DeveloperProfile = lazy(() => import('./Pages/DeveloperProfile'));
const AllDeveloper = lazy(() => import('./Pages/AllDevloperPage/AllDeveloper'));
const AllBlogs = lazy(() => import('./Pages/AllBlogs'));
const ParticularBlog = lazy(() => import('./Pages/ParticularBlog'));
const AllJobPage = lazy(() => import('./Pages/AllJobs/AllJobPage'));
const PasswordCreate = lazy(() => import('./Googleauth/PasswordCreate'));
const Notification1 = lazy(() => import('./Pages/Notification/Notification'));
const Payment = lazy(() => import('./Pages/Payment/Payment'));
const DeveloperWallet = lazy(() => import('./Pages/Walllet/DeveloperWalletPage'));
const HireWalletPage = lazy(() => import('./Pages/Walllet/HireWalletPage'));
const NotFoundPage = lazy(() => import('./Pages/PageNotFoun/NotFoundPage'));
const ForgetPasswordP = lazy(() => import('./Pages/ForgetPassword/ForgetPasswordP'));
const OtpForget = lazy(() => import('./Component/OtpVerify/OtpForget'));
const SetPassword = lazy(() => import('./Pages/SetPassword/SetPassword'));




const AnotherLoader = ()=>{
return (
  <VStack h={'100vh'} w={'full'} justifyContent={'center'} alignItems={'center'}>
  <Spinner size='xl' h={['100px',"500px"]} w={['100px',"500px"]} />
  </VStack>
)
}




function App() {
  const[token,setToken]=useState();
  const requestpermission=async()=>{
    const permission =await Notification.requestPermission();
    if(permission==="granted")
    {
   
      const fcmtoken=await getToken(messaging,{
        vapidKey:"BOB89mzYOCfWVZqX4LNJy2-b__FVN9lrE63X9KgJc0oQ3bmvyCa9czIicTNhohx9GfU6pTBN5Ek2xbFgxyyMc3A"
      });
   
      setToken(fcmtoken);
      sendTokenToAPI(fcmtoken);
    }
    else if(permission==="denied"){
      
  
    }
  } 

  async function sendTokenToAPI(fcmToken) {
    try {
      const id = Math.floor(Math.random() * 1000);
      const response = await axios.post(`${Backend_Url}/0token/settoken`, {
        token: fcmToken,
        id,
      });
     
    } catch (error) {
  
    }
  }
  useEffect(()=>{
    requestpermission();

  },[]);
  return (
    <div className="App">
       <BrowserRouter>
                                                      
            <Routes>
                <Route path='/' element={(
              <Suspense fallback={<SpinnerLoader/>}>
                <Home />
              </Suspense>
            )}></Route>

<Route path='/freelancer' element={(
              <Suspense fallback={<SpinnerLoader/>}>
                <HeaderDev />
              </Suspense>
            )}></Route>

            <Route path='/hire' element={(
              <Suspense fallback={<SpinnerLoader/>}>
                <Headerhire />
              </Suspense>
            )}></Route>

              
                <Route path='/Login' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <LoginPage />
              </Suspense>
            )}></Route>

<Route path='/privacy-policy' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <Service/>
              </Suspense>
            )}></Route>

            <Route path='/filterdeveloper/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <FilterDeveloper/>
              </Suspense>
            )}></Route>
             <Route path='/filteredjobs/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <Filteredjobs/>
              </Suspense>
            )}></Route>

                <Route path='/Register'
                element={(
                  <Suspense fallback={<AnotherLoader/>}>
                  
                    <Register />
                  </Suspense>
                )}
                ></Route>
                
                <Route path='/DashBoard/Developer/:id'element={(
              <Suspense fallback={<AnotherLoader/>}>
                <DashBoardDeveloper />
              </Suspense>
            )}></Route>
                <Route path='/Blog' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <Blog />
              </Suspense>
            )}></Route>
                <Route path='/profile/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <Profile />
              </Suspense>
            )}></Route>
                <Route path='/DashBoard/Hire/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <DashBoardHire />
              </Suspense>
            )}></Route>
                <Route path='/ProjectDetails/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <ProjectHire />
              </Suspense>
            )} ></Route>
                <Route path='/otp/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <OtpVerify />
              </Suspense>
            )} ></Route>
                <Route path='/otpForget/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <OtpForget />
              </Suspense>
            )} ></Route>
                <Route path='/contactUs'element={(
              <Suspense fallback={<AnotherLoader/>}>
                <Contact />
              </Suspense>
            )}></Route>
                <Route path='/HireProfileForm/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <HireProfileForm />
              </Suspense>
            )}></Route>
                <Route path='/DeveloperProfileForm/:id'element={(
              <Suspense fallback={<AnotherLoader/>}>
                <DeveloperForm />
              </Suspense>
            )}></Route>
                <Route path='/HireProfile/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <HireProfile />
              </Suspense>
            )}></Route>
                <Route path='/DeveloperProfile/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <DeveloperProfile />
              </Suspense>
            )}></Route>
                <Route path='/Blogs' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <Blog />
              </Suspense>
            )}></Route>

                <Route path='/JobPost/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <NewProjectForm />
              </Suspense>
            )}></Route>
                <Route path='/AllDeveloper'element={(
              <Suspense fallback={<DeveloperLoader/>}>
                <AllDeveloper />
              </Suspense>
            )}></Route>
                <Route path='/allblogs' element={(
              <Suspense fallback={<BlogsLoader/>}>
                <AllBlogs />
              </Suspense>
            )}></Route>
                <Route path='/Blog/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <ParticularBlog />
              </Suspense>
            )}></Route>
                <Route path='/AllJobs' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <AllJobPage />
              </Suspense>
            )}></Route>
                <Route path='/PasswordCreate/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <PasswordCreate />
              </Suspense>
            )}></Route>
                <Route path='/Notification/:id'element={(
              <Suspense fallback={<AnotherLoader/>}>
                <Notification1 />
              </Suspense>
            )}></Route>
                
                <Route path='/paymentsuccess' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <Payment />
              </Suspense>
            )}></Route>
                <Route path='/walletDeveloper/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <DeveloperWallet />
              </Suspense>
            )}></Route>
                <Route path='/walletHire/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <HireWalletPage />
              </Suspense>
            )}></Route>
                <Route path='/forgetPassword' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <ForgetPasswordP />
              </Suspense>
            )}></Route>
                <Route path='/SetPassword/:id' element={(
              <Suspense fallback={<AnotherLoader/>}>
                <SetPassword />
              </Suspense>
            )}></Route>
                
               
                <Route path="*" element={(
              <Suspense fallback={<AnotherLoader/>}>
                <NotFoundPage />
              </Suspense>
            )} />
            
            
            </Routes>
          
       </BrowserRouter>
    </div>
  );
}

export default App;









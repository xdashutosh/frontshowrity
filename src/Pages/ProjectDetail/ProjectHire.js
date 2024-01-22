import React, { useEffect } from 'react'

import Footer from '../../Component/Footer'
import ProjectDetails from '../../Component/ProjectDescription/ProjectDetails'
import NavBar from '../../Component/DahBoard/DashBoarddeveloper/DashNav'
import api from '../../Utils/api'
import { useParams } from 'react-router-dom'

const ProjectHire = () => {
  const { id } = useParams();

  

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
  return (
    <div className="flex flex-col h-[100vh] justify-between ">
      
        <NavBar/>
       <ProjectDetails/> 
      
      
      <Footer/>
    </div>
  )
}

export default ProjectHire
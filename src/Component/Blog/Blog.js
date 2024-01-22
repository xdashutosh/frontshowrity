import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import img1 from '../../images/The-Power-of-Chatbots-in-Streamlining-the-Recruitment-Process.jpg'
import { Link } from 'react-router-dom'
import { Backend_Url } from '../../Path'


const Blog = () => {
  const [data, setdata] = useState([])

  


useEffect(() => {
async function fetchData() {
try {
  const response = await fetch(`${Backend_Url}/0auth/getAllBlogs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const result = await response.json();


  setdata(result.Blog);
  
} catch (err) {

}
}

fetchData();

// Return a cleanup function
return () => {

};
}, []);
            
  return (
    data?<>
          <div className='flex flex-col '>
              <p className='text-2xl text-[#1C1C1C] font-bold my-4'>Our most Popular  <span className='text-[#22495baa]'>Blogs  </span> </p>
                <div className=' flex flex-col gap-4  sm:flex-row sm:flex-wrap'>
                  {
                    data?<>
                    <BlogCard data={data[0]}/>
                    <BlogCard data={data[1]}/>
                    <BlogCard data={data[2]}/>
                    <BlogCard data={data[3]}/> 
                    
                    </>:<></>
                  }
                  {/* */}
                </div> 
                <div className='flex justify-center   my-3 '>
                <Link to='/allblogs'>
                    <p className=' cursor-pointer hover:text-[#EEEEE] hover:bg-[#176B87] bg-[#1C1C1C] px-3 py-2 text-[#FFFFFF] w-18 font-bold rounded-lg '>
                     Read Out</p> 
                     </Link>

                </div>

            </div>
    
    
    </>:<></>
    
  )
}

export default Blog
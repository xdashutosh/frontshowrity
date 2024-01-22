import React, { useEffect, useState } from "react";
import { Backend_Url } from "../../../Path";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HStack, Text } from "@chakra-ui/react";

const TaskCard = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());

  const [allPost, setAllPost] = useState([]);

  const totalPages = Math.ceil(allPost.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  function calculateItemsPerPage() {
    if (window.innerWidth > 1440) {
      return 3;
    } else if (window.innerWidth > 640) {
      return 2;
    } else {
      return 1;
    }
    // return window.innerWidth < 768 ? 1 : 3; // Adjust as needed
  }

  const changePage = (str, total) => {
    if (str == "i" && currentPage != total) {
      setCurrentPage(currentPage + 1);
    } else if (str == "d" && currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Update itemsPerPage when the window size changes
  useEffect(() => {
    function handleResize() {
      setItemsPerPage(calculateItemsPerPage());
    }

    window.addEventListener("resize", handleResize);
  });

  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${Backend_Url}/0auth/showAllPost`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();

        setAllPost(result);
        console.log(result);
      } catch (err) {}
    }

    fetchData();

    // Return a cleanup function
    return () => {
      // Perform any cleanup actions here if needed
    };
  }, []);

  const explorearr = allPost.slice(startIndex, endIndex);

  const Navigate = useNavigate();
  const handleClick = (id) => {
    Navigate(`/ProjectDetails/${id}`);
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <div className="flex gap-10 justify-center   mt-5">
          {explorearr.map((data, index) => (
            <div className="  shadow-lg p-4 rounded-2xl">
              <div
                className="flex flex-col gap-1 cursor-pointer"
                onClick={() => handleClick(data._id)}
              >
                {/* <img className='border-2 border-black rounded-md' src={img}></img> */}
                <div className="flex flex-col pl-1 gap-1 mt-2">
                  <div className="flex justify-between mb-2 ">
                    <p className="font-bold text-xl font-sans">
                      {data.companyName}
                    </p>
                    <p className="bg-orange-300 px-2 py-1 rounded-lg text-orange-800 font-bold">
                      {data.level}
                    </p>
                  </div>
                  <p className="text-left text-slate-700 font-medium font-sans">
                    <b>{data.technology}</b>
                  </p>
                  <p className="text-left    text-slate-500 font-medium font-sans">
                    {data.ProjectSummary.split(" ").slice(0, 15).join(" ")}
                  </p>
                  <p className="text-left text-slate-400 font-medium font-sans">
                    <b>Duration</b>
                    &nbsp;
                    {data.estimateTime} days
                  </p>

                  <p className="text-left text-slate-400 font-medium font-sans">
                    <b>Project Budget</b> ${data.ProjectMoney}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-6 justify-center ">
          <div className="flex gap-4 items-center">
            <p
              className={`${
                currentPage == 1 ? "opacity-10" : ""
              } bg-[#1c1c1c] text-white px-3 py-2 rounded-lg cursor-pointer`}
              onClick={() => changePage("d", allPost.length)}
            >
              Prev
            </p>
            <p className="bg-[#EEEEEE] px-3 py-2 rounded-full">{currentPage}</p>

            <p
              className={`${
                currentPage == allPost.length ? "opacity-0" : ""
              } bg-[#1c1c1c] text-white px-3 py-2 rounded-lg cursor-pointer`}
              onClick={() => changePage("i", allPost.length)}
            >
              Next
            </p>
          </div>
        </div>

        <HStack w={"full"} justifyContent={"end"}>
          <Link to="/AllJobs">
            <p className="cursor-pointer hover:text-[#EEEEEE] hover:bg-[#1c1c1c] bg-[#1c1c1c] px-3 py-2 text-[#ffffff] w-18 font-bold rounded-lg">
              Explore All
            </p>
          </Link>
        </HStack>
      </div>
    </>
  );
};

export default TaskCard;

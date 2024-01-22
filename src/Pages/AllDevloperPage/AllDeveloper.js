import React, { useEffect, useState } from "react";
import NavBar from "../../Component/NavBar";
import Footer from "../../Component/Footer";
import { Backend_Url } from "../../Path";
import SellerCard from "../../Component/SellerCard";
import Jobcard from "../../Component/AllJobPostc/Jobcard";
import DeveloperLoader from "../../Component/Loaders/DeveloperLoader";
import { Button, HStack, Stack } from "@chakra-ui/react";

const AllDeveloper = () => {
  const [allPost, setAllPost] = useState([]);
  const [search, setsearch] = useState("");
  const [searchdeveloper, setsearchdeveloper] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let searchbutton = "#1c1c1c";

  const [itemsPerPage, setitemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the items to display only those within the calculated range
  const itemsToDisplay = allPost.slice(startIndex, endIndex);

  const changePage = (str, total) => {
    if (str == "i" && currentPage != total) {
      setCurrentPage(currentPage + 1);
    } else if (str == "d" && currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(allPost.length / itemsPerPage);

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${Backend_Url}/0auth/SearchDeveloperbyTechnologyAndName?Name=${searchdeveloper}&technology=${search}`,
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-col justify-center ">
        <p className="text-2xl text-black font-bold my-4">
          All <span className="text-[#64CCC5]">Developer's</span>{" "}
        </p>
        <Stack
          direction={["column", "row"]}
          w={"full"}
          justifyContent={"center"}
        >
          <div className="flex  justify-center  gap-2">
            <input
              placeholder="category"
              onChange={(e) => setsearch(e.target.value)}
              className="  block  px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="flex justify-center  gap-2">
            <input
              placeholder="Search by Name"
              onChange={(e) => setsearchdeveloper(e.target.value)}
              className="  block  px-4 py-2 mt-2 text-[#053B50] bg-white border rounded-md focus:border-[#053B50] focus:ring-[#053B50] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </Stack>
        <div className="mt-2 w-1/4 flex justify-center mx-auto ">
          <p className="cursor-pointer  py-2 rounded-lg">
            <Button
              bgColor={"#1c1c1c"}
              px={"2"}
              textColor={"white"}
              onClick={() => fetchData()}
              variant={"unstyled"}
            >
              Search
            </Button>
          </p>
        </div>
      </div>
      <div className="flex gap-10 justify-center flex-wrap  mt-5 mb-3 mx-4">
        {loading ? (
          <></>
        ) : error ? (
          <p>Error: {error}</p>
        ) : itemsToDisplay.length > 0 ? (
          itemsToDisplay.map((item, index) => <SellerCard data={item} />)
        ) : (
          <></>
        )}
      </div>
      <div className="flex gap-6 justify-center my-4 ">
        <div className="flex gap-4 items-center">
          <p
            className={`${
              currentPage == 1 ? "opacity-10" : ""
            } bg-[#1c1c1c] text-white px-3 py-2 rounded-lg`}
            onClick={() => changePage("d", allPost.length)}
          >
            Prev
          </p>
          <p className="bg-[#EEEEEE] px-3 py-2 rounded-full">{currentPage}</p>
          <p
            className={`${
              currentPage == totalPages ? "opacity-0" : ""
            } bg-[#1c1c1c] text-white px-3 py-2 rounded-lg`}
            onClick={() => changePage("i", allPost.length)}
          >
            Next
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllDeveloper;

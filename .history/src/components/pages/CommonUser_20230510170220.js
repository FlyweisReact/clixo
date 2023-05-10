/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";
import axios from "axios";

const CommonUser = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
   // Pagination
   const [currentPage2, setCurrentPage2] = useState(1);
   const [postPerPage2] = useState(10);
   const lastPostIndex2 = currentPage2 * postPerPage2;
   const firstPostIndex2 = lastPostIndex2 - postPerPage2;
   let pages2 = [];
   const TotolData = query
     ? data?.filter(
         (i) =>
           i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
           i?.phoneNumber
             ?.toString()
             ?.toLowerCase()
             .includes(query?.toLowerCase())
       )
     : data;
 
   useEffect(() => {
     if (query) {
       setCurrentPage2(1);
     }
   }, [query]);
 
   const slicedData = TotolData?.slice(firstPostIndex2, lastPostIndex2);
 
   for (let i = 1; i <= Math.ceil(TotolData?.length / postPerPage2); i++) {
     pages2.push(i);
   }
 
   function Next() {
     setCurrentPage2(currentPage2 + 1);
   }
 
   function Prev() {
     if (currentPage2 !== 1) {
       setCurrentPage2(currentPage2 - 1);
     }
   }
 

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/common/all"
      );
      setData(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);



  return (
    <>


      <section
        style={{
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
      >
        <div className="pb-4   w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "20px", fontWeight: "400" }}>
            All Common User's
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div>
          <div style={{ color: "black" }}>
            Search:{" "}
            <input
              type={"search"}
              style={{
                border: "1px solid #bfbfbf",
                width: "250px",
                color: "black",
                padding: "5px",
              }}
              placeholder="Search by Name , Phone number"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "2%",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Number </th>
                <th> Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>City</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Website</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
                {slicedData?.map((i , index) => (
                    <tr key={index}>
                      <td> {index + 1} </td>
                      <td> {i.name} </td>
                      <td> {i.email} </td>
                      <td> {i.phoneNumber} </td>
                      <td> {i.city} </td>
                      <td> {i.Gender} </td>
                      <td> {i.DateOfBirth} </td>
                      <td> {i.Website} </td>
                      <td> {i.rating} </td>
                    </tr>
                ))} 
            </tbody>
          </Table>
        </div>
        <div className="PaginationBox">
          <p>
            {" "}
            Showing <strong>{slicedData?.length}</strong> out of{" "}
            <strong>{data?.length}</strong>{" "}
          </p>
          <div className="pagination">
            <button onClick={() => Prev()} className="prevBtn">
              Previous
            </button>
            {currentPage2 === 1 ? (
              ""
            ) : (
              <button onClick={() => setCurrentPage2(1)}>1</button>
            )}

            {pages2?.slice(currentPage2 - 1, currentPage2 + 3).map((i, index) =>
              i === pages2?.length ? (
                ""
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage2(i)}
                  className={currentPage2 === i ? "activePage" : ""}
                >
                  {" "}
                  {i}{" "}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage2(pages2?.length)}
              className={currentPage2 === pages2?.length ? "activePage" : ""}
            >
              {" "}
              {pages2?.length}{" "}
            </button>

            {currentPage2 === pages2?.length ? (
              ""
            ) : (
              <button onClick={() => Next()} className="nextBtn">
                Next
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(CommonUser);

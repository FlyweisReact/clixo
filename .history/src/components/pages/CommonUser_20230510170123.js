/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";
import axios from "axios";

const CommonUser = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/common/all"
      );
      setData(data.result.resverse());
      console.log(data)
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
                {data?.map((i , index) => (
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
      </section>
    </>
  );
};

export default HOC(CommonUser);

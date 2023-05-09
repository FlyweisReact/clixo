/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";
import img from "../SVG/list.svg";
import axios from "axios";

const CommonUser = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/customertohero_Router/get_customer_to_hero"
      );
      setData(data);
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const filterData = !query
    ? data?.data
    : data?.data?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.phoneNumber
            ?.toString()
            ?.toLowerCase()
            .includes(query?.toLowerCase())
      );

  return (
    <>


      <section
        style={{
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
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
              placeholder="Search by Name , Phone number.."
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
              {filterData?.map((i, index) => (
                <tr key={index}>
                  <td>{i.name} </td>
                  <td>{i.email} </td>
                  <td>{i.phoneNumber} </td>
                  <td>{i.city} </td>
                  <td>{i.gender} </td>
                  <td>{i.birth.slice(0, 10)} </td>
                  <td> {i.website} </td>
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

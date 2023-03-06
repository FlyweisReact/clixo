/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import img from "../../SVG/list.svg";


const users = [
  {
    customer: "Abhisekh",
    Hero: "Arpan",
    service: "Photo",
    location: "delhi",
    date: "12/02/2005",
    amount: "5,000",
    mode: "online",
  },
  {
    customer: "Sharukh",
    Hero: "Gauri",
    service: "Video",
    location: "delhi",
    date: "12/02/2005",
    amount: "45,000",
    mode: "Cash",
  },
  {
    customer: "Krishna",
    Hero: "Raftaar",
    service: "Video",
    location: "delhi",
    date: "12/02/2005",
    amount: "95,000",
    mode: "online",
  },
];
const Transaction = () => {


  
  return (
    <>

<div style={{ display: "flex", gap: "20px", marginBottom: "2%" }}>
        <img
          src={img}
          alt=""
          style={{
            backgroundColor: "#4099ff",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            width: "40px",
            height: "40px",
            marginTop: "5px",
          }}
        />
        <p style={{ color: "black", fontSize: "18px", margin: "0" }}>
          Transactional  List <br />
          <span style={{ fontSize: "14px" }}>All Transactional List</span>
        </p>
      </div>
      <section
         style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
        <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Transactions
            <hr style={{ width: "70%" }} />
          </span>
        </div>
   

      <Table
        striped
        bordered
        hover
        style={{
          marginTop: "2%",
          scrollBehavior: "smooth",
          overflow: "scroll",
        }}
      >
        <thead>
          <tr>
            <th> Customer </th>
            <th> Hero </th>
            <th> Date </th>
            <th>Amount </th>
            <th>Payment Method </th>
          </tr>
        </thead>
        <tbody>
          {users.map((i, index) => (
            <tr key={index}>
              <td> {i.customer} </td>
              <td> {i.Hero} </td>
              <td> {i.date} </td>
              <td> {i.amount} </td>
              <td> {i.mode} </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </section>
    </>
  );
};

export default HOC(Transaction);

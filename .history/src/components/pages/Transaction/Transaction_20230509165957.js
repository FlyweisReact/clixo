/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import img from "../../SVG/list.svg";
import axios from "axios";

const Transaction = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/paymentRouter/users/getAllPayments"
      );
      setData(data.details);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
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
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "20px", fontWeight: "400" }}>
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
              <th> Receipt </th>
              <th>Amount </th>
              <th> Invoice </th>
              <th> Status </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((i, index) => (
              <tr key={index}>
                <td> {i.userName} </td>
                <td> {i.heroName} </td>
                <td> {i.receipt} </td>
                <td> {i.amount} </td>
                <td> {i.invoice} </td>
                <td> {i.orderStatus} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(Transaction);

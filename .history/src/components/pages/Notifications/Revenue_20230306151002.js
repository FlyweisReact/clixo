/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import HOC from "../../layout/HOC";

const Revenue = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/revenue/getrevenue"
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project Id</th>
            <th>Customer</th>
            <th>Hero</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total Amount</th>
            <th>Commission</th>
            <th>Earning</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => (
            <tr key={index}>
              <td>{i.projectId}</td>
              <td>{i.customer}</td>
              <td>{i.hero}</td>
              <td>{i.service}</td>
              <td>{i.date.slice(0,10)}</td>
              <td>{i.time}</td>
              <td>{i.totalAmount}</td>
              <td>{i.commission}</td>
              <td>{i.earning}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Revenue);

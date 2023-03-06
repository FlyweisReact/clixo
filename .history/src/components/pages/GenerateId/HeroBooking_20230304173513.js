/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const HeroBooking = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/bookings/getbookingbyidbyHeroIdbyAdmin/${id}`
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
            <th>Service</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Date</th>
            <th>Location</th>
            <th>Now/Schedule</th>
            <th>Price</th>
            <th>Status</th>
            <th>Rewards</th>
          </tr>
        </thead>

        {data.data ?  }

      </Table>
    </>
  );
};

export default HOC(HeroBooking);

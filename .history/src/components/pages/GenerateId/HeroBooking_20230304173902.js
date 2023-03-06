/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table , Alert } from "react-bootstrap";
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


    {data.data ? 
    
    <>

    <p style={{color : ''}}>Project History</p>
    
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


        <tbody>
          {data?.data?.map((i, index) => (
            <tr key={index}>
              <td> {i._id} </td>
              <td> {i.userobject?.name} </td>
              <td> Service </td>
              <td> {i.start_time} </td>
              <td> {i.end_time} </td>
              <td> {i.Date.slice(0, 10)} </td>
              <td> Location </td>
              <td> {i.now_schedule} </td>
              <td> {i.amount} </td>
              <td> {i.Status} </td>
              <td> {i.rewards} </td>
            </tr>
          ))}
        </tbody>
      </Table> 
      </>
      :
      
      <Alert variant='info'>
            No Booking Data
        </Alert>
      }
     
    </>
  );
};

export default HOC(HeroBooking);

/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CustomerBooking = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  function GoBack () {
    navigate(-1)
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/bookings/getbookingbyidbycustomerbyAdmin/${id}`
      );
      setData(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data?.data?.length >= 1 ? (
        <>
        <div className="backBtn">
        <Button >Back</Button>
        <p>Booking History</p>
         </div>
  

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
                  <td> {i.service} </td>
                  <td> {i.start_time} </td>
                  <td> {i.end_time} </td>
                  <td> {i.Date.slice(0, 10)} </td>
                  <td> {i.location} </td>
                  <td> {i.now_schedule} </td>
                  <td> {i.amount} </td>
                  <td> {i.Status} </td>
                  <td> {i.rewards} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Alert variant="info">No Booking Data</Alert>
      )}
    </>
  );
};
export default HOC(CustomerBooking);

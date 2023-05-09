/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CustomerBooking = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function GoBack() {
    navigate(-1);
  }

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


  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/bookings/getbookingbyidbycustomerbyAdmin/${id}`
      );
      setData(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  },[id])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {data?.data?.length >= 1 ? (
        <>
         <div className="backBtn">
            <button onClick={() => GoBack()}>Back</button>
            <p>Booking History</p>
          </div> 

          <div className="overflowCont">
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
              {slicedData?.map((i, index) => (
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
          </div>
      
        </>
      ) : (
        <div>
          <div className="backBtn" style={{ marginBottom: "10px" }}>
            <button onClick={() => GoBack()}>Back</button>
          </div>
          <Alert variant="info">No Booking Data</Alert>
        </div>
      )}
    </>
  );
};
export default HOC(CustomerBooking);

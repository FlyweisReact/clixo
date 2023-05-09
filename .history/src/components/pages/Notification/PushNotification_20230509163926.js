/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form, Table } from "react-bootstrap";
import img from "../../SVG/edit-3.svg";
import axios from "axios";
import { toast } from "react-toastify";

const PushNotification = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");

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
           i?.phoneNumber?.toString()?.toLowerCase().includes(query?.toLowerCase())
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
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/notificationRouter/getallusers"
      );
      setData(data.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const AddNote = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/notificationRouter/sendNotificationstouser",
        {
          role,
          message,
        }
      );
      console.log(data);
      toast.success("Notification Added");
      fetchHandler();
    } catch (err) {
      console.log(err);
    }
  };

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
        <p
          style={{
            color: "black",
            fontSize: "18px",
            margin: "0",
            marginTop: "10px",
          }}
        >
          Push Notification
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
            Send Notification
            <hr style={{ width: "70%" }} />
          </span>
        </div>
        <div className="NewForm">
          <div className="mb-3">
            <p>Notification Type:*</p>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Select Notification Type</option>
              <option value={"All User"}>All User's</option>
              <option value={"All Hero"}>All Hero's</option>
              <option value={"All User and Hero"}>All User's and Hero's</option>
            </Form.Select>
          </div>
          <div className="mb-3">
            <p>Message:*</p>
            <textarea
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
      </section>
      <br />
      <button
        style={{
          color: "#fff",
          backgroundColor: "#4099ff",
          padding: "10px",
          fontSize: "18px",
          textAlign: "center",
          display: "block",
          margin: "auto",
          marginTop: "2% !important",
          width: "100px",
        }}
        type="submit"
        onClick={AddNote}
      >
        Send
      </button>

      <section
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            Notification List ( Total : {data?.length})
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div style={{ float: "right", color: "black" }}>
          Search:{" "}
          <input
            type={"search"}
            style={{
              border: "1px solid #bfbfbf",
              width: "250px",
              color: "black",
              padding: "5px",
            }}
            placeholder="Search by Type"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <br />
        <br />

        <div style={{ overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Notification type</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {slicedData?.map((i, index) => (
                <tr key={index}>
                  <td> {i.role} </td>
                  <td> {i.message} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="PaginationBox">
        <p>
          {" "}
          Showing <strong>10</strong> out of <strong>{data?.length}</strong>{" "}
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

export default HOC(PushNotification);

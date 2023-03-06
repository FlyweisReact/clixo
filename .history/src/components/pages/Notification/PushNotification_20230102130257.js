/** @format */

import React , {useState} from "react";
import HOC from "../../layout/HOC";
import { Form, Table } from "react-bootstrap";
import img from "../../SVG/edit-3.svg";

const note = [
  {
    number: "1",
    type: "All User's",
    message: "Message One",
    date: "12/02/2022",
  },
  {
    number: "2",
    type: "All Hero's",
    message: "Message Two",
    date: "12/02/2022",
  },
  {
    number: "3",
    type: "All User's & Hero's",
    message: "Message Three",
    date: "12/02/2022",
  },
];

const PushNotification = () => {
  const [query, setQuery] = useState("");

  const filterData = !query
  ? note
  : note.filter(
      (i) =>
        i?.type?.toLowerCase().includes(query?.toLowerCase()) ||
        i?.date?.toLowerCase().includes(query?.toLowerCase())
    );


    const fetchHandler = async () => {
      try{
        
      }catch(err){
        console.log(err)
      }
    }



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
            <Form.Select aria-label="Default select example">
              <option>Select Notification Type</option>
              <option>All User's</option>
              <option>All Hero's</option>
              <option>All User's and Hero's</option>
            </Form.Select>
          </div>
          <div className="mb-3">
            <p>Title:*</p>
            <textarea placeholder="Title" />
          </div>
          <div className="mb-3">
            <p>Message:*</p>
            <textarea placeholder="Message" />
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
            Notification List
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
            placeholder="Search by Type , Date..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <br />
        <br />

        <div style={{ overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{width : '150px'}}>No</th>
                <th>Notification type</th>
                <th>Message</th>
                <th>Send Date</th>
              </tr>
            </thead>
            <tbody>
            {filterData.map((i , index) => (
              <tr key={index}>
                <td> {i.number} </td>
                <td> {i.type} </td>
                <td> {i.message} </td>
                <td> {i.date} </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(PushNotification);

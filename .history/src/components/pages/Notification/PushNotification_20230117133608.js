/** @format */

import React , {useEffect, useState} from "react";
import HOC from "../../layout/HOC";
import { Form, Table } from "react-bootstrap";
import img from "../../SVG/edit-3.svg";
import axios from "axios";



const PushNotification = () => {
  const [query, setQuery] = useState("");
  const [data , setData] = useState([])


  const [message , setMessage ]  = useState('')
  const [ role , setRole ]  = useState('')

  const filterData = !query
  ? data?.data
  : data?.data.filter(
      (i) =>
        i?.role?.toLowerCase().includes(query?.toLowerCase())
    );


    const fetchHandler = async () => {
      try{
        const {data} = await axios.get('http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/notificationRouter/getallusers')
        setData(data)
      }catch(err){
        console.log(err)
      }
    }

    useEffect(() => {
      fetchHandler()
    },[])

    const AddNote = async (e) => {
      e.preventDefault()
      try{

        const data = await axios.post('http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/notificationRouter/sendNotificationstouser' , {
          role , message

        })
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
            <Form.Select aria-label="Default select example"   onChange={(e) => setRole(e.target.value)}>
              <option>Select Notification Type</option>
              <option value={'All User'}>All User's</option>
              <option value={'All Hero'}>All Hero's</option>
              <option value={'All User'}>All User's and Hero's</option>
            </Form.Select>
          </div>
          <div className="mb-3">
            <p>Title:*</p>
            <textarea placeholder="Title" />
          </div>
          <div className="mb-3">
            <p>Message:*</p>
            <textarea placeholder="Message"  onChange={(e) => setMessage(e.target.value)}/>
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
        type='submit'
        onClick={() => AddNote()}
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
            {filterData?.map((i , index) => (
              <tr key={index}>
                <td> {i.role} </td>
                <td> {i.message} </td>
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

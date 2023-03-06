/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Container, Form, FloatingLabel, Button } from "react-bootstrap";
import img from "../../SVG/edit-3.svg";

const PushNotification = () => {
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
          width : '100px'
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
        }}>
 <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            Send Notification
            <hr style={{ width: "70%" }} />
          </span>
        </div>
      </section>

    </>
  );
};

export default HOC(PushNotification);

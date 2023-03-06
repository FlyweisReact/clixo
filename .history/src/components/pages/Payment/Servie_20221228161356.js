/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { Button, Modal, Form, Container } from "react-bootstrap";
import img from "../../SVG/list.svg";

const Servie = () => {
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
        <p style={{ color: "black", fontSize: "18px", margin: "0" }}>
          Service Section <br />
          <span style={{ fontSize: "14px" }}>Service List</span>
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
            All Category List
            <hr style={{ width: "70%" }} />
          </span>
          <Button
            style={{
              backgroundColor: "#4099ff",
              color: "#fff",
              borderRadius: "0",
              border: "1px solid #4099ff",
              padding: "10px",
            }}
            onClick={() => setModalShow(true)}
          >
            Add New
          </Button>
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
              <th>Name</th>
              <th>Description</th>
              <th> PhotoGuy </th>
              <th>VideoGuy </th>
              <th>DroneGuy </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((i, index) => (
              <tr key={index}>
                <td> {i.name} </td>
                <td>Lorem Ipsum Lorem Ipsunm</td>
                <td>
                  {" "}
                  ₹{i.PG}
                  <p style={{ textDecoration: "line-through" }}> ₹4521</p>
                </td>
                <td>
                  ₹ {i.VG}
                  <p style={{ textDecoration: "line-through" }}> ₹4521</p>{" "}
                </td>
                <td>
                  {" "}
                  ₹{i.DG}
                  <p style={{ textDecoration: "line-through" }}> ₹4521</p>{" "}
                </td>
                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <AiFillDelete
                      color="red"
                      cursor="pointer"
                      onClick={() => toast.success(" Deleted ")}
                    />
                    <AiFillEdit
                      color="blue"
                      cursor="pointer"
                      onClick={() => setModalShow(true)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  )
}

export default HOC(Servie)
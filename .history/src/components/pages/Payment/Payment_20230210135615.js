/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { Button, Modal, Form, Container } from "react-bootstrap";
import img from "../../SVG/list.svg";
import axios from "axios";

const Payment = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/categorys/getcategorybyadmin/noida"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/categorys/deletecategorybyadmin/${id}`
      );
      toast.success(data.message);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [photoActual, setPhotoActual] = useState("");
    const [photoExcepted, setPhotoExpected] = useState("");
    const [videoActual, setVideoActual] = useState("");
    const [videoExcepted, setVideoExpected] = useState("");
    const [dronActual, setDronActual] = useState("");
    const [dronExcepted, setDronExpected] = useState("");

    const AddData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/categorys/shoot/",
          {
            name,
            desc,
            photoActual,
            photoExcepted,
            videoActual,
            videoExcepted,
            dronActual,
            dronExcepted,
          }
        );
        console.
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pricing Section
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Form.Group>
                <Form.Label> Name </Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group>
                <Form.Label> Description </Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Photo Guy Actual Price </Form.Label>
                <Form.Control type="number" min={0} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Photo Guy Expected Price </Form.Label>
                <Form.Control type="number" min={0} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Video Guy Actual Price </Form.Label>
                <Form.Control type="number" min={0} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Video Guy Expected Price </Form.Label>
                <Form.Control type="number" min={0} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Drone Guy Actual Price</Form.Label>
                <Form.Control type="number" min={0} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Drone Guy Expected Price </Form.Label>
                <Form.Control type="number" min={0} />
              </Form.Group>
              <br />
              <Button variant="outline-dark">Submit</Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

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
          Category Section <br />
          <span style={{ fontSize: "14px" }}>Category List</span>
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
            {data?.map((i, index) => (
              <tr key={index}>
                <td> {i.name} </td>
                <td>Lorem Ipsum Lorem Ipsunm</td>
                <td>
                  {" "}
                  ₹{i.photoActual}
                  <p style={{ textDecoration: "line-through" }}>
                    {" "}
                    ₹{i.photoExcepted}{" "}
                  </p>
                </td>
                <td>
                  ₹ {i.videoActual}
                  <p style={{ textDecoration: "line-through" }}>
                    {" "}
                    ₹{i.videoExcepted}{" "}
                  </p>{" "}
                </td>
                <td>
                  {" "}
                  ₹{i.dronActual}
                  <p style={{ textDecoration: "line-through" }}>
                    {" "}
                    ₹{i.dronExcepted}{" "}
                  </p>{" "}
                </td>
                <td>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <AiFillDelete
                      color="red"
                      cursor="pointer"
                      onClick={() => deleteHandler(i._id)}
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
  );
};

export default HOC(Payment);

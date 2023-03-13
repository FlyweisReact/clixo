/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import HOC from "../../layout/HOC";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { AiFillEdit } from "react-icons/ai";

const Revenue = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [modalShow, setModalShow] = React.useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/revenue/getrevenue"
      );
      setData(data);
      console.log(data)
    } catch (e) {
      console.log(e);
    }
  };


  


  let totalEarning = data.reduce((accumulator, currentValue) => accumulator + currentValue.earning, 0);
  

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [commission, setCommission] = useState("");

    const postData = async (e) => {
        e.preventDefault()
      try {
        const { data } = await axios.put(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/revenue/update_revenue_admin/${id}`,
          { commission }
        );
        console.log(data);
        toast.success("Commission Added ");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
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
            Add Commission
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3">
              <Form.Label>Commission</Form.Label>
              <Form.Control
                type="number"
                placeholder="200"
                onChange={(e) => setCommission(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
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

      <p style={{ color: "#000", marginBottom: "20px", fontSize: "25px" }}>
        Revenue
      </p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project Id</th>
            <th>Customer</th>
            <th>Hero</th>
            <th>Service</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total Amount</th>
            <th>Commission</th>
            <th>Earning</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, index) => (
            <tr key={index}>
              <td>{i.projectId}</td>
              <td>{i.customer}</td>
              <td>{i.hero}</td>
              <td>{i.service}</td>
              <td>{i.date.slice(0, 10)}</td>
              <td>{i.time}</td>
              <td>{i.totalAmount}</td>
              <td>{i.commission}</td>
              <td>{i.earning}</td>
              <td>
                <AiFillEdit
                  color="blue"
                  onClick={() => {
                    setId(i._id);
                    setModalShow(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default HOC(Revenue);

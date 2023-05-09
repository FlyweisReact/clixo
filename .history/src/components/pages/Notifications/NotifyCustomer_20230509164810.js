/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Button, Modal, Form, Container, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const NotifyCustomer = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [ query , setQuery ] = useState("")

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


  const fetchhandler = async () => {
    try {
      const { data } = await axios.get(
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/coupencodeRouter/getcoupencode"
      );
      setData(data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchhandler();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const data = await axios.delete(
        `https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/coupencodeRouter/deletecoupencodeService/${id}`
      );
      console.log(data);
      toast.success("Coupon Deleted");
      fetchhandler();
    } catch (err) {
      console.log(err);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [coupencode, setC] = useState("");
    const [minimumAmount, setM] = useState("");
    const [expirydate, setE] = useState("");
    const [activationdate, setA] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/coupencodeRouter/coupencodeService",
          {
            coupencode,
            minimumAmount,
            expirydate,
            activationdate,
          }
        );
        console.log(data);
        toast.success("Coupon added");
        fetchhandler();
        setModalShow(false);
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
            Add Coupon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={postHandler}>
              <Form.Group className="mb-3">
                <Form.Label> Coupon Code </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setC(e.target.value)}
                />
              </Form.Group>

              <Form.Group  className="mb-3">
                <Form.Label>Minimum Amount </Form.Label>
                <Form.Control
                  type="tel"
                  min={0}
                  onChange={(e) => setM(e.target.value)}
                />
              </Form.Group>

              <Form.Group  className="mb-3">
                <Form.Label>Activation Date </Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setA(e.target.value)}
                />
              </Form.Group>

              <Form.Group  className="mb-3">
                <Form.Label>Expiry Date </Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setE(e.target.value)}
                />
              </Form.Group>

              <Button variant="outline-dark" type="submit">
                Submit
              </Button>
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

   
      <section
        style={{
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "20px", fontWeight: "400" }}>
            All Coupon's (Total : {data?.length})
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
            Add Coupon's
          </Button>
        </div>

        <div
          style={{
            overflowX: "auto",
            padding: "10px",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Coupon code</th>
                <th> Minimum Amount </th>
                <th>Activation Date </th>
                <th>Expiry Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {slicedData?.map((i, index) => (
                <tr key={index}>
                  <td> {i.coupencode} </td>
                  <td> ₹{i.minimumAmount} </td>
                  <td> {i.activationdate.slice(0, 15)} </td>
                  <td> {i.expirydate.slice(0, 15)} </td>
                  <td>
                    <AiFillDelete
                      color="red"
                      cursor={"pointer"}
                      onClick={() => deleteHandler(i._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="PaginationBox">
        <p>
          {" "}
          Showing <strong> {slicedData?.length} </strong> out of <strong>{data?.length}</strong>{" "}
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

export default HOC(NotifyCustomer);

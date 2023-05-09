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


  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/revenue/getrevenue"
      );
      setData(data.reverse());
    } catch (e) {
      console.log(e);
    }
  };

  let totalEarning = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.earning,
    0
  );

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [commission, setCommission] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/revenue/update_revenue_admin/${id}`,
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
        Revenue (Total : {data?.length})
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
          {slicedData?.map((i, index) => (
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

      <p
        style={{
          color: "black",
          fontSize: "20px",
          textAlign: "right",
          marginRight: "10px",
        }}
      >
        Total : {totalEarning}{" "}
      </p>

      <div className="pagination">
                <button onClick={() => Prev()} className="prevBtn">
                  <i className="fa-solid fa-backward"></i>
                </button>
                {currentPage2 === 1 ? (
                  ""
                ) : (
                  <button onClick={() => setCurrentPage2(1)}>1</button>
                )}

                {pages2
                  ?.slice(currentPage2 - 1, currentPage2 + 3)
                  .map((i, index) =>
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
                  className={
                    currentPage2 === pages2?.length ? "activePage" : ""
                  }
                >
                  {" "}
                  {pages2?.length}{" "}
                </button>

                {currentPage2 === pages2?.length ? (
                  ""
                ) : (
                  <button onClick={() => Next()} className="nextBtn">
                    {" "}
                    <i className="fa-sharp fa-solid fa-forward"></i>
                  </button>
                )}
              </div>
    </>
  );
};

export default HOC(Revenue);

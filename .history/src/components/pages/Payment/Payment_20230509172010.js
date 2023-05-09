/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { Button, Modal, Form, Container } from "react-bootstrap";
import axios from "axios";

const Payment = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
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
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/categorys/getcategorybyadmin/noida"
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
        `https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/categorys/deletecategorybyadmin/${id}`
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
    const  [ ] = useState("")
    const  [ ] = useState("")

    const AddData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/categorys/shoot/",
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
        toast.success(data.msg);
        props.onHide();
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    const EditData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/categorys/updatecategorybyadmin/${id}`,
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
        toast.success(data.msg);
        props.onHide();
        fetchData();
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
            Category Section
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={edit ? EditData : AddData}>
              <Form.Group className="mb-3">
                <Form.Label> Name </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label> Description </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Actual Price</Form.Label>
                  <Form.Control type='number' min={0}  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Actual Price</Form.Label>
                  <Form.Control type='number' min={0}  />
                </Form.Group>

             
              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
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
            All Category List (Total : {data.length})
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
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Add New
          </Button>
        </div>
        <div>
          <div style={{ color: "black" }}>
            {/* Search:{" "} */}
            <input
              type={"search"}
              style={{
                border: "1px solid #bfbfbf",
                width: "250px",
                color: "black",
                padding: "5px",
              }}
              placeholder="Search by Name ..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
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
              <th> Expected Price </th>
              <th> Actual Price </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slicedData?.map((i, index) => (
              <tr key={index}>
                <td> {i.name} </td>
                <td>Lorem Ipsum Lorem Ipsunm</td>
                <td style={{textDecoration  : 'line-through'}}>
                  {" "}
                  ₹{i.exceptedPrice}
                </td>
                <td>
                ₹{i.accualPrice}
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
                      onClick={() => {
                        setId(i._id);
                        setEdit(true);
                        setModalShow(true);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="PaginationBox">
        <p>
          {" "}
          Showing <strong>{slicedData?.length}</strong> out of <strong>{data?.length}</strong>{" "}
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

export default HOC(Payment);

/** @format */
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const Terms = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/terms/terms1"
      );
      setData(data?.terms.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/terms/terms",
          { terms: name }
        );
        console.log(data);
        toast.success("Added");
        fetchData();
        setModalShow(false);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Modal
        {...props}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Terms&Condition
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
            onSubmit={postHandler}
          >
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Terms&Condition</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const data = await axios.delete(
        `https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/terms/terms/${id}`
      );
      console.log(data);
      toast.success("Deleted");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

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
            Terms&Condition ( Total : {data?.length})
            <hr style={{ width: "70%" }} />
          </span>
          <Button variant="outline-success" onClick={() => setModalShow(true)}>
            Add
          </Button>
        </div>

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Terms&Condition</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr>
                  <td>{i.terms}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <AiFillDelete
                      color="red"
                      cursor={"pointer"}
                      onClick={() => {
                        deleteHandler(i._id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Terms);

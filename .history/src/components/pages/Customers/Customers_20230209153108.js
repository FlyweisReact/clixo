/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { Button, Container, Form } from "react-bootstrap";
import img from "../../SVG/list.svg";
import warning from "../../SVG/yellow-circle-exclamation-mark-icon-warning-sign-vector-13227823 1.png";
import axios from "axios";

const Customers = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState("");
  const [id, setID] = useState("");

  // FetchData
  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/adminmodelRouter/allusers"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const EditStatus = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/updateUserinadmin/${id}`,
        {
          status: "Disable",
        }
      );
      console.log(data);
      toast.success("Status Changed SuccessFully");
      setOpen(false);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // Add Customer
  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [city, setCity] = useState("");
    const [website, setWebsite] = useState("");

    const EditCustomer = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/updateUserinadmin/${id}`,
          {
            name,
            phoneNumber,
            gender,
            email,
            birth,
            city,
            website,
          }
        );
        console.log(data);
        toast.success("Customer Edited SuccessFully");
        setModalShow(false);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    const AddCustomer = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/register",
          {
            name,
            phoneNumber,
            gender,
            email,
            birth,
            city,
            website,
          }
        );
        console.log(data);
        toast.success("Customer Added SuccessFully");
        setModalShow(false);
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
            {edit ? "Edit Customer" : "Add Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={edit ? EditCustomer : AddCustomer}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group  className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group  className="mb-3">
                <Form.Label>Phone Number </Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{10}"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            
            <Form.Group  className="mb-3">
            <Form.Select
                aria-label="Default select example"
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
           
           
              <Form.Group>
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setBirth(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Form.Group>
              <br />
              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  // Edit Stutus
  function StatusModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Container>
            <div style={{ width: "100px", display: "block", margin: "auto" }}>
              <img src={warning} alt="" style={{ width: "100%" }} />
            </div>
            <h2
              style={{
                textAlign: "center",
                fontWeight: "lighter",
                marginTop: "1%",
              }}
            >
              Disable user?
            </h2>
            <p
              style={{
                fontSize: "1.6rem",
                fontWeight: "lighter",
                textAlign: "center",
              }}
            >
              if press yes then disable user!
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#f0f0f0",
                  fontSize: "1.6rem",
                  padding: "10px",
                }}
                onClick={() => setOpen(false)}
              >
                No
              </button>
              <button
                style={{
                  border: "1px solid #4099ff",
                  backgroundColor: "#4099ff",
                  fontSize: "1.6rem",
                  padding: "10px",
                  color: "#fff",
                }}
                type="button"
                onClick={EditStatus}
              >
                Yes
              </button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }

  // View Coustomer Modal
  function ViewModal(props) {
    const [each, setEach] = useState([]);

    const viewHandler = async () => {
      try {
        const { data } = await axios.get(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/getuserByIdinadmin/${id}`
        );
        setEach(data);
      } catch (err) {}
    };

    useEffect(() => {
      if (view === true) {
        viewHandler();
      }
    }, []);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Container>
            <h2 style={{ fontWeight: "lighter" }}>{each?.data?.name}</h2>
            <div>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Name
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {each?.data?.name}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Email
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {each?.data?.email}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Phone Number
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {each?.data?.phoneNumber}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                City
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {each?.data?.city}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Gender
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {each?.data?.gender}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                DOB
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {each?.data?.birth?.slice(0, 10)}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Website
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {each?.data?.website}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Wallet
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {each?.data?.wallet}
              </p>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }

  // Add Wallet Modal
  function AddWallet(props) {
    const [dropDown, setDropDown] = useState("");
    const [amount, setAmount] = useState("");

    const AddWalletHandler = async (e) => {
      e.preventDefault();
      try {
        if (dropDown === "removebalance") {
          const data = await axios.post(
            `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/wallet/addandremoveMoneyinadmin/${id}`,
            {
              removebalance: amount,
            }
          );
          console.log(data);
          toast.success("Amount Removed");
          fetchData();
          setWallet(false);
        }
        if (dropDown === "addbalance") {
          const data = await axios.post(
            `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/wallet/addandremoveMoneyinadmin/${id}`,
            {
              addbalance: amount,
            }
          );
          console.log(data);
          toast.success("Amount Added");
          fetchData();
          setWallet(false);
        }
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
        <Modal.Header
          style={{ backgroundColor: "#66adff", border: "1px solid #66adff" }}
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#fff" }}
          >
            Wallet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={AddWalletHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Wallet Amount:
                </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  placeholder="Enter Amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Choose Option (Add or Deduct Money ):{" "}
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setDropDown(e.target.value)}
                >
                  <option>Add or Deduct Money</option>
                  <option value="addbalance">Add Amount</option>
                  <option value="removebalance">Deduct Amount</option>
                </Form.Select>
              </Form.Group>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{
                    width: "100px",
                    backgroundColor: "#4099ff",
                    fontSize: "18px",
                    color: "#fff",
                    padding: "10px",
                  }}
                  type="submit"
                >
                  Submit
                </button>
                <button
                  style={{
                    width: "100px",
                    backgroundColor: "#f0f0f0",
                    fontSize: "18px",
                    color: "black",
                    padding: "10px",
                  }}
                  onClick={() => setWallet(false)}
                >
                  Close
                </button>
              </div>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }

  // SearchBar
  const filterData = !query
    ? data?.Users
    : data?.Users?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.phoneNumber
            ?.toString()
            ?.toLowerCase()
            .includes(query?.toLowerCase())
      );

  // Delete --
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/deleteuserByIdinadmin/${id}`
      );
      toast.success(`${data?.data?.name} deleted successfully`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {" "}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />{" "}
      <StatusModal show={open} onHide={() => setOpen(false)} />
      <ViewModal show={view} onHide={() => setView(false)} />
      <AddWallet show={wallet} onHide={() => setWallet(false)} />
      {/* ---------------------- */}
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
          Customer List <br />
          <span style={{ fontSize: "14px" }}>All Customer List</span>
        </p>
      </div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
        className="response"
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Customers (Total : {data?.Users?.length})
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
              setModalShow(true);
              setEdit(false);
            }}
          >
            Add Customers
          </Button>
        </div>

        <div>
          <div style={{ color: "black" }}>
            Search:{" "}
            <input
              type={"search"}
              style={{
                border: "1px solid #bfbfbf",
                width: "250px",
                color: "black",
                padding: "5px",
              }}
              placeholder="Search by Name , Phone number.."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflow: "auto", marginTop: "2%" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th> Phone Number </th>
                <th> Wallet </th>
                <th> Rating </th>
                <th> Status </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterData?.map((i, index) => (
                <tr key={index}>
                  <td> {i.name} </td>
                  <td> {i.email} </td>
                  <td> {i.phoneNumber} </td>
                  <td style={{ minWidth: "200px" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {i.wallet ? i.wallet : "0"}
                      <img
                        src="https://fox-jekapp.startuptrinity.com/assets/images/template-images/wallet-history3.png"
                        alt=""
                      />
                      {/* ----------------------------- */}
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          border: "1px solid #008000",
                          padding: "5px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setID(i._id);
                          setWallet(true);
                        }}
                      >
                        <i
                          className="fa-solid fa-plus"
                          style={{ color: "#008000" }}
                        ></i>
                        <div
                          style={{
                            backgroundColor: "#008000",
                            height: "20px",
                            width: "2px",
                            transform: "rotate(20deg)",
                          }}
                        ></div>
                        <i
                          className="fa-solid fa-minus"
                          style={{ color: "#008000" }}
                        ></i>
                      </div>
                    </div>
                  </td>
                  <td> {i.rating} </td>
                  <td>
                    {i.status === "yes" ? (
                      <div
                        className="toggleBtn2"
                        onClick={() => {
                          setID(i._id);
                          setOpen(true);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="hideOne"></div>
                      </div>
                    ) : (
                      <div className="toggleBtn">
                        <div className="hideOne"></div>
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <i
                        className="fa-solid fa-eye"
                        style={{ color: "#099ffe", cursor: "pointer" }}
                        onClick={() => {
                          setID(i._id);
                          setView(true);
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "#267cb5", cursor: "pointer" }}
                        onClick={() => {
                          setID(i._id);
                          setModalShow(true);
                          setEdit(true);
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteHandler(i._id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default HOC(Customers);

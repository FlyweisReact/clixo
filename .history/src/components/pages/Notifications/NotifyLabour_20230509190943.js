/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form, Modal, Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import useTimer from "react-timer-hook";

function CountdownTimer({ targetDate }) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(targetDate.getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      if (now >= expiryTimestamp) {
        clearInterval(interval);
      } else {
        setExpiryTimestamp(targetDate.getTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryTimestamp, targetDate]);

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.log("Timer has expired"),
  });

  return (
    <div>
      <div>
        <span>{days}</span> days <span>{hours}</span> hrs <span>{minutes}</span>{" "}
        min. <span>{seconds}</span> sec.
      </div>
    </div>
  );
}

const NotifyLabour = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [query, setQuery] = useState("");
  const [timer, setTimer] = useState("");

  // Pagination
  const [currentPage2, setCurrentPage2] = useState(1);
  const [postPerPage2] = useState(10);
  const lastPostIndex2 = currentPage2 * postPerPage2;
  const firstPostIndex2 = lastPostIndex2 - postPerPage2;
  let pages2 = [];
  const TotolData = query
    ? data?.filter(
        (i) =>
          i?.userobject?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.heroobject?.name?.toLowerCase().includes(query?.toLowerCase())
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
        "https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/bookings/getbook"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [Status, setStatus] = useState("");

    const chnageStatus = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/paymentRouter/changeStatusbyidByAdmin/${id}`,
          {
            Status,
          }
        );
        console.log(data);
        fetchData();
        props.onHide();
        toast.success("Status Changed");
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
            Edit Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={chnageStatus}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Select Status</option>
                  <option value="Booked">Booked</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Scheduled">Scheduled</option>
                </Form.Select>
              </Form.Group>
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

  function ViewModal(props) {
    const [single, setSingle] = useState([]);

    const viewHandler = async () => {
      try {
        const { data } = await axios.get(
          `https://5mkj1ib4ve.execute-api.ap-south-1.amazonaws.com/dev/api/bookings/getbookingbyid/${id}`
        );
        setSingle(data);
      } catch (err) {
        console.log(err);
      }
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
            <h2 style={{ fontWeight: "lighter" }}>Booking</h2>
            <div>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Customer
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {single?.data?.userobject?.name}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Hero
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {single?.data?.heroobject?.name}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Service
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {single?.data?.combinedobject?.service}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Location
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                Location
              </p>

              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Date
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {single?.data?.createdAt?.slice(0, 10)}
              </p>

              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Status
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {single?.data?.Status}
              </p>

              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Amount
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {single?.data?.amount}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Payment Mode
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {single?.data?.payment}
              </p>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      {" "}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />{" "}
      <ViewModal show={view} onHide={() => setView(false)} />
      <section
        style={{
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Project's (Total : {data?.length})
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div>
          <div style={{ color: "black" }}>
            <input
              type={"search"}
              style={{
                border: "1px solid #bfbfbf",
                width: "250px",
                color: "black",
                padding: "5px",
                marginBottom: "10px",
              }}
              placeholder="Search by Hero , User "
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* <CountdownTimer /> */}

        <div
          style={{
            overflow: "auto",
            width: "100%",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Customer </th>
                <th> Hero </th>
                <th> Service </th>
                <th> Date </th>
                <th> Start Time </th>
                <th> Timer </th>
                <th> Amount </th>
                <th> Payment Method </th>
                <th> Now/Schedule </th>
                <th> Status </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {slicedData?.map((i, index) => (
                <tr key={index}>
                  <td> {i.userobject?.name} </td>
                  <td> {i.heroobject?.name} </td>
                  <td> {i.service} </td>
                  <td> {i.Date.slice(0, 10)} </td>
                  <td> {i.start_time?.slice(0, 10)} </td>
                  <td>
                    {/* {i.end_time} */}
                    {i.end_time.slice(11)}
                    <CountdownTimer targetDate={new Date(i.end_time?.slice)}

                    {/* <CountdownTimer targetDate={new Date(i.end_time?.slice(0  ,16))} />   */}
                  </td>
                  <td> {i.amount} </td>
                  <td> {i.payment} </td>
                  <td> {i.now_schedule} </td>
                  <td> {i.Status}</td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <i
                        class="fa-solid fa-eye"
                        style={{ color: "#099ffe", cursor: "pointer" }}
                        onClick={() => {
                          setView(true);
                          setId(i._id);
                        }}
                      ></i>
                      <i
                        class="fa-solid fa-pen-to-square"
                        style={{ color: "#267cb5", cursor: "pointer" }}
                        onClick={() => {
                          setModalShow(true);
                          setId(i._id);
                        }}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="PaginationBox">
          <p>
            {" "}
            Showing <strong>{slicedData?.length}</strong> out of{" "}
            <strong>{data?.length}</strong>{" "}
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
export default HOC(NotifyLabour);

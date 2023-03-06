/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import img from "../../SVG/list.svg";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import warning from "../../SVG/yellow-circle-exclamation-mark-icon-warning-sign-vector-13227823 1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GenerateId = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [Each, setEach] = useState([]);
  const [data, setData] = useState([]);
  const [id, setID] = useState("");
  const navigate = useNavigate()

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/heros/getherorole4"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchSignlerHero = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/heros/getherobyid/${id}`
      );
      setEach(data);
    } catch (err) {}
  }, [id]);

  useEffect(() => {
    fetchData();
    if (view === true) {
      fetchSignlerHero();
    }
  }, [fetchData, fetchSignlerHero, view]);

  function MyVerticallyCenteredModal(props) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setNumber] = useState("");
    const [Gender, setGender] = useState("");
    const [DateOfBirth, setDOB] = useState("");
    const [Camera, setCamera] = useState("");
    const [EquipmentSpecification, setESpec] = useState("");
    const [gadgettop, setGadgetTop] = useState("");
    const [gadgettopURL, setGadgetTopURL] = useState("");
    const [gadgetside, setGadgetSide] = useState("");
    const [gadgetsideURL, setGadgetSideURL] = useState("");
    const [gadgetfront, setGadgetFront] = useState("");
    const [gadgetfrontURL, setGadgetFrontURL] = useState("");
    const [Website, setWebsite] = useState("");
    const [SelectSkill, setSkills] = useState("");
    const [SelectExpertise, setExpertise] = useState("");
    const [OtherExpertise, setOtherExpertise] = useState("");
    const [DrivingLicenseNumber, setDNumber] = useState("");
    const [driveringback, setDrivingBack] = useState("");
    const [driveringbackURL, setDrivingBackURL] = useState("");
    const [driveringfront, setDrivingFront] = useState("");
    const [driveringfrontURL, setDrivingFrontURL] = useState("");
    const [AadhaarCardNumber, setANumber] = useState("");
    const [Aadhaafront, setAadharFront] = useState("");
    const [AadhaafrontURL, setAadharFrontURL] = useState("");
    const [AadhaaBack, setAadharBack] = useState("");
    const [AadhaaBackURL, setAadharBackURL] = useState("");
    const [Howdoyoutransferdata, setTData] = useState("");

    // Gadget Photo Upload
    const gadgetTopPhoto = (e) => {
      const data = new FormData();
      data.append("file", gadgettop);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setGadgetTopURL(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // Gadget Photo Upload
    const gadgetSidePhoto = (e) => {
      const data = new FormData();
      data.append("file", gadgetside);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setGadgetSideURL(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // Gadget Photo Upload
    const gadgetFrontPhoto = (e) => {
      const data = new FormData();
      data.append("file", gadgetfront);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setGadgetFrontURL(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // Gadget Photo Upload
    const DrivingBackPhoto = (e) => {
      const data = new FormData();
      data.append("file", driveringback);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setDrivingBackURL(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // Gadget Photo Upload
    const DrivingFrontPhoto = (e) => {
      const data = new FormData();
      data.append("file", driveringfront);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setDrivingFrontURL(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // Gadget Photo Upload
    const AadharFrontPhoto = (e) => {
      const data = new FormData();
      data.append("file", Aadhaafront);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAadharFrontURL(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // Gadget Photo Upload
    const AadharBackPhoto = (e) => {
      const data = new FormData();
      data.append("file", AadhaaBack);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAadharBackURL(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const AddHero = async (e) => {
      e.preventDefault();

      const formD = {
        email,
        name,
        phoneNumber,
        Gender,
        Camera,
        DateOfBirth,
        EquipmentSpecification,
        Website,
        SelectExpertise,
        SelectSkill,
        OtherExpertise,
        DrivingLicenseNumber,
        AadhaarCardNumber,
        Howdoyoutransferdata,
        gadgettop: gadgettopURL,
        gadgetside: gadgetsideURL,
        gadgetfront: gadgetfrontURL,
        driveringback: driveringbackURL,
        driveringfront: driveringfrontURL,
        Aadhaafront: AadhaafrontURL,
        AadhaaBack: AadhaaBackURL,
      };
      try {
        const data = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/heros/addherobyadmin",
          formD
        );
        console.log(data);
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
            {edit ? "Edit Hero" : "Add Hero"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={AddHero}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number </Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select Gender</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setDOB(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Which Camera/Drone do you use</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCamera(e.target.value)}
                >
                  <option>Select your Prefrence</option>
                  <option value={"Sony"}>Sony</option>
                  <option value={"Canon"}>Canon</option>
                  <option value={"Nikon"}>Nikon</option>
                  <option value={"DJI"}>DJI</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Equipment Specification</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setESpec(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label> Gadget Side View</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setGadgetSide(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Gadget Top View</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setGadgetTop(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Gadget Front View</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setGadgetFront(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Website/Portfolio link</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select Skill</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setSkills(e.target.value)}
                >
                  <option>Select your Prefrence</option>
                  <option value={"Photography"}> Photography</option>
                  <option value={"Videography"}>Videography</option>
                  <option value={"Photography & Videography"}>
                    Photography & Videography
                  </option>
                  <option value={"Aerial Videography & PhotoGraphy"}>
                    Aerial Videography & PhotoGraphy
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select Expertise</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setExpertise(e.target.value)}
                >
                  <option>Select your Prefrence</option>
                  <option value={"Wedding/Pre wedding"}>
                    Wedding/Pre wedding
                  </option>
                  <option value={"Maternity/Baby Photoshoot"}>
                    Maternity/Baby Photoshoot
                  </option>
                  <option value={"Birthday Party (Adults)"}>
                    Birthday Party (Adults)
                  </option>
                  <option value={"Birthday Party (Kids)"}>
                    Birthday Party (Kids)
                  </option>
                  <option value={"Special Occasion / Function"}>
                    {" "}
                    Special Occasion / Function
                  </option>
                  <option value={"Portriat/Fashion"}>Portriat/Fashion</option>
                  <option value={"Product/E-Com"}>Product/E-Com</option>
                  <option value={"Real Estate/Interior"}>
                    Real Estate/Interior
                  </option>
                  <option value={"Corporate/Industrial"}>
                    Corporate/Industrial
                  </option>
                  <option value={"Social Medial/Youtube"}>
                    Social Medial/Youtube
                  </option>
                  <option value={"Travel/Nature"}>Travel/Nature</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Other Expertise</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setOtherExpertise(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Driving License Front Side</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setDrivingFront(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Driving License Back Side</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setDrivingBack(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Driving License Number</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setDNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Aadhaar Card Front Side</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setAadharFront(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>AadhaarCard Back Side</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setAadharBack(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Aadhaar Card Number</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setANumber(e.target.value)}
                  onClick={() => {
                    gadgetTopPhoto();
                    gadgetSidePhoto();
                    gadgetFrontPhoto();
                    DrivingBackPhoto();
                    DrivingFrontPhoto();
                    AadharFrontPhoto();
                    AadharBackPhoto();
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>How do you transfer data</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setTData(e.target.value)}
                >
                  <option>Select your Prefrence</option>
                  <option value={"SD card to Laptop"}>SD card to Laptop</option>
                  <option value={"Pendrive"}>Pendrive</option>
                  <option value={"Data Cable & Sd Card Reader"}>
                    Data Cable & Sd Card Reader
                  </option>
                  <option value={"Online"}>Online</option>
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

  // Edit Stutus
  function StatusModal(props) {
    const disableHero = async () => {
      try {
        const data = await axios.put(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/heros/changeStatusbyid_by_dmin/${id}`,
          {
            status: "No",
          }
        );
        toast.success("Status Change Successfully");
        setOpen(false);
        fetchData();
        console.log(data);
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
              Disable Hero?
            </h2>
            <p
              style={{
                fontSize: "1.6rem",
                fontWeight: "lighter",
                textAlign: "center",
              }}
            >
              if press yes then disable Hero!
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
                onClick={() => {
                  disableHero();
                }}
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
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Container>
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
                {Each?.services?.[0]?.name}
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
                {Each?.services?.[0]?.email}
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
                {Each?.services?.[0]?.phoneNumber}
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
                {Each?.services?.[0]?.Gender}
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
                {Each?.services?.[0]?.DateOfBirth}
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
                {Each?.services?.[0]?.Website}
              </p>

              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Camera
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {Each?.services?.[0]?.Camera}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Equipment Specification
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {Each?.services?.[0]?.EquipmentSpecification}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Gadget Photos
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <img
                  src={Each?.services?.[0]?.gadgetside}
                  alt="Gadget"
                  style={{ width: "100px" }}
                />
                <img
                  src={Each?.services?.[0]?.gadgettop}
                  alt="Gadget"
                  style={{ width: "100px" }}
                />
                <img
                  src={Each?.services?.[0]?.gadgetfront}
                  alt="Gadget"
                  style={{ width: "100px" }}
                />
              </div>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Website/Portfolio Link
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {Each?.services?.[0]?.Website}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Skill
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {Each?.services?.[0]?.SelectSkill}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Expertise
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {Each?.services?.[0]?.SelectExpertise}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Other Expertise
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {Each?.services?.[0]?.OtherExpertise}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Driving License
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <img
                  src={Each?.services?.[0]?.driveringfront}
                  alt="DrivingLincese"
                  style={{ width: "100px" }}
                />
                <img
                  src={Each?.services?.[0]?.driveringback}
                  alt="DrivingLincese"
                  style={{ width: "100px" }}
                />
              </div>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Driving License Number
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {Each?.services?.[0]?.DrivingLicenseNumber}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Aadhaar Card
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <img
                  src={Each?.services?.[0]?.Aadhaafront}
                  alt="AadhaarCard"
                  style={{ width: "100px" }}
                />
                <img
                  src={Each?.services?.[0]?.AadhaaBack}
                  alt="AadhaarCard"
                  style={{ width: "100px" }}
                />
              </div>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Aadhaar Card Number
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {Each?.services?.[0]?.AadhaarCardNumber}
              </p>
              <p
                style={{
                  fontSize: "1.6rem",
                  margin: "0",
                  fontWeight: "lighter",
                }}
              >
                Transfer data through
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  border: "1px solid #595959",
                  padding: "5px",
                  fontWeight: "lighter",
                }}
              >
                {Each?.services?.[0]?.Howdoyoutransferdata}
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
            `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/wallet/addandremoveMoneyinadminofhero/${id}`,
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
            `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/wallet/addandremoveMoneyinadminofhero/${id}`,
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

  const filterData = !query
    ? data?.HERO
    : data?.HERO?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.phoneNumber
            .toString()
            ?.toLowerCase()
            .includes(query?.toLowerCase())
      );

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/heros/deleteheroByIdinadmin/${id}`
      );
      toast.success(`${data?.data?.name} is deleted `);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Modals--------------------- */}{" "}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />{" "}
      <StatusModal show={open} onHide={() => setOpen(false)} />
      <ViewModal show={view} onHide={() => setView(false)} />
      <AddWallet show={wallet} onHide={() => setWallet(false)} />
      {/* ------------------------------------ */}
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
          Hero's List <br />
          <span style={{ fontSize: "14px" }}>All Hero's List</span>
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
            All Hero's
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
            Add Hero's
          </Button>
        </div>

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
        <br />

        <div style={{ overflow: "auto", marginTop: "2%" }} className="response">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th> Phone Number </th>
                <th> Service </th>
                <th> Wallet </th>
                <th> Rating </th>
                <th>Project History</th>
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
                  <td> {i.guy} </td>
                  <td style={{ minWidth: "200px" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {i.wallet}
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
                          setWallet(true);
                          setID(i._id);
                        }}
                      >
                        <i
                          class="fa-solid fa-plus"
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
                          class="fa-solid fa-minus"
                          style={{ color: "#008000" }}
                        ></i>
                      </div>
                    </div>
                  </td>
                  <td> {i.rating} </td>
                  <td> <Button variant="outline-info" onClick={() => navigate(`heroBooking/`)}>Booking History</Button> </td>
                  <td>
                    {i.status === "yes" ? (
                      <div
                        className="swipe"
                        onClick={() => {
                          setID(i._id);
                          setOpen(true);
                        }}
                      >
                        <div></div>
                      </div>
                    ) : (
                      <div className="swipe2">
                        <div></div>
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <i
                        class="fa-solid fa-eye"
                        style={{ color: "#099ffe", cursor: "pointer" }}
                        onClick={() => {
                          setID(i._id);
                          setView(true);
                        }}
                      ></i>
                      {/* <i
                        class="fa-solid fa-pen-to-square"
                        style={{ color: "#267cb5", cursor: "pointer" }}
                        onClick={() => {
                          setModalShow(true);
                          setEdit(true);
                        }}
                      ></i> */}
                      <i
                        class="fa-solid fa-trash"
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
      </section>
    </>
  );
};
export default HOC(GenerateId);

/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Cat = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [customerBanner, setCustomerBanner] = useState([]);
  const [ban, setBan] = useState(false);
  const [heroBanner, setHeroBanner] = useState([]);

  const fetchCustomerBanner = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/userBannerRouter/land1"
      );
      setCustomerBanner(data.Data);
      console.log(data.Data)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHeroBanner = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/heroBannerRouter/land1"
      );
      setHeroBanner(data.Data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCustomerBanner();
    fetchHeroBanner();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState("");
    const [desc, setDesc] = useState("");
    const [url, setUrl] = useState("");

    const postDetails = (e) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const AddCustomerBanner = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/userBannerRouter/addlandtoBanner",
          { image: url, desc }
        );
        console.log(data);
        fetchCustomerBanner();
        props.onHide();
      } catch (err) {
        console.log(err);
      }
    };

    const AddHeroBanner = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/heroBannerRouter/addHeroBanner",
          { image: url, desc }
        );
        console.log(data);
        fetchHeroBanner();
        props.onHide();
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
            {" "}
            {ban ? "Add Hero's Banner" : "Add Customer Banner"}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
            onSubmit={ban ? AddHeroBanner : AddCustomerBanner}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDesc(e.target.value)}
                onClick={() => postDetails()}
                required
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

  const deleteheroBanner = async (id) => {
    try {
      const data = await axios.delete(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/heroBannerRouter/land/${id}`
      );
      console.log(data);
      fetchHeroBanner();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCustomerBanner = async (id) => {
    try {
      const data = await axios.delete(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/userBannerRouter/land/${id}`
      );
      console.log(data);
      fetchCustomerBanner();
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

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Customer Banners
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setBan(false);
              setModalShow(true);
            }}
          >
            Add Customer Banner
          </Button>
        </div>
      </section>

      <section
        className="main-card--container"
        style={{ color: "black", marginBottom: "10%" }}
      >
        {customerBanner.map((i, index) => {
          return (
            <>
              <div className="card-container" key={index}>
                <div className="card">
                  <div className="card-body">
                    <img
                      src={i.image}
                      alt={i.desc}
                      style={{ width: "100%", height: "200px" }}
                    />
                    <p style={{ textAlign: "center" }}> {i.desc}</p>
                    <a href={i.link} target='_blank' >Link</a>

                    <div
                      style={{
                        marginTop: "2%",
                      }}
                    >
                      <Button
                        variant="outline-danger"
                        style={{ width: "100%" }}
                        onClick={() => deleteCustomerBanner(i._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            Hero's Banners
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setBan(true);
              setModalShow(true);
            }}
          >
            Add Hero's Banner
          </Button>
        </div>
      </section>

      <section
        className="main-card--container"
        style={{ color: "black", marginBottom: "10%" }}
      >
        {heroBanner.map((i, index) => {
          return (
            <>
              <div className="card-container" key={index}>
                <div className="card">
                  <div className="card-body">
                    <img
                      src={i.image}
                      alt={i.desc}
                      style={{ width: "100%", height: "200px" }}
                    />
                    <p style={{ textAlign: "center" }}> {i.desc} </p>

                    <div
                      style={{
                        marginTop: "2%",
                      }}
                    >
                      <Button
                        variant="outline-danger"
                        style={{ width: "100%" }}
                        onClick={() => deleteheroBanner(i._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Cat);

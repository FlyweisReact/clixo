/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Ban = [
  {
    img: "https://images.template.net/wp-content/uploads/2022/05/Banner-Ideas.jpg",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNbOr66i--Hhx3JClhr5HHf7vRoqrUclmPZg&usqp=CAU",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGL0V6RT1B6WNquZOzKEkGoE-ANS_PJ6EHj7V2GlWjtnOX9rl37zzrmYHKBhnm5pdBocU&usqp=CAU",
  },
];
const CustomerBan = [
  {
    img: "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/5c99af2eef263_template_image_1553575726.webp",
  },
  {
    img: "https://img.freepik.com/free-psd/photo-studio-banner-template_23-2148782165.jpg?w=2000",
  },
  {
    img: "https://img.freepik.com/free-psd/filmmaker-banner-template-design_23-2149084090.jpg?w=2000",
  },
];

const Cat = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [customerBanner, setCustomerBanner] = useState([]);
  const [ban, setBan] = useState(false);
  const [ heroBanner , setHeroBanner ] = useState([])

  const fetchCustomerBanner = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/userBannerRouter/land1"
      );
      setCustomerBanner(data.Data);
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
  }

  useEffect(() => {
    fetchCustomerBanner();
    fetchHeroBanner()
  }, []);

  function MyVerticallyCenteredModal(props) {
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
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
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

                    <div
                      style={{
                        marginTop: "2%",
                      }}
                    >
                      <Button
                        variant="outline-danger"
                        style={{ width: "100%" }}
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
        {CustomerBan.map((i, index) => {
          return (
            <>
              <div className="card-container" key={index}>
                <div className="card">
                  <div className="card-body">
                    <img
                      src={i.image}
                      alt={i.des}
                      style={{ width: "100%", height: "200px" }}
                    />

                    <div
                      style={{
                        marginTop: "2%",
                      }}
                    >
                      <Button
                        variant="outline-danger"
                        style={{ width: "100%" }}
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

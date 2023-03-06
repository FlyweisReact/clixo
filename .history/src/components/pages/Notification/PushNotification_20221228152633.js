/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Container, Form, FloatingLabel ,Button} from "react-bootstrap";


const PushNotification = () => {
  return (
    <>

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


      <section>
        <Container style={{ width: "600px", marginTop: "3%" }}>
          <Form>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Comments"
              className="mb-3"
            >
              <Form.Control as="textarea" placeholder="Leave a comment here" />
            </FloatingLabel>
            <br />
            <Button variant="outline-success">Submit</Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default HOC(PushNotification);

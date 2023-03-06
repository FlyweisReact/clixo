/** @format */

import React from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import HOC from "../../layout/HOC";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import img from "../../SVG/list.svg";

const Privacy = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/help/help_get"
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
    return (
      <Modal
        {...props}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Privacy Policy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
          >
            <FloatingLabel
              controlId="floatingTextarea"
              label="Privacy policy"
              className="mb-3"
            >
              <Form.Control as="textarea" />
            </FloatingLabel>

            <Button
              variant="outline-success"
              onClick={() => toast.success("Privacy Policy Edited")}
            >
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
        <p
          style={{
            color: "black",
            fontSize: "18px",
            margin: "0",
            marginTop: "10px",
          }}
        >
          Privacy Policy
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
            Privacy Policy
            <hr style={{ width: "70%" }} />
          </span>
        </div>


      <div >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Privacy Policy</th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                A privacy policy is a statement or legal document (in privacy
                law) that discloses some or all of the ways a party gathers,
                uses, discloses, and manages a customer or client's data.
              </td>
              <td style={{ display: "flex", gap: "10px" }}>
                <AiFillEdit
                  color="blue"
                  cursor={"pointer"}
                  onClick={() => {
                    setModalShow(true);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      </section>
    </>
  );
};

export default HOC(Privacy);

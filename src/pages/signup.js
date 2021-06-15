import { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AlertMessage from "../components/alertMessage";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    userPassword: "",
    userName: "",
  });

  const [showAlert, setShowAlert] = useState({
    success: null,
    message: null,
    show: false,
  });

  const [redirectToSignIn, setRedirectToSignIn] = useState(false);

  const alertMessageDisplay = () => {
    setShowAlert({ ...showAlert, show: false });
  };

  const signUpUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/", {
        name: userInfo.name,
        password: userInfo.userPassword,
        username: userInfo.userName,
      })
      .then((res) => {
        setShowAlert({
          success: true,
          message: res.data,
          show: true,
        });
        setUserInfo({
          name: "",
          userPassword: "",
          userName: "",
        });
        setTimeout(() => {
          setRedirectToSignIn(true);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setShowAlert({
          success: false,
          message: err.response.data.message,
          show: true,
        });
        setUserInfo({
          name: "",
          userPassword: "",
          userName: "",
        });
      });
  };

  if (redirectToSignIn) return <Redirect to="/signin" />;

  return (
    <>
      <Container style={{ marginTop: "100px" }}>
        <Row className="justify-content-md-center">
          <Col md="5">
            <Card>
              <center>
                <Card.Title style={{ marginTop: "20px" }}>Sign Up</Card.Title>
              </center>
              <Card.Body>
                <Form onSubmit={signUpUser}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      id="name"
                      placeholder="name"
                      value={userInfo.name}
                      onChange={(e) =>
                        setUserInfo({
                          userName: userInfo.userName,
                          userPassword: userInfo.userPassword,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="username"
                      id="username"
                      placeholder="Enter username"
                      value={userInfo.userName}
                      onChange={(e) =>
                        setUserInfo({
                          userName: e.target.value,
                          userPassword: userInfo.userPassword,
                          name: userInfo.name,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={userInfo.userPassword}
                      onChange={(e) =>
                        setUserInfo({
                          userName: userInfo.userName,
                          userPassword: e.target.value,
                          name: userInfo.name,
                        })
                      }
                    />
                  </Form.Group>
                  <center>
                    <Button variant="primary" type="submit">
                      Sign Up
                    </Button>
                  </center>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="row justify-content-center">
          {showAlert.show ? (
            <AlertMessage
              success={showAlert.success}
              message={showAlert.message}
              alertDisplay={alertMessageDisplay}
            />
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default SignUp;

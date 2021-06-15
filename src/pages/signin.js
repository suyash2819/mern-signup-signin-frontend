import { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import AlertMessage from "../components/alertMessage";
import { Redirect } from "react-router-dom";

const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    userPassword: "",
    userName: "",
  });

  const [showAlert, setShowAlert] = useState({
    success: null,
    message: null,
    show: false,
  });

  const [user, setUser] = useState(null);

  const alertMessageDisplay = () => {
    setShowAlert({ ...showAlert, show: false });
  };

  const signInUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/signin", {
        password: userInfo.userPassword,
        username: userInfo.userName,
      })
      .then((res) => {
        console.log(res);
        if (res.data.isMatch) {
          setShowAlert({
            success: true,
            message: res.data.message,
            show: true,
          });
          setUserInfo({
            userPassword: "",
            userName: "",
          });
          setUser(res.data.user);
        } else {
          setShowAlert({
            success: false,
            message: "please check the password entered",
            show: true,
          });
          setUserInfo({
            userPassword: "",
            userName: "",
          });
        }
      })
      .catch((err) => {
        setShowAlert({
          success: false,
          message: err.response.data.message,
          show: true,
        });
        setUserInfo({
          userPassword: "",
          userName: "",
        });
      });
  };

  if (user)
    return (
      <Redirect
        to={{
          pathname: "/welcome",
          state: { name: user.name },
        }}
      />
    );

  return (
    <>
      <Container style={{ marginTop: "100px" }}>
        <Row className="justify-content-md-center">
          <Col md="5">
            <Card>
              <center>
                <Card.Title style={{ marginTop: "20px" }}>Sign In</Card.Title>
              </center>
              <Card.Body>
                <Form onSubmit={signInUser}>
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
                        })
                      }
                    />
                  </Form.Group>
                  <center>
                    <Button variant="primary" type="submit">
                      Sign In
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

export default SignIn;

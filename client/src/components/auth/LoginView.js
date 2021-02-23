import React, { useState } from "react";
import isEmpty from "is-empty";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginView = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const loginUser = (event) => {
    event.preventDefault();
    props.loginUser(state);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  return (
    <Container>
      <h1>Login</h1>

      <br></br>

      <Form onSubmit={loginUser} autoComplete="off">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>

        <Link to="/register">Already have an account?</Link>

        <br></br>
        <br></br>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginView;

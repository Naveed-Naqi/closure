import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";

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
    <Grid container justify="center" direction="column" alignItems="center">
      <Grid item>
        <h1>LOGO</h1>
      </Grid>

      <Card style={{ width: "60%" }}>
        <CardHeader title="Login"></CardHeader>

        <CardContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <TextField
                variant="outlined"
                label="Username"
                id="username"
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Password"
                id="password"
              ></TextField>
            </Grid>

            <Grid item>
              <Button onClick={loginUser} variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </Grid>

          <br></br>
          <div>
            <Link to="/register">Need an account?</Link>
          </div>
        </CardContent>
      </Card>
    </Grid>

    // <Container>
    //   <h1>Login</h1>

    //   <br></br>

    //   <Form onSubmit={loginUser} autoComplete="off">
    //     <Form.Group controlId="formBasicEmail">
    //       <Form.Label>Email address</Form.Label>
    //       <Form.Control
    //         type="email"
    //         placeholder="Enter email"
    //         onChange={handleChange}
    //       />
    //       <Form.Text className="text-muted">
    //         We'll never share your email with anyone else.
    //       </Form.Text>
    //     </Form.Group>

    //     <Form.Group controlId="formBasicPassword">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type="password"
    //         placeholder="Password"
    //         onChange={handleChange}
    //       />
    //     </Form.Group>

    //     <Link to="/register">Already have an account?</Link>

    //     <br></br>
    //     <br></br>

    //     <Button variant="primary" type="submit">
    //       Login
    //     </Button>
    //   </Form>
    // </Container>
  );
};

export default LoginView;

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";

const RegisterView = (props) => {
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();
    props.registerUser(state, history);
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
        <CardHeader title="Register"></CardHeader>

        <CardContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <TextField variant="outlined" label="Username" id="username" />
            </Grid>
            <Grid item>
              <TextField variant="outlined" label="Email" id="email" />
            </Grid>
            <Grid item>
              <TextField variant="outlined" label="Password" id="password" />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Confirm Password"
                id="confirmPassword"
              />
            </Grid>

            <Grid item>
              <Button
                onClick={registerUser}
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </Grid>
          </Grid>

          <br></br>
          <div>
            <Link to="/">Already have an account?</Link>
          </div>
        </CardContent>
      </Card>
    </Grid>
    // <Container>
    //   <h1>Register</h1>
    //   <br></br>
    //   <Form onSubmit={registerUser} autoComplete="off">
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

    //     <Form.Group controlId="formBasicPassword">
    //       <Form.Label>Confirm Password</Form.Label>
    //       <Form.Control
    //         type="password"
    //         placeholder="Password"
    //         onChange={handleChange}
    //       />
    //     </Form.Group>

    //     <Link to="/">Already have an account?</Link>

    //     <br></br>
    //     <br></br>

    //     <Button variant="primary" type="submit">
    //       Register
    //     </Button>
    //   </Form>
    // </Container>
  );
};

export default RegisterView;

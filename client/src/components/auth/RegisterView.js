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
    console.log(state);
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
              <TextField
                variant="outlined"
                label="Username"
                id="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Email"
                id="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Password"
                id="password"
                type="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                type="password"
                label="Confirm Password"
                id="confirmPassword"
                onChange={handleChange}
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
  );
};

export default RegisterView;

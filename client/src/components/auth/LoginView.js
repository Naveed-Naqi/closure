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
  );
};

export default LoginView;

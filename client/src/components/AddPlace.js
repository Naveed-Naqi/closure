import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, Button } from "@material-ui/core";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
  Paper,
} from "@material-ui/core";

import ImageUpload from "./info/ImageUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <Paper>
          <Grid>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justify="center"
              direction="column"
            >
              <Grid item>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  defaultValue="Hello World"
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="outlined-required"
                  label="Address"
                  defaultValue="Hello World"
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  id="outlined-required"
                  label="Description"
                  defaultValue="Hello World"
                  variant="outlined"
                  size="medium"
                  rows="5"
                  multiline="true"
                />
              </Grid>
              <Grid item alignContent="flex-start">
                <h3>Upload an Image</h3>
                <ImageUpload />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  alignItems="flex-end"
                  // onClick={}
                  // disabled={value === ""}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </form>
  );
}

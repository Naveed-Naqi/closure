import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
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

export default function AddPlace({ open, handleToggle, handleSubmit }) {
  const classes = useStyles();

  const handleChange = () => {};

  return (
    <Dialog open={open} onClose={handleToggle}>
      <DialogTitle>ADD ITEM TO DIRECTORY</DialogTitle>
      <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
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
                fullWidth
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
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                alignItems="flex-end"
                onClick={handleToggle}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

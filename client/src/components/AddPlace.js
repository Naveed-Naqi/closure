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
  const [state, setState] = useState({
    name: "",
    desc: "",
    address: "",
    image: null,
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const updateSelectedImage = (image) => {
    setState({
      ...state,
      image: image,
    });
  };

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
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                size="medium"
                value={state.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="address"
                label="Address"
                variant="outlined"
                size="medium"
                value={state.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="desc"
                label="Description"
                variant="outlined"
                size="medium"
                rows="5"
                multiline="true"
                value={state.desc}
                onChange={handleChange}
              />
            </Grid>
            <Grid item alignContent="flex-start">
              <h3>Upload an Image</h3>
              <ImageUpload updateSelectedImage={updateSelectedImage} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                alignItems="flex-end"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e, state);
                }}
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

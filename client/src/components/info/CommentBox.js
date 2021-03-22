import React from "react";
import axios from "axios";
import { makeStyles, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const CommentBox = ({ auth, updateComments }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const params = useParams();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const postComment = async () => {
    try {
      const placeId = params.id;

      const res = await axios.post("/api/comments", {
        placeId: placeId,
        content: value,
        userId: auth.user.id,
      });

      updateComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <h2>Leave A Comment</h2>
      </div>
      <div>
        <TextField
          label="Enter Your Comment"
          multiline
          rows={4}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div>
        <Button variant="outlined" color="primary" onClick={postComment}>
          Submit
        </Button>
      </div>
    </form>
  );
};

CommentBox.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CommentBox);

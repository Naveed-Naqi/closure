import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Loading from "./utils/Loading";
import InfoIcon from "@material-ui/icons/Info";

import AddPlace from "./AddPlace";

import {
  Grid,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  CardHeader,
  CardMedia,
  IconButton,
  Paper,
  Modal,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

import unknownAvatar from "../img/unknown_avatar.jpg";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  background: {
    background: (0, 0, 0),
  },
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: [],
      comments: [],
      loading: false,
      open: false,
    };
  }

  getLikedPlaces = async () => {
    try {
      this.setState({
        loading: true,
      });

      const res = await axios.get("/api/profile/likes");
      console.log(res.data);

      this.setState({
        liked: res.data,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  getCommentedPlaces = async () => {
    try {
      this.setState({
        loading: true,
      });

      const res = await axios.get("/api/profile/comments");

      this.setState({
        comments: res.data,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleSubmit = async (e, data) => {
    try {
      let newPlace = new FormData();
      newPlace.append("image", data.image);

      const { name, desc, address } = data;

      newPlace.set("name", name);
      newPlace.set("desc", desc);
      newPlace.set("address", address);

      const res = await axios.post("/api/places/", newPlace, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      this.handleToggle();
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = async () => {
    await this.getLikedPlaces();
    await this.getCommentedPlaces();
  };

  render() {
    const { liked, comments, loading, open } = this.state;
    const { classes, auth } = this.props;
    const { username, email } = auth.user;

    return (
      <div>
        <AddPlace
          open={open}
          handleToggle={this.handleToggle}
          handleSubmit={this.handleSubmit}
        />

        <Grid
          container
          justify="center"
          spacing={10}
          style={{ paddingTop: "90px" }}
        >
          <Grid item xs={3}>
            <Card
              style={{ height: "55vh", position: "relative", overflow: "auto" }}
            >
              <CardHeader
                action={
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleToggle}
                  >
                    Add a Place
                  </Button>
                }
              />
              <CardContent>
                <Avatar
                  src={unknownAvatar}
                  style={{ height: "20vh", width: "20vh", margin: "auto" }}
                />
                <Typography variant="h5" component="h2">
                  {username}
                </Typography>
                <Typography
                  style={{ paddingBottom: "10" }}
                  color="textSecondary"
                >
                  {email}
                </Typography>
                <div style={{ marginTop: "40px" }}>
                  <Typography variant="h5">Stats</Typography>
                </div>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  style={{ height: "10vh", paddingTop: "10pt" }}
                >
                  <Grid item xs={12}>
                    <Typography>
                      Number of Liked Places
                      <br />
                      <div style={{ color: "red", fontSize: "18pt" }}>
                        {liked.length}
                      </div>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Total Number of Places I Commented On
                      <br />
                      <div style={{ color: "red", fontSize: "18pt" }}>
                        {comments.length}
                      </div>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={7}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card style={{ height: "55vh", overflow: "auto" }}>
                  <CardHeader
                    style={{ backgroundColor: "#e7e7e7" }}
                    title="Restaurants I Enjoyed"
                  />
                  <CardContent>
                    <TableContainer style={{ width: "100%", height: "600px" }}>
                      <Table style={{ minWidth: "400" }}>
                        <TableBody>
                          <TableRow>
                            {loading ? (
                              <Loading />
                            ) : (
                              <Grid
                                container
                                alignItems="center"
                                justify="center"
                              >
                                {liked.length > 0 ? (
                                  liked.map((elem) => {
                                    const { name, address, images, id } = elem;

                                    return (
                                      <TableCell>
                                        <Grid item xs={3}>
                                          <Card
                                            style={{
                                              width: "28vh",
                                              height: "28vh",
                                            }}
                                          >
                                            <CardHeader
                                              action={
                                                <IconButton
                                                  id={id}
                                                  onClick={(e) => {
                                                    const id =
                                                      e.currentTarget.id;
                                                    this.props.history.push(
                                                      `/single/${id}`
                                                    );
                                                  }}
                                                >
                                                  <InfoIcon />
                                                </IconButton>
                                              }
                                              title={name}
                                              subheader={address}
                                            />
                                            <CardMedia
                                              style={{ height: "80%" }}
                                              image={images[0].link}
                                            />
                                          </Card>
                                        </Grid>
                                      </TableCell>
                                    );
                                  })
                                ) : (
                                  <h1>No results</h1>
                                )}
                              </Grid>
                            )}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card style={{ height: "55vh", overflow: "auto" }}>
                  <CardHeader
                    style={{ backgroundColor: "#e7e7e7" }}
                    title="Restaurants I Commented On"
                  />
                  <CardContent>
                    <TableContainer style={{ width: "100%", height: "600px" }}>
                      <Table style={{ minWidth: "400" }}>
                        <TableBody>
                          <TableRow>
                            {loading ? (
                              <Loading />
                            ) : (
                              <Grid
                                container
                                alignItems="center"
                                justify="center"
                              >
                                {comments.length > 0 ? (
                                  comments.map((elem) => {
                                    const { name, address, images, id } = elem;

                                    return (
                                      <TableCell>
                                        <Grid item xs={3}>
                                          <Card
                                            style={{
                                              width: "28vh",
                                              height: "28vh",
                                            }}
                                          >
                                            <CardHeader
                                              action={
                                                <IconButton
                                                  id={id}
                                                  onClick={(e) => {
                                                    const id =
                                                      e.currentTarget.id;
                                                    this.props.history.push(
                                                      `/single/${id}`
                                                    );
                                                  }}
                                                >
                                                  <InfoIcon />
                                                </IconButton>
                                              }
                                              title={name}
                                              subheader={address}
                                            />
                                            <CardMedia
                                              style={{ height: "80%" }}
                                              image={images[0].link}
                                            />
                                          </Card>
                                        </Grid>
                                      </TableCell>
                                    );
                                  })
                                ) : (
                                  <h1>No results</h1>
                                )}
                              </Grid>
                            )}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfilePage);

import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Loading from "./utils/Loading";
import InfoIcon from "@material-ui/icons/Info";

import {
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from "@material-ui/core";
import { CardHeader, CardMedia, IconButton, Paper } from "@material-ui/core";

import unknownAvatar from "../img/unknown_avatar.jpg";

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

  componentDidMount = async () => {
    await this.getLikedPlaces();
    await this.getCommentedPlaces();
  };

  render() {
    const { liked, comments, loading } = this.state;
    const { classes } = this.props;

    return (
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
            <CardContent>
              <Avatar
                src={unknownAvatar}
                style={{ height: "20vh", width: "20vh", margin: "auto" }}
              />
              <Typography variant="h5" component="h2">
                NAME
              </Typography>
              <Typography style={{ paddingBottom: "10" }} color="textSecondary">
                EMAIL
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
                    Total Number of Placed I Commented On
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
                <CardHeader title="Restaurants I Enjoyed" />
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
                                            width: "24vh",
                                            height: "25vh",
                                          }}
                                        >
                                          <CardHeader
                                            action={
                                              <IconButton
                                                id={id}
                                                onClick={(e) => {
                                                  const id = e.currentTarget.id;
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
                <CardHeader title="Restaurants I Commented On" />
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
                                            width: "24vh",
                                            height: "25vh",
                                          }}
                                        >
                                          <CardHeader
                                            action={
                                              <IconButton
                                                id={id}
                                                onClick={(e) => {
                                                  const id = e.currentTarget.id;
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
    );
  }
}

export default ProfilePage;

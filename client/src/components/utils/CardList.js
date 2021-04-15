import React, { Component } from "react";

import Loading from "./Loading";
import { useHistory } from "react-router";

import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
});

export default function CardList({ loading, places }) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div>
      {loading ? (
        <Grid container justify="center">
          <Loading />
        </Grid>
      ) : (
        <Grid container spacing={3} alignItems="center" justify="center">
          {places.length > 0 ? (
            places.map((elem, index) => {
              const { name, address, images, id } = elem;

              return (
                <Grid item xs={3} key={index}>
                  <Card>
                    <CardHeader
                      action={
                        <IconButton
                          id={id}
                          onClick={(e) => {
                            const id = e.currentTarget.id;
                            history.push(`/single/${id}`);
                          }}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                      title={name}
                      subheader={address}
                    />
                    <CardMedia
                      className={classes.media}
                      image={images[0].link}
                    />
                  </Card>
                </Grid>
              );
            })
          ) : (
            <h1>No results</h1>
          )}
        </Grid>
      )}
    </div>
  );
}

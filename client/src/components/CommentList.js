import React, { Component } from "react";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ExpandMore from "@material-ui/icons/ExpandLess";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

export default class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    console.log("Hi");
  };

  render() {
    const { comments } = this.props;
    return (
      <div>
        <Paper style={{ maxHeight: 300, overflow: "auto", width: "50vw" }}>
          <List>
            {comments.map((elem, index) => {
              const { content, user } = elem;
              const username = (user && user.username) || [""];

              return (
                <div key={index}>
                  <ListItem
                    alignItems="flex-start"
                    button
                    onClick={this.handleClick}
                  >
                    <ListItemAvatar>
                      <Avatar alt={username}>{username[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={username} secondary={content} />
                    <ExpandMore />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}

            {comments.map((elem, index) => {
              const { content, user } = elem;
              const username = (user && user.username) || [""];

              return (
                <div key={index}>
                  <ListItem
                    alignItems="flex-start"
                    button
                    onClick={this.handleClick}
                  >
                    <ListItemAvatar>
                      <SubdirectoryArrowRightIcon fontSize='large' />
                    </ListItemAvatar>
                    <ListItemAvatar>
                      <Avatar alt={username}>{username[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={username} secondary={content} />
                    <ExpandMore />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}

          </List>
        </Paper>
      </div>
    );
  }
}

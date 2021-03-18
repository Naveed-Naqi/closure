import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ExpandMore from "@material-ui/icons/ExpandMore";

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
        <List>
          {comments.map((elem, index) => {
            const { content, user } = elem;
            const { username } = user;

            return (
              <div key={index}>
                <ListItem
                  alignItems="flex-start"
                  button
                  onClick={this.handleClick}
                >
                  <ListItemAvatar>
                    <Avatar alt="Raj Korpan">{username[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={username} secondary={content} />
                  <ExpandMore />
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

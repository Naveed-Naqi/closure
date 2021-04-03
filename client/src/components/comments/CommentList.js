import React, { Component } from "react";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ReplyIcon from "@material-ui/icons/Reply";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import { TramRounded } from "@material-ui/icons";

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
        <Paper style={{ maxHeight: 300, overflow: "auto" }}>
          <List>
            {comments.map((elem, index) => {
              let { content, user, allRepliesOpen, replyOpen } = elem;
              const username = (user && user.username) || [""];

              return (
                <div key={index}>
                  <Divider />
                  <ListItem alignItems="flex-start" onClick={this.handleClick}>
                    <ListItemAvatar>
                      <Avatar alt={username}>{username[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={username} secondary={content} />
                    <IconButton>
                      <ReplyIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        allRepliesOpen = true;
                      }}
                    >
                      <ExpandMore />
                    </IconButton>
                  </ListItem>

                  <Collapse in={allRepliesOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Divider />
                      <ListItem>
                        <ListItemAvatar>
                          <SubdirectoryArrowRightIcon fontSize="large" />
                        </ListItemAvatar>

                        <ListItemAvatar>
                          <Avatar alt={username}>{username[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={username} secondary={content} />
                      </ListItem>
                    </List>
                  </Collapse>
                </div>
              );
            })}
          </List>
        </Paper>
      </div>
    );
  }
}

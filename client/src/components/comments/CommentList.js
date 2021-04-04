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

export default class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments, openReplyTextBox, toggleAllReplies } = this.props;
    return (
      <div>
        <Paper style={{ height: 300, overflow: "auto" }}>
          <List>
            {comments.map((elem, index) => {
              let { content, user, allRepliesOpen, replies } = elem;
              const username = (user && user.username) || [""];

              return (
                <div key={index}>
                  <Divider />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={username}>{username[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={username} secondary={content} />
                    <IconButton onClick={openReplyTextBox} id={index}>
                      <ReplyIcon />
                    </IconButton>
                    <IconButton onClick={toggleAllReplies} id={index}>
                      {allRepliesOpen ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </ListItem>

                  <Collapse in={allRepliesOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Divider />

                      {replies &&
                        replies.map((reply, index) => {
                          return (
                            <ListItem key={`r${index}`}>
                              <ListItemAvatar>
                                <SubdirectoryArrowRightIcon fontSize="large" />
                              </ListItemAvatar>

                              <ListItemAvatar>
                                <Avatar alt={reply.user.username}>
                                  {reply.user.username[0]}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={username}
                                secondary={reply.content}
                              />
                            </ListItem>
                          );
                        })}
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

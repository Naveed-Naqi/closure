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
import Badge from "@material-ui/core/Badge";

import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ReplyIcon from "@material-ui/icons/Reply";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class CommentList extends Component {
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

                    {this.props.auth.isAuthenticated && (
                      <IconButton onClick={openReplyTextBox} id={index}>
                        <ReplyIcon />
                      </IconButton>
                    )}

                    <Badge
                      badgeContent={replies && replies.length}
                      color="primary"
                    >
                      <IconButton onClick={toggleAllReplies} id={index}>
                        {allRepliesOpen ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Badge>
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
                                primary={reply.user.username}
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

CommentList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CommentList);

import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  Toolbar,
  IconButton,
  Button,
  MenuList,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Settings } from "@material-ui/icons";

import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";

const NewApp = () => {
  const [value, setValue] = useState(0);

  const handleClickTab = (e, newValue) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const history = useHistory();
  const handleProfile = () => {
    history.push("/Profile");
  };
  const handleHome = () => {
    history.push("/home");
  };
  const handleAbout = () => {
    history.push("/about");
  };
  const handleRegister = () => {
    history.push("/register");
  };
  const handleLogin = () => {
    history.push("/");
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {};

  return (
    <>
      <AppBar color="primary">
        <div style={{ position: "relative" }}>
          <Toolbar>
            <Typography> Closure </Typography>

            <Tabs
              onChange={handleClickTab}
              indicatorColor="secondary"
              value={value}
            >
              <Tab onClick={handleHome} label="Home" />
              <Tab onClick={handleAbout} label="about" />
            </Tabs>

            <div style={{ position: "absolute", right: "35px" }}>
              <IconButton></IconButton>
              <Button
                onClick={handleClick}
                aria-haspopup="true"
                aria-controls="simple-menu"
                variant="contained"
                color="third"
              >
                <Settings />
              </Button>
              <Menu
                style={{ marginTop: "35px" }}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile} onClose={handleClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={logout} onClose={handleClose}>
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </div>
      </AppBar>
    </>
  );
};
export default connect(mapStateToProps, { logoutUser })(NewApp);

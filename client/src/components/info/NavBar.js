import React from "react";
import NewApp from "./NewApp";
import { ThemeProvider } from "@material-ui/core";
import Theme from "./Theme";

const NavBar = () => {
  return (
    <ThemeProvider theme={Theme}>
      <NewApp />
    </ThemeProvider>
  );
};

export default NavBar;

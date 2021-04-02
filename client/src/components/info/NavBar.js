import React, { useState } from 'react'
import {AppBar, Toolbar, IconButton, Typography, Button, Drawer} from '@material-ui/core'
import { Menu, AccountCircle } from '@material-ui/icons'
import { useHistory } from "react-router-dom"
import NewApp from "./NewApp"
import { ThemeProvider } from '@material-ui/core'
import Theme from "./Theme"
 


const NavBar = () => {
  return (
    <ThemeProvider theme = {Theme}>
      <NewApp/>
    </ThemeProvider>
  )
}

export default NavBar


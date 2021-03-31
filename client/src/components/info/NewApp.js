import React, { useState, MouseEvent } from 'react'
import { AppBar, Tab, Tabs, Typography, Toolbar,IconButton,Button,MenuList,MenuItem,Menu } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { AccountCircle } from '@material-ui/icons'

const NewApp = () => {
const [value, setValue] = useState(0)

const handleClickTab = (e, newValue) => {
setValue(newValue)
}
const [anchorEl, setAnchorEl] = React.useState(null);
const handleOpenMenu = e => {
    setAnchorEl (e.currentTarget)
}
const history = useHistory()
const handleProfile = () => {
    history.push("/Profile")
  }
const handleHome = () => {
    history.push("/home")
}
const handleAbout = () => {
    history.push("/about")
}
const handleRegister = () => {
    history.push("/register")
}
const handleLogin = () => {
    history.push("/")
}
const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
const handleClose = () => {
    setAnchorEl(null);
  };



  

    return (
        
       <>
        <AppBar color = 'primary'>
        <div style = {{position: 'relative'}}>
            <Toolbar>
            <Typography> Closure </Typography>
                
                <Tabs onChange = {handleClickTab} indicatorColor = 'secondary' value = {value}>
                    <Tab onClick = {handleHome} label = 'Home' />
                    <Tab onClick = {handleAbout}label = 'about' />

                </Tabs>
                
                <div style = {{position: 'absolute', right: '5px'}}>
                <Button 
                onClick = {handleRegister}
                aria-haspopup="true"
                aria-controls = "menu"
                variant = 'contained' 
                color = 'third'>
                    Register
                </Button>
                <Button 
                onClick = {handleLogin}
                
                variant = 'contained' 
                color = 'third'>
                    Login
                </Button>
                <Button 
                onClick = {handleProfile}
                
                variant = 'contained' 
                color = 'third'>
                    Profile
                </Button>
                </div>


                <Button 
                onClick = {handleClick}
                aria-haspopup="true"
                aria-controls = "simple-menu"
                variant = 'contained' 
                color = 'third'>
                    Profile
                </Button>
                <Menu 
                id = "simple-menu" 
                anchorEl = {anchorEl} 
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                    <MenuItem onClose={handleClose}> dfsfsd</MenuItem>
                    <MenuItem onClose={handleClose}> dfsfsd</MenuItem>
                    <MenuItem onClose={handleClose}> dfsfsd</MenuItem>
                    <MenuItem onClose={handleClose}> dfsfsd</MenuItem>
                    <MenuItem onClose={handleClose}> dfsfsd</MenuItem>
                </Menu> 

            </Toolbar>
        </div>
        </AppBar>
        
        
        
        
       
       </>
    )
}

export default NewApp







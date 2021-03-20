import React, { useState } from 'react'
import {AppBar, Toolbar, IconButton, Typography, Button, Drawer} from '@material-ui/core'
import { Menu, AccountCircle } from '@material-ui/icons'
import { useHistory } from "react-router-dom"

 
function NavBar() {
    const [open, setOpen] = useState (false)
    const handleDrawer = () =>{
      setOpen(true)
    }
    const history = useHistory()
    
    const handleHome = () => {
      history.push("/home")
    }
    const handleLogin = () => {
      history.push("/")
    }
    const handleRegister = () => {
      history.push("/register")
    }
    const handleProfile = () => {
      history.push("/Profile")
    }


  
    return ( 
        <div>
              <AppBar position = 'static'  >
      <Toolbar>
       <IconButton onClick = {handleDrawer} color = 'inherit' edge = 'start' aria-label = 'menu'>      
        <Menu/>
       </IconButton>  
       <Typography variant = 'h6' style = {{ flexGrow : 1 }}>
       Closure 
       </Typography>
        <Button onClick = {handleHome} color = 'inherit'> 
              Home 
        </Button>
        <Button color = 'inherit'> 
        About

        </Button>
        <IconButton onClick = {handleProfile} color = 'inherit' aria-label = 'account'> 
           <AccountCircle/>
        
        </IconButton>


      </Toolbar>
     
    </AppBar> 
    <Drawer
        anchor = 'left'
        open = {open}
        onClose = {() => setOpen(false)} 

    
    >
      <div style = {{ height : "100%", width : "250px" }}> 
      <Button onClick = {handleLogin} variant = 'contained' style = {{ borderRadius : 10 }} color = "primary">login</Button>
      <Button onClick = {handleRegister} variant = 'contained' style = {{ borderRadius : 10 }} color = "primary">signup</Button>
        </div>
     
    </Drawer>
        </div>
    )
}

export default NavBar

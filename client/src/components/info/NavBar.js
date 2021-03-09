import React, { useState } from 'react'
import {AppBar, Toolbar, IconButton, Typography, Button, Drawer} from '@material-ui/core'
import { Menu, AccountCircle } from '@material-ui/icons'

function NavBar() {
    const [open, setOpen] = useState (false)
    const handleDrawer = () =>{
      setOpen(true)
    }
    return ( 
        <div>
              <AppBar position = 'static'  >
      <Toolbar>
       <IconButton onClick = {handleDrawer} color = 'inherit' edge = 'start' aria-label = 'menu'>      
        <Menu/>
       </IconButton>  
       <Typography variant = 'h6' style = {{ flexGrow : 1 }}>
         fdsfsd
       </Typography>
        <Button color = 'inherit'> 
              fdsfds 
        </Button>
        <Button color = 'inherit'> 
        fdsfds

        </Button>
        <IconButton color = 'inherit' aria-label = 'account'> 
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
      <Button variant = 'contained' style = {{ borderRadius : 10 }} color = "primary">login</Button>
      <Button variant = 'contained' style = {{ borderRadius : 10 }} color = "primary">signup</Button>
        </div>
     
    </Drawer>
        </div>
    )
}

export default NavBar

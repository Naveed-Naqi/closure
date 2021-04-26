import React from "react";
import {
  Button,
  MenuList,
  MenuItem,
  Menu,
} from "@material-ui/core";


export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <Button 
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="contained"
            size="small"
            paddingBottom="25px"
            onClick={handleClick}
        >
            Filter by Borough
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuList>
            <MenuItem
                id="manhattan"
                onClick={handleClose}
                onClose={handleClose}
            >
                Manhattan
            </MenuItem>

            <MenuItem
                id="Brooklyn" 
                onClick={handleClose}
                onClose={handleClose}
            >
                Brooklyn
            </MenuItem>

            <MenuItem
                id="Queens" 
                onClick={handleClose}
                onClose={handleClose}
            >
                Queens
            </MenuItem>

            <MenuItem
                id="Bronx" 
                onClick={handleClose}
                onClose={handleClose}
            >
                Bronx
            </MenuItem>

            <MenuItem
                id="staten island" 
                onClick={handleClose}
                onClose={handleClose}
            >
                Staten Island
            </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

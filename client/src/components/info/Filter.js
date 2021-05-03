import React from "react";
import {
  Button,
  MenuList,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyle = makeStyles((theme) => ({
  formControl: {
      minWidth: 120
  }
}))

export default function Filter(props) {
  const classes = useStyle();
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
          <InputLabel>Filter by...</InputLabel>
          <Select
              value={filter}
              onChange={handleChange}
          >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="manhattan">Manhattan</MenuItem>
              <MenuItem value="brooklyn">Brooklyn</MenuItem>
              <MenuItem value="bronx">Bronx</MenuItem>
              <MenuItem value="queens">Queens</MenuItem>
              <MenuItem value="staten island">Staten Island</MenuItem>
            </Select>
        </FormControl>
    </div>
  );
}

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyle = makeStyles((theme) => ({
    formControl: {
        minWidth: 120
    }
}))

//need to change places array somehow here
function Sort(props) {
    const classes = useStyle();
    const [sort, setSort] = React.useState('');

    const handleChange = (event) => {
        setSort(event.target.value);
        //if updating places is handled here then WIP
        // console.log('Do change here')
        // switch (sort) {
        //     case 'Alphabetical':
        //         console.log('Alphabetical');
        //         console.log(props.places[0]);
        //         break;
        //     case 'Most Liked':
        //         parent.places = props.places.pop();
        //         console.log(props.places.pop());
        //         console.log('Most Liked');
        //         console.log(props.places[1]);
        //         break;
        //     case 'Recently Added':
        //         console.log('Recently Added');
        //         console.log(props.places[2]);
        //         break;
        //     default:
        //         console.log('No change');
        // }
        
    };
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Sort by...</InputLabel>
                <Select 
                    value={sort}
                    onChange={handleChange}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={'Alphabetical'}> Alphabetical </MenuItem>
                    <MenuItem value={'Most Liked'}> Most Liked </MenuItem>
                    <MenuItem value={'Recently Added'}> Recently Added </MenuItem>

                </Select>
            </FormControl>
        </div>
    )
}

export default Sort

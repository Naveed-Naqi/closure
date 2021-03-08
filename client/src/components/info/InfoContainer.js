// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
import {Grid, Typography} from "@material-ui/core"

function Closure_Info(props) {
    const res_name = props.name
    const res_info = props.address
    const res_summary = props.summary
    const res_website = "www.whatismywebsite.com"
    const res_website_link = "https://" + res_website
    return (
        <Grid container spacing={100} justify="space-evenly" alignItems="center" style={{backgroundColor:"#fcd0c5"}}>
            <Grid sm={5} item >
                <img src={props.restaurant_pic} style={{margin:"10px"}}/>
            </Grid>
            <Grid item sm={6} container direction="column">
                <Grid item >
                    <Typography variant="h4">
                        {res_name}
                    </Typography>
                </Grid>
                <Grid item sm container justify="space-between"> 
                    <Grid>
                        <Typography variant="h5">
                            More Information:
                        </Typography>
                        <Typography variant="div">
                            {res_info}
                        </Typography>
                        <br/>
                        {/* <Typography variant="a">
                            {res_website}
                        </Typography> */}
                        <a href={res_website_link}> {res_website} </a>
                    </Grid>
                    <Grid>
                        <img src={props.mapInfo} />
                    </Grid>
                </Grid>
                <Grid>
                    <Typography variant="h5">
                        Summary:
                    </Typography>
                    <Typography variant="div">
                        {res_summary}
                    </Typography>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

export default Closure_Info

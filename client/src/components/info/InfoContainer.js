// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
import {Grid, Typography} from "@material-ui/core"

function Closure_Info(props) {
    const res_info = "37 W 46th St, New York, NY 10036"
    const res_website = "www.ikinaristeakusa.com"
    const res_website_link = "https://" + res_website
    return (
        <Grid container spacing={100} justify="space-evenly" alignItems="center" style={{backgroundColor:"#fcd0c5"}}>
            <Grid sm={5} item >
                <img src={props.restaurant_pic} style={{margin:"30px"}}/>
            </Grid>
            <Grid item sm={6} container direction="column">
                <Grid item >
                    <Typography variant="h2">
                        Ikinari Steakhouse
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
                        <img src={props.mapInfo} style={{width:"350px", height:"250px", paddingRight:"10px"}}/>
                    </Grid>
                </Grid>
                <Grid>
                    <Typography variant="h5">
                        Summary:
                    </Typography>
                    <Typography variant="div">
                    Craving Steak? Just Dig In! Ikinari Steak is a Japan-based steak restaurant chain owned by chef and restaurateur Kunio Ichinose. Ikinari Steak opened in Tokyo in December 2013, and now has 200 locations throughout Japan (as of Jan 2018). The idea behind Ikinari Steak is to serve super thick high-quality meats quickly and economically. It's a fun, interactive, communal, and brand new experience for New Yorkers! - Steaks are cut to order - Order your steak by the ounce - Pour the original soy-based "J-STEAK Sauce" on the sizzling plate.
                    </Typography>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

export default Closure_Info

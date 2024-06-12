import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { CloudDone, CloudOff } from "@mui/icons-material"
import { ready } from "../../schemas/health";
import { useTheme } from "@mui/material/styles";


export default function BottomBar() {
    const { loading, error, data } = useQuery(ready);
    const theme = useTheme();

    let stateComponent = (<CircularProgress size={30}/>)
    if (!loading) {
        if (error || !data?.ready) {
            stateComponent = (<CloudOff color="error" />)
        }
        else {
            stateComponent = (<CloudDone color="success" />)
        }
    }

    return (
        <Box component="section" sx={{position: "fixed", bottom: 0, width: "100%"}}>
            <Paper elevation={1} sx={{borderBottomWidth: "2px", borderBottomColor: theme.palette.primary.main, borderBottomStyle: "solid"}}>
                <Grid container spacing={2}>
                    <Grid item xs={10} sx={{display: "flex", justifyContent: "left", paddingBottom: "16px"}}>
                        <Typography sx={{marginLeft: "16px"}}>
                            © 2024 - 2024 Leo Nadeau - All Rights Reserved.
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{display: "flex", justifyContent: "right", paddingRight: "16px"}}>
                        {stateComponent}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}
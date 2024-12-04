import { Box, Card, CardContent, Typography } from "@mui/material";
import Login from "./login"

type Prop = {
    mobile: boolean;
};

export default function LoginCard(props: Prop) {
    return (
    <Box
    sx={{
        mt: "150px",
        mb: props.mobile ? "150px" : null,
        width: "fit-content",
        height: "fit-content",
        justifySelf: "center"
    }}>
        <Card
        color="white"
        sx={{
            borderRadius: "30px",
            mx: props.mobile ? "auto" : "none",
            width: props.mobile ? "75%" : "750px",
            height: "fit-content",
            boxShadow: "0px 0px 10px 10px rgb(0,0,0)"
        }}>
            <CardContent>
                <Typography variant={props.mobile ? "h4" : "h3"} sx={{justifySelf: "center", textAlign:'center'}}>
                    Welcome to the Big Game!
                </Typography>
                <Typography sx={{mx: "20px", mb: "25px", textAlign: 'center', justifySelf:"center"}}>
                    Currently we just need some info on how we should manage the details of the next BIG game.
                </Typography>
                <Login/>
            </CardContent>
        </Card>
    </Box>
    );
}
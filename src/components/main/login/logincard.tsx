import { Box, Card, CardContent, Typography } from "@mui/material";
import Login from "./login"

export default function LoginCard() {
    return (
    <Box
    sx={{
        mt: "150px",
        width: "fit-content",
        height: "fit-content",
        justifySelf: "center"
    }}>
        <Card
        color="white"
        sx={{
            borderRadius: "30px",
            width: "750px",
            height: "500px",
            boxShadow: "0px 0px 10px 10px rgb(0,0,0)"
        }}>
            <CardContent>
                <Typography variant="h3" sx={{justifySelf: "center"}}>
                    Welcome to the Big Game!
                </Typography>
                <Typography sx={{mx: "20px", mb: "25px", justifySelf:"center"}}>
                    Currently we just need some info on how we should manage the details of the next BIG game.
                </Typography>
                <Login/>
            </CardContent>
        </Card>
    </Box>
    );
}
'use client'
import { 
    AppBar,
    Toolbar,
    Button,
    CardMedia } from "@mui/material";
export default function Header() {
    return (
    <AppBar 
    position="sticky"
    sx={{
        backgroundColor: "black"
    }}>
        <Toolbar
        sx={{
            justifyContent: "center"
        }}>
            <Button
            href="/"
            sx={{
                border: "0px solid #2f2f2f",
                borderRadius:"10px",
                backgroundColor: "#2f2f2f",
                margin: "15px",
                boxShadow: "0px 0px 5px gray inset",
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: "0px 0px 10px gray inset",
                }
            }}>
                <CardMedia
                component="img"
                src="/assets/biggamelogo.png"
                sx={{
                    width: "223px",
                    height: "83px"
                }}>
                </CardMedia>
            </Button>
        </Toolbar>
    </AppBar>
    );
}
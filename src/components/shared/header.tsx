'use client'
import { 
    AppBar,
    Toolbar,
    Button,
    CardMedia } from "@mui/material";
import Cookies from 'js-cookie'
import LogoutButton from "./logoutbutton"
import { useEffect, useState } from "react";

export default function Header() {

    const [checkSession, setSession] = useState<string | undefined>(undefined);
    const watchSession = useEffect(() => {
        setSession(Cookies.get('session'));
    }, []);

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
            {checkSession === undefined ? null : <LogoutButton/>}
        </Toolbar>
    </AppBar>
    );
}
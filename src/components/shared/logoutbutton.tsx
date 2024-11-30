'use client'
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function LogoutButton() {
    const router = useRouter();
    function killSession() {
        Cookies.remove('session');
        router.push('/');
    }

    return (
        <Button variant="contained" onClick={killSession} 
        sx={{
            marginY: '50px',
            backgroundColor: 'rgb(45, 45, 45)',
            boxShadow: "0px 0px 5px gray inset",
            transition: "all 0.3s ease",
            "&:hover": {
                boxShadow: "0px 0px 10px gray inset",
            }
        }}>
            Log Out
        </Button>
    );
}
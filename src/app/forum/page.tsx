'use client'
import Header from "@/components/shared/header";
import FormCard from "@/app/forum/components/formcard"
import { useMediaQuery } from "@mui/material";


export default function Home() {
    const isMobile = useMediaQuery('(max-width: 750px)');

    return (
        <div>
            <Header/>
            <FormCard mobile={isMobile}/>
        </div>
    );
}
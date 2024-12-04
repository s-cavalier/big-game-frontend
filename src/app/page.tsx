'use client'
import Header from "@/components/shared/header"
import LoginCard from "@/components/main/login/logincard"
import { useMediaQuery } from "@mui/material";

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 750px)');

  return (
    <div>
      <Header/>
      <LoginCard mobile={isMobile}/>
    </div>
  );
}

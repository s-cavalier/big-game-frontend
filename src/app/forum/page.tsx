'use client'
import Header from "@/components/shared/header";
import FormCard from "@/app/forum/components/formcard"
import { useState } from "react";


export default function Home() {
    return (
        <div>
            <Header/>
            <FormCard/>
        </div>
    );
}
'use client'
import { Box, FormGroup, Typography, Checkbox, FormControl, FormControlLabel, Grid2, Table, Divider, Input, RadioGroup, Radio, TextField, Button, Fade, Popper, CircularProgress } from "@mui/material";
import React, { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'


type fDate = {
    name: string,
    dt: Number
};

// definitely abstractable and improvable but i'm not remaking a google forms just a 6 question form does not need that much work

export default function FormCard() {
    const router = useRouter();

    const [dateMask, setDateMask] = useState<number>(0);
    const [canPay, setCanPay] = useState<boolean | null>(null);
    const [sportMask, setSportMask] = useState<number>(0);
    const [rName, setRName] = useState<string>("");
    const [extNotes, setExtNotes] = useState<string>("");
    const [errorMask, setErrorMask] = useState<number>(0);
    const [success, setSuccess] = useState<boolean>(false);
    const [awaiting, setAwaiting] = useState<boolean>(false);

    const uID = Number(Cookies.get('session'));

    const watchRender = useEffect(() => {
        fetch("https://bg.so-cavalier.com/api/checkSession", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'uID' : uID }),
        credentials: "include",
    }).then((res) => {
        try {
            if (!res.ok) throw 1;
            res.json().then((data) => {
                try {
                    if (data['error'] !== undefined && data['error'] === 'No sess.') router.push('/');
                    if (data['error'] !== undefined) throw data['error'];
                    setDateMask(data['dateMask']);
                    setCanPay(data['canPay']);
                    setSportMask(data['sportMask']);
                    setRName(data['rName']);
                    setExtNotes(data['extNotes']);
                } catch (err) {
                    if (err === 2) router.push('/');
                    console.log(err)
                }
            })
        } catch (err) { setErrorMask(1); }
    } ).catch((err) => {
        setErrorMask(1);
    })}, []);

    function handleDateChange(e: SyntheticEvent<Element, Event>) {
        const target = e.target as HTMLInputElement;
        setDateMask( (dateMask ^ (1 << Number(target.name)) ) );
    }

    function handlePayOption(e: React.ChangeEvent<HTMLInputElement>, val: string) {
        e.preventDefault()
        setCanPay(val === "yes");
    }

    function handleSportChange(e: SyntheticEvent<Element, Event>) {
        const target = e.target as HTMLInputElement;
        setSportMask((sportMask ^ (1 << Number(target.name)) ));
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setRName(e.target.value);
    }

    function handleNotesChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setExtNotes(e.target.value);
    }

    async function sendRequest(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMask(0);
        setSuccess(false);
        let eMask = 0;

        // Set errormask
        if (dateMask === 0) {eMask |= 2; console.log('@dMask -> ' + eMask);}
        if (canPay === null) {eMask |= 4; console.log('@cPay -> ' + eMask);}
        if (sportMask === 0) {eMask |= 8; console.log('@sMask -> ' + eMask);}
        if (rName.length === 0) {eMask |= 16; console.log('@rName -> ' + eMask);}

        console.log('error, ' + eMask)
        setErrorMask(eMask);
        if (eMask > 0) return;
  
        // Load information into a JSON obj
        const loader = {
            'datesAvailable' : dateMask,
            'willingToPay' : canPay,
            'idealSports' : sportMask,
            'realName' : rName,
            'extraNotes' : extNotes
        };

        setAwaiting(true);
        let blocker = true;

        try {
            const res = await fetch('https://bg.so-cavalier.com/api/logResponse', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Cookie" : 'name=session'
                },
                body: JSON.stringify(loader),
                credentials: "include",
            });

            const data = await res.json();
            if (!res.ok) {
                setErrorMask(1);
                setAwaiting(false);
                return;
            }
            console.log(data);
            if (data === 'Invalid session.') router.push('/');
        } catch (err) {
            setAwaiting(false);
            setErrorMask(1);
            return;
        }

        setAwaiting(false);
        setSuccess(blocker);
    }

    const daysAvail : fDate[] = [
        { name: "December 16th", dt: 0 },
        { name: "December 17th", dt: 1 },
        { name: "December 18th", dt: 2 },
        { name: "December 19th", dt: 3 },
        { name: "December 20th", dt: 4 },
        { name: "December 21st", dt: 5 },
        { name: "December 22nd", dt: 6 },
        { name: "December 23rd", dt: 7 },
        { name: "December 27th", dt: 8 },
        { name: "December 28th", dt: 9 },
        { name: "December 29th", dt: 10 },
        { name: "December 30th", dt: 11 },
        { name: "December 31st", dt: 12 },
        { name: "January 1st", dt: 13 },
        { name: "January 2nd", dt: 14 },
        { name: "January 3rd", dt: 15 },
        { name: "January 4th", dt: 16 },
        { name: "none :(", dt: 17 }
    ];

    const sports = [
        "Basketball",
        "Dodgeball",
        "Soccer",
        "Volleyball",
        "ChessBoxing"
    ];

    return (
    <Box 
    component="form"
    onSubmit={sendRequest}
    sx={{
        textAlign: 'center'
    }}>
        <Question
        errorFlag={(errorMask & 2) > 1}
        question="What days can you go to the BIG game?" 
        answerComp={
            <FormGroup row sx={{ justifyContent: 'center', maxWidth: '500px' }}>
                { daysAvail.map((value, index) => <FormControlLabel key={index} control={<Checkbox checked={(dateMask & (1 << index)) > 0} />} onChange={handleDateChange} label={value.name} name={value.dt.toString()}/> ) }
            </FormGroup>} 
        />

        <Question
        errorFlag={(errorMask & 4) > 1}
        question="Are you able to pitch in $10?"
        description="This is for us to be able to rent a solid gym roughly equidistant to everyone instead of by Fidel's house, so please say yes, as it just helps us organize this."
        answerComp={
            <FormControl>
                <RadioGroup
                    row
                    name="radio-buttons-group"
                    onChange={handlePayOption}
                    value={canPay === null ? null : (canPay ? "yes" : "no")}
                    sx={{ mt: "15px"}}
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
        }
        />

        <Question
        errorFlag={(errorMask & 8) > 1}
        question="What games would you like to play?"
        description="We're most likely going to this in a basketball court, so we're aiming for sports that can be played on one. We're only going to do one or two, so try to pick two max."
        answerComp={
            <FormGroup row>
                { sports.map((value, index) => <FormControlLabel key={index} control={<Checkbox checked={(sportMask & (1 << index)) > 0}/>} onChange={handleSportChange} label={value} name={index.toString()}/> ) }
            </FormGroup>
        }
        />

        <Question
        errorFlag={(errorMask & 16) > 1}
        question="Please enter your name:"
        answerComp={    
            <TextField
            label="Name"
            variant="outlined"
            name="realName"
            value={rName}
            onChange={handleNameChange}
            sx={{
                mt: '15px'
            }}
            />
        }
        />

        <Question
        question="Any additional notes?"
        answerComp={
            <TextField
            label="Notes"
            variant="outlined"
            name="notes"
            value={extNotes}
            onChange={handleNotesChange}
            sx={{
                mt: '15px',
                width: "1000px"
            }}
            />
        }
        />

        {(errorMask === 1) ? (
            <Typography
            sx={{
                color: 'red',
                backgroundColor: 'white',
                borderRadius: '5px',
                maxWidth: '275px',
                padding: '10px',
                margin: '10px',
                justifySelf: 'center'
            }}>
                Failed to connect to server; contact us if it happens again!
            </Typography>
        ) : null}
        {success ? (
            <Typography
            sx={{
                backgroundColor: 'white',
                borderRadius: '5px',
                maxWidth: '325px',
                padding: '10px',
                margin: '10px',
                justifySelf: 'center'
            }}>
                Successfully uploaded form. Thank you! You can still update the form if you'd like.
            </Typography>
        ) : null}

        {awaiting ? (<CircularProgress sx={{ marginY: '50px', width: '20px', height: '20px' }}/>) : 
        (<Button
        variant="contained"
        type="submit"
        sx={{
            marginY: '50px',
            backgroundColor: 'rgb(45, 45, 45)',
            boxShadow: "0px 0px 5px gray inset",
            transition: "all 0.3s ease",
            "&:hover": {
                boxShadow: "0px 0px 10px gray inset",
            }
        }}
        >
            SUBMIT
        </Button>) }

        
    </Box>
    );
}

type QAProps = {
    question: string,
    description?: string,
    answerComp : React.ReactNode,
    errorFlag? : boolean
};


function Question(props: QAProps) {
    return (
        <Box
        mt={10}
        sx={{
            borderRadius: "30px",
            width: "fit-content",
            height: "fit-content",
            padding: "30px",
            boxShadow: `0px 0px 10px 10px ${props.errorFlag ? '#ff0000B0' : 'black' }`,
            justifySelf: 'center',
            justifyItems: 'center',
            backgroundColor: 'white'
        }}>
            <Typography variant="h4">{props.question}</Typography>
            {props.description && <Typography>{props.description}</Typography>}
            {props.answerComp}
        </Box>
    );
}
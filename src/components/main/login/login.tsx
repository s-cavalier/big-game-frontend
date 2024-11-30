'use client'
import React, { useState, useEffect } from "react";
import { TextField, IconButton, Box, Typography, Divider, CircularProgress } from "@mui/material";
import { ArrowCircleRight } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'

// Define the shape of the login form data
interface LoginFormData {
  username: string;
  pnum: string;
};

enum ErrorType {
    BADCONNECT,
    EMPTYFIELDS,
    EMPTYUSER,
    EMPTYPNUM,
    ALREADYEXISTS,
    UNCLEAR
};

  export default function LoginForm() {

  const router = useRouter();
  const watchCookies = useEffect(() => {
    const checkSession = Cookies.get('session');
    if (checkSession !== undefined) router.push('/forum');
  }, []);

  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    pnum: "",
  });

  const [error, setError] = useState<ErrorType | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Update the corresponding state field
  };

  async function sendRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const { username, pnum } = formData;

    if (!username && !pnum) {
        setError(ErrorType.EMPTYFIELDS);
        return;
    }
    if (!pnum) {
        setError(ErrorType.EMPTYPNUM);
        return;
    }
    if (!username) {
        setError(ErrorType.EMPTYUSER);
        return;
    }

    setWaiting(true);

    try {

      const res = await fetch("http://localhost:8080/uauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) { 
        setError(ErrorType.BADCONNECT);
        setWaiting(false);
        return;
      }
      console.log(data);
      if (data.error !== undefined && data.code === 4) {
        setError(ErrorType.ALREADYEXISTS);
        setWaiting(false);
        return;
      }

    } catch (err) {
      setError(ErrorType.BADCONNECT);
      setWaiting(false);
      return;
    }

    setWaiting(false);
    router.push('forum');

  };

  return (
      <Box
        component="form"
        onSubmit={sendRequest}
        sx={{
          boxShadow: 'none',
          display: 'grid'
        }}  
      >
        <Typography variant="h4" justifySelf={'center'}>
          Login
        </Typography>
        <Typography mx={2} mt={2} textAlign={'center'}>
          We just need a phone number and a username to uniquely identify you. Please let us know if there is some error we need to resolve (like you forgot your username or something).
        </Typography>
        <Divider 
          sx={{my:'15px'}}
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          sx = {{
            "& fieldset" : { 
              border: error === ErrorType.EMPTYUSER || error === ErrorType.EMPTYFIELDS ? '1px solid red' : 'none',
            }
          }}
        />
        <TextField
          label="Phone Number"
          margin="normal"
          name="pnum"
          fullWidth
          value={formData.pnum}
          onChange={handleChange}
          sx = {{
            "& fieldset" : { 
              border: error === ErrorType.EMPTYPNUM || error === ErrorType.EMPTYFIELDS ? '1px solid red' : 'none',
            }
          }}
        />

        <Box sx={{ justifySelf: 'center', justifyContent: 'center', alignContent: 'center', display: 'flex' }} >
          {error === ErrorType.BADCONNECT ? <Typography sx={{ mr: '20px', color: 'red', alignSelf: 'center' }}>Failed to connect to server, contact us!!</Typography> : null }
          {error === ErrorType.ALREADYEXISTS ? <Typography maxWidth='sm' sx={{ mr: '25px', color: 'red', alignSelf: 'center', textAlign: 'center' }}>We found a user with either the same phone number or the same username, but not both. Please match them if you can. Contact us if you can't!</Typography> : null }

          {waiting ? 
          (<CircularProgress sx={{ width: '20px', height: '20px' }}/>) : 
          (<IconButton type="submit">
            <ArrowCircleRight/>
          </IconButton>) }
        </Box>

      </Box>
  );
};

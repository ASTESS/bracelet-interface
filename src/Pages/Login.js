import {useEffect, useState} from "react";
import {Box, Button, Card, TextField, Typography} from "@mui/material";
import SignUp from "../Components/SignUp";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showSingUp, setShowSingUp] = useState(false);
    const navigate = useNavigate();

    function toggleSingUp(){
        setShowSingUp(!showSingUp);
    }

    useEffect(() => {
            if(localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== ""){
                navigate('/overview');
            }
    }, [localStorage.getItem('token')]);




    function login(){


        axios.post("https://brace-guardian.herokuapp.com/authenticate", {
            email: email, 
            password: password            
        }).then(res => {
            console.log(res.data.token)
            localStorage.setItem("token", res.data.token);
            window.dispatchEvent( new Event('storage') );
        })



        //localStorage.setItem('token', 'token'); //temp
        window.dispatchEvent( new Event('storage') );
    }


    return (
        <div>
            <Card style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: "30%"}}>
                <Box sx={{display: "flex", flexDirection: "column"}} style={{paddingTop: 10}}>
                    <TextField
                        style={{width: "90%", alignSelf: "center"}}
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        type={'password'}
                        style={{width: "90%", alignSelf: "center", marginTop: 20}}
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                    
                    {/*<Typography onClick={() => toggleSingUp()} style={{paddingLeft: 10, flex: 1, textDecoration: "underline"}}>
                        Forgot your password?
                    </Typography>*/}
                    <Button style={{margin: 20, flex: 1}} variant={"contained"} onClick={login}>Login</Button>
                </Box>
            </Card>

            {showSingUp ? <SignUp toggle={() => toggleSingUp()}/> : null}
        </div>


    );
}
import React from 'react';
import {Alert, Backdrop, Box, Button, Card, IconButton, Snackbar, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";

export default function SignUp(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [passwordDontMatch, setPasswordDontMatch] = React.useState(false);

    const navigate = useNavigate();

    function signUp(){
        if(password === confirmPassword){
            fetch('http://localhost:3333/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: new URLSearchParams({
                    "email": email,
                    "password": password,
                    "firstName": firstName,
                    //"phone": phone
                }).toString()
            }).then(r => r.json()).then(data => {
                console.log(data);
                localStorage.setItem("token", data.token);
                navigate('/overview');
            })



            localStorage.setItem('token', "token"); //temp
        }else{
            setPasswordDontMatch(true);
        }
    }

    return(
        <Backdrop open>
            <Card style={{width: "50%"}}>

                <IconButton style={{float: "right"}} onClick={() => props.toggle()}>
                    <CloseIcon/>
                </IconButton>

                <h1>Sign Up</h1>
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
                    <TextField
                        type={'password'}
                        style={{width: "90%", alignSelf: "center", marginTop: 20}}
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <TextField
                        style={{width: "90%", alignSelf: "center", marginTop: 20}}
                        label="First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <TextField
                        style={{width: "90%", alignSelf: "center", marginTop: 20}}
                        label="Phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </Box>
                <Button onClick={() => {signUp(); props.toggle();}} style={{margin: 10}} variant={"contained"}>Sign up</Button>
            </Card>
            <Snackbar open={passwordDontMatch} autoHideDuration={10000} onClose={() => setPasswordDontMatch(false)}>
                <Alert severity="error">Password's does not match</Alert>
            </Snackbar>

        </Backdrop>
    )
}
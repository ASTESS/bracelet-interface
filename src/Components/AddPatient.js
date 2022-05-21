import React, { useContext } from 'react';
import {Alert, Backdrop, Box, Button, Card, IconButton, Snackbar, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";
import Context from '../Contexts/Context';
import axios from 'axios';


export default function AddPatient(props) {

    
    
    const [firstName, setFirstName] = React.useState('');

    const navigate = useNavigate();

    function signUp(){
        
        axios.post('https://brace-guardian.herokuapp.com/add-profile', {username: firstName}, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            } 
        })



            //localStorage.setItem('token', "token"); //temp
        
    }

    return(
        <Backdrop open>
            <Card style={{width: "50%"}}>

                <IconButton style={{float: "right"}} onClick={() => {props.toggle()}}>
                    <CloseIcon/>
                </IconButton>

                <h1>Add Patient</h1>
                <Box sx={{display: "flex", flexDirection: "column"}} style={{paddingTop: 10}}>
                    <TextField
                        style={{width: "90%", alignSelf: "center", marginBottom: 20}}
                        label="Patient Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Box>  
                <Button onClick={() => {signUp(); props.toggle();}} style={{margin: 10}} variant={"contained"}>Add</Button>
            </Card>
            

        </Backdrop>
    )
}
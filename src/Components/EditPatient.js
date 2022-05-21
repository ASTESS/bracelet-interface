import React, { useContext } from 'react';
import {Alert, Backdrop, Box, Button, Card, IconButton, Snackbar, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";
import Context from '../Contexts/Context';
import axios from 'axios';

export default function EditPatient(props) {

    
    const {profileId, profileName} = useContext(Context)
    const [firstName, setFirstName] = React.useState(profileName);

    const navigate = useNavigate();

    function signUp(){
        
            axios.put('https://brace-guardian.herokuapp.com/profiles/' + profileId, {username: firstName}, {
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

                <h1>Edit Patient</h1>
                <Box sx={{display: "flex", flexDirection: "column"}} style={{paddingTop: 10}}>
                    <TextField
                        style={{width: "90%", alignSelf: "center", marginBottom: 20}}
                        label="Patient Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Box>  
                <Button onClick={() => {signUp(); props.toggle();}} style={{margin: 10}} variant={"contained"}>Edit</Button>
            </Card>
            

        </Backdrop>
    )
}
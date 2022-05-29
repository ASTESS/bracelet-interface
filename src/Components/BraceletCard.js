import {Button, Card, Autocomplete, TextField, Box} from "@mui/material";
import {useState, useEffect} from "react";
import axios from 'axios'

export default function BraceletCard(props){
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState(props.bracelet.name);
    const [macAddress, setMacAddress] = useState(props.bracelet.macAddress);
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        axios.get("https://brace-guardian.herokuapp.com/get-profiles", {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
                console.log(res.data)
                setProfiles(res.data);
            })
            .catch(err => console.log(err));
        
        
    }, []);

    if(open){
        return(
            <Card style={{width: "30%", margin: 10, alignContent: "center", height: "20%"}}>
                <Autocomplete
                    id="search"
                    value={username}
                    options={profiles.map(option => option.name)}
                    onChange={(event, newValue) => {
                        if( newValue !== null ){
                            setUsername(newValue);
                        }else {
                            setUsername("");
                        }
                    }}
                    renderInput={params => (
                        <TextField
                            style={{width: "90%",marginTop: 20, alignSelf: "center"}}
                            {...params}
                            label="Username"
                            variant="outlined"
                        />
                    )}
                />
                <TextField
                    style={{width: "90%",marginTop: 20, alignSelf: "center"}}
                    label="Mac Address"
                    value={macAddress}
                    onChange={e => setMacAddress(e.target.value)}
                />
                <Box style={{display: "flex", flexDirection: "row",alignItems: "center", justifyContent: "center", padding: 10}}>
                    <Button variant={"contained"} style={{flex:1, marginLeft: 5}} onClick={() => props.deleteBracelet(props.bracelet.id)}>Delete</Button>
                    <Button
                        variant={"contained"}
                        style={{flex:1, marginLeft: 5}}
                        onClick={() => {
                            console.log(props.bracelet)
                            props.updateBracelet(props.bracelet, username, macAddress);
                            setOpen(false);
                        }}>
                        Update
                    </Button>
                </Box>
                <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
            </Card>
        )

    }else {
        return(
            <Card style={{width: "30%", margin: 10, height: "20%"}} onClick={() => setOpen(true)}>
                <h1>{props.bracelet.name}</h1>
                <p>{props.bracelet.macAddress}</p>
            </Card>
        )
    }

}
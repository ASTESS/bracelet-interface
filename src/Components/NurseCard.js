import {Box, Button, Card, TextField} from "@mui/material";
import {useState} from "react";

export default function NurseCard(props) {
    const [open, setOpen] = useState(false);

    const [username, setUsername] = useState(props.nurse.username);
    const [number, setNumber] = useState(props.nurse.number);

    if(open){
        return (
            <Card style={{width: "30%", margin: 10}}>
                <TextField
                    style={{width: "90%",marginTop: 20, alignSelf: "center"}}
                    label="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    style={{width: "90%",marginTop: 20, alignSelf: "center"}}
                    label="Number"
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                />
                <Box style={{display: "flex", flexDirection: "row",alignItems: "center", justifyContent: "center", padding: 10}}>
                    <Button
                        variant={"contained"}
                        style={{flex:1, marginRight: 5}}
                        onClick={() => {
                            props.deleteNurse(props.nurse);
                            setOpen(false);
                        }}>
                        Delete
                    </Button>
                    <Button
                        variant={"contained"}
                        style={{flex:1, marginLeft: 5}}
                        onClick={() => {
                            props.updateNurse(props.nurse, username, number);
                            setOpen(false);
                        }}>
                        Update
                    </Button>
                </Box>

                <Button
                    variant={"contained"}
                style={{width: "90%", alignSelf: "center", marginBottom: 5}}
                onClick={() => {
                    setOpen(false);
                }}
            >
                Close
            </Button>
            </Card>
        );
    }else{
        return (
            <Card style={{width: "30%", margin: 10}} onClick={() => {
                setOpen(true);
                setUsername(props.nurse.username);
                setNumber(props.nurse.number);
            }}>
                <h1>{props.nurse.username}</h1>
                <p>{props.nurse.number}</p>
            </Card>
        );
    }

}
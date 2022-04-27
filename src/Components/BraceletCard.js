import {Button, Card} from "@mui/material";
import {useState} from "react";

export default function BraceletCard(props){
    const [open, setOpen] = useState(false);

    if(open){
        return(
            <Card style={{width: "30%", margin: 10, alignContent: "center", height: "20%"}}>
                <Button variant="contained"  onClick={() => props.deleteBracelet(props.bracelet.id)}>Delete</Button>
                <Button variant="contained" onClick={() => setOpen(false)}>Close</Button>
            </Card>
        )

    }else {
        return(
            <Card style={{width: "30%", margin: 10, height: "20%"}} onClick={() => setOpen(true)}>
                <h1>{props.bracelet.username}</h1>
                <p>{props.bracelet.macAddress}</p>
            </Card>
        )
    }

}
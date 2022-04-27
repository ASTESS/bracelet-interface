import BraceletCard from "../Components/BraceletCard";
import {useEffect, useState} from "react";
import {Autocomplete, Button, Card, Grid, TextField} from "@mui/material";

export default function Bracelets(){
    const [bracelets, setBracelets] = useState([
        {id: 1,username: "name1", macAddress: "00:00:00:00:00:01"},
        {id: 2,username: "name2", macAddress: "00:00:00:00:00:02"},
        {id: 3,username: "name3", macAddress: "00:00:00:00:00:03"},
        {id: 4,username: "name4", macAddress: "00:00:00:00:00:04"},
        {id: 5,username: "name5", macAddress: "00:00:00:00:00:05"},
        {id: 6,username: "name6", macAddress: "00:00:00:00:00:06"},
        {id: 7,username: "name7", macAddress: "00:00:00:00:00:07"},
    ]);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    const [username, setUsername] = useState("");
    const [macAddress, setMacAddress] = useState("");

    useEffect(() => {
        fetch("http://localhost:3333/get-bracelets", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                setBracelets(data);
            })
            .catch(err => console.log(err));
    }, []);

    function addBracelet(bracelet){
        setBracelets([...bracelets, bracelet]);

        fetch("http://localhost:8080/add-bracelet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: new URLSearchParams({
                "username": bracelet.username,
                "macAddress": bracelet.macAddress
            }).toString(),
        })
    }

    function deleteBracelet(id){
        setBracelets(bracelets.filter(n => n.id !== id));
        fetch( `http://localhost:3333/bracelets/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        });
    }

    return(
        <div style={{padding: 20, height: "100%", width: "100%"}}>
            <div style={{width: "30%", top: "5%", left: 10}}>
                <Autocomplete
                    id="search"
                    value={search}
                    options={bracelets.map(option => option.username)}
                    style={{ width: 300 }}
                    onChange={(event, newValue) => {
                        if( newValue !== null ){
                            setSearch(newValue);
                        }else {
                            setSearch("");
                        }
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Search"
                            variant="outlined"
                        />
                    )}
                />
            </div>
            <Grid style={{paddingTop: "5%", display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',}} container spacing={3}>
                {bracelets.filter(bracelet => bracelet.username.toLowerCase().includes(search.toLowerCase())).map(bracelet => (
                    <BraceletCard
                        key={bracelet.id}
                        bracelet={bracelet}
                        deleteBracelet={deleteBracelet}
                    />
                ))}
            </Grid>

            <Card style={{width: "30%", margin: 20}}>
                <h1>Add Bracelet</h1>
                <TextField style={{margin: 10}} label="Username" variant="outlined" value={username} onChange={(event) => setUsername(event.target.value)}/>
                <TextField style={{margin: 10}} label="Mac Address" variant="outlined" value={macAddress} onChange={(event) => setMacAddress(event.target.value)}/>
                <Button style={{margin: 10}} variant="contained" color="primary" onClick={() => {
                    addBracelet({id: (Object.keys(bracelets).length + 1), username: username, macAddress: macAddress});
                    setUsername("");
                    setMacAddress("");
                }}>Add Nurse</Button>
            </Card>
        </div>

    )
}
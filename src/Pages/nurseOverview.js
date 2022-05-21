import {useEffect, useState, useContext} from "react";
import NurseCard from "../Components/NurseCard";
import {Autocomplete, Box, Button, Card, Grid, TextField} from "@mui/material";
import Context from "../Contexts/Context";
import SignUp from "../Components/SignUp";
export default function NurseOverview(){
    const [nurses, setNurses] = useState([
        {id: 1,username: "name", number: "+123456789"},
        {id: 2,username: "name", number: "+123456789"},
        {id: 3,username: "name", number: "+123456789"},
        {id: 4,username: "name", number: "+123456789"},
        {id: 5,username: "name", number: "+123456789"},
        {id: 6,username: "name", number: "+123456789"},
        {id: 7,username: "name", number: "+123456789"},
    ]);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const {showSingUp, showEditProfile, toggleSingUp, toggleEditProfile} = useContext(Context)
    const [number, setNumber] = useState("");
    const [username, setUsername] = useState("");

    function addNurse(nurse){
        if (nurse.username !== "" && nurse.number !== "") {
            setNurses([...nurses, nurse]);

            fetch("http://localhost:8080/nurse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: new URLSearchParams({
                    "username": nurse.username,
                    "number": nurse.number
                }).toString(),
            })
        }
    }

    function deleteNurse(nurse){
        setNurses(nurses.filter(n => n.id !== nurse.id));
        fetch( `http://localhost:3333/nurses/${nurse.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        });
        console.log(nurse);
    }

    function updateNurse(nurse, newName, newNumber){
        setNurses(nurses.map(n => n.id === nurse.id ? {...n, username: newName, number: newNumber} : n));
        fetch( `http://localhost:3333/nurses/${nurse.id}`, {
            method: "PUT",
            body: new URLSearchParams({
                "username": nurse.username,
                "number": nurse.number
            }).toString(),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        });
    }

    useEffect(() => {
        fetch("http://localhost:3333/get-nurses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                setNurses(data);
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <div>
        <div style={{padding: 20, height: "100%", width: "100%"}}>

            <div style={{width: "30%", top: "5%", left: 10}}>
                <Autocomplete
                    id="search"
                    value={search}
                    options={nurses.map(option => option.username)}
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

            <Grid style={{paddingTop: "5%", display: 'flex', alignItems: 'center', justifyContent: 'center'}} container spacing={3}>
                {nurses.map(nurse => {
                    if(search === "" || nurse.username.toLowerCase().includes(search.toLowerCase())){
                        return(
                                <NurseCard nurse={nurse} updateNurse={updateNurse} deleteNurse={deleteNurse}/>
                        )
                    }
                })}

            </Grid>

            <Card style={{width: "30%", margin: 20}}>
                <h1>Add Nurse</h1>
                <TextField style={{margin: 10}} label="Username" variant="outlined" value={username} onChange={(event) => setUsername(event.target.value)}/>
                <TextField style={{margin: 10}} label="Number" variant="outlined" value={number} onChange={(event) => setNumber(event.target.value)}/>
                <Button style={{margin: 10}} variant="contained" color="primary" onClick={() => {
                    addNurse({id: (Object.keys(nurses).length + 1), username: username, number: number});
                    setUsername("");
                    setNumber("");
                }}>Add Nurse</Button>
            </Card>
        </div>
        <div>
            {showSingUp ? <SignUp toggle={() => toggleSingUp()}/> : null}
        </div>
        </div>
    );
}


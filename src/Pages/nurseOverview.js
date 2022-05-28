import {useEffect, useState, useContext} from "react";
import NurseCard from "../Components/NurseCard";
import {Autocomplete, Box, Button, Card, Grid, Select, TextField, Typography} from "@mui/material";
import Context from "../Contexts/Context";
import SignUp from "../Components/SignUp";
import axios from "axios";
export default function NurseOverview(){
    const [nurses, setNurses] = useState([
        {nurseId: 1, nurseName: "name", phone: "+123456789", division: "Front"},
        {nurseId: 2, nurseName: "name", phone: "+123456789", division: "Front"},
        {nurseId: 3, nurseName: "name", phone: "+123456789", division: "Front"},
        {nurseId: 4, nurseName: "name", phone: "+123456789", division: "End"},
        {nurseId: 5, nurseName: "name", phone: "+123456789", division: "End"},
        {nurseId: 6, nurseName: "name", phone: "+123456789", division: "End"},
        {nurseId: 7, nurseName: "name", phone: "+123456789", division: "End"},
    ]);

    const options = [
        { value: 'front', label: 'Front' },
        { value: 'end', label: 'Back' },
      ]

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const {showSingUp, showEditProfile, toggleSingUp, toggleEditProfile} = useContext(Context)
    const [number, setNumber] = useState("");
    const [username, setUsername] = useState("");
    const [division, setDivision] = useState("");

    function addNurse(nurse){
        if (nurse.nurseName !== "" && nurse.number !== "" && nurse.division != "") {
            setNurses([...nurses, nurse]);
            console.log(nurse)
            axios.post("http://brace-guardian.herokuapp.com/add-nurse", {
                username: nurse.nurseName,
                phone: nurse.phone,
                division: (nurse.division == "Front") ? "front" : "end"
            },{
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token")
                },
                
            })
        }
    }

    function deleteNurse(nurse){
        setNurses(nurses.filter(n => n.nurseId !== nurse.nurseId));
        axios.delete( `http://brace-guardian.herokuapp.com/nurses/${nurse.nurseId}`, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            },
        });
        console.log(nurse);
    }

    function updateNurse(nurse, newName, newNumber, newDivision){
        setNurses(nurses.map(n => n.nurseId === nurse.nurseId ? {...n, nurseName: newName, number: newNumber, division: newDivision} : n));
        console.log(nurse.division)
        axios.put( `http://brace-guardian.herokuapp.com/nurses/${nurse.nurseId}`, {
            username: nurse.nurseName,
            phone: nurse.phone,
            division: (nurse.division == "Front") ? "front" : "end"
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            },
        });
    }

    useEffect(() => {
        axios.get("http://brace-guardian.herokuapp.com/get-nurses", {
            headers: {               
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
                setNurses(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <div>
        <div style={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
        
            <div style={{width: "100%", marginTop: "2rem", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <Typography variant="h4" style={{margin: "2rem 0"}}>Nurses</Typography>
                <Autocomplete
                    id="search"
                    value={search}
                    options={nurses.map(option => option.nurseName)}
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

            <Grid style={{padding: "2rem", display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: "wrap"}} container spacing={3}>
                {nurses.map(nurse => {
                    if(search === "" || nurse.nurseName.toLowerCase().includes(search.toLowerCase())){
                        return(
                            <NurseCard nurse={nurse} updateNurse={updateNurse} deleteNurse={deleteNurse} style={{margin: "1rem 2rem"}}/>
                        )
                    }
                })}

            </Grid>

            <Card style={{width: "90%", margin: "auto", alignSelf: "center"}}>
                <h1>Add Nurse</h1>
                <TextField style={{width: "90%",marginTop: 10, alignSelf: "center"}} label="Nurse Name" variant="outlined" value={username} onChange={(event) => setUsername(event.target.value)}/>
                <TextField style={{width: "90%",marginTop: 10, alignSelf: "center"}} label="Phone Number" variant="outlined" value={number} onChange={(event) => setNumber(event.target.value)}/>
                <Autocomplete
                    id="search"
                    value={division}
                    options={options}
                    onChange={(event, newValue) => {
                        if( newValue !== null ){
                            setDivision(newValue.label);
                        }else {
                            setDivision("");
                        }
                    }}
                    renderInput={params => (
                        <TextField
                            style={{width: "90%",marginTop: 10, alignSelf: "center"}}
                            {...params}
                            label="Division"
                            variant="outlined"
                        />
                    )}
                />
                <Button style={{margin: 10}} variant="contained" color="primary" onClick={() => {
                    addNurse({nurseId: (Object.keys(nurses).length + 1), nurseName: username, phone: number, division: division});
                    setUsername("");
                    setNumber("");
                    setDivision("")
                }}>Add Nurse</Button>
            </Card>
        </div>
        <div>
            {showSingUp ? <SignUp toggle={() => toggleSingUp()}/> : null}
        </div>
        </div>
    );
}


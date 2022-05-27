import BraceletCard from "../Components/BraceletCard";
import {useEffect, useState} from "react";
import {Autocomplete, Button, Card, Grid, TextField} from "@mui/material";
import axios from "axios";

export default function Bracelets(){
    const [bracelets, setBracelets] = useState([]);
    const [profiles, setProfiles] = useState([]);
    
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    const [username, setUsername] = useState("");
    const [macAddress, setMacAddress] = useState("");

    useEffect(() => {
        axios.get("https://brace-guardian.herokuapp.com/bracelets", {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
                console.log(res.data)
                setBracelets(res.data);
            })
            .catch(err => console.log(err));
        
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

    async function addBracelet(bracelet, name, macAddress){
        if (name !== "" && macAddress !== "") {
            setBracelets([...bracelets, bracelet]);

            await axios.post("https://brace-guardian.herokuapp.com/add-bracelet", {
                username: bracelet.name,
                macAddress: bracelet.macAddress
            }, {                
                headers: {                   
                    authorization: "Bearer " + localStorage.getItem("token")
                }
            })
        }
    }

    async function deleteBracelet(id){
        setBracelets(bracelets.filter(n => n.id !== id));
        await axios.delete( `https://brace-guardian.herokuapp.com/bracelets/${id}`, {
            headers: {               
                authorization: "Bearer " + localStorage.getItem("token")
            },
        });
    }

    async function updateBracelet(brace, newName, newMacAddress){
        setBracelets(bracelets.map(n => n.id === brace.id ? {...n, name: newName, macAddress: newMacAddress} : n));
        console.log(brace.id)
        if(newName != "" && newMacAddress != ""){
            await axios.put( `http://brace-guardian.herokuapp.com/bracelets/${brace.id}`, {
            username: newName,
            macAddress: newMacAddress,
            
            }, {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token")
                },
            }).then((res) => console.log(res.data)).catch(err => console.log(err));
        }
        
    }


    return(
        <div style={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <div style={{width: "100%", marginTop: "2rem", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
                <Autocomplete
                    id="search"
                    value={search}
                    options={bracelets.map(option => option.name)}
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
                
                {bracelets.map(bracelet => {
                    
                    if(search === "" || bracelet.name.toLowerCase().includes(search.toLowerCase())){
                        return(
                            <BraceletCard
                                key={bracelet.id}
                                bracelet={bracelet}
                                deleteBracelet={deleteBracelet}
                                updateBracelet={updateBracelet}
                            />
                        )
                    }
                })}
            </Grid>

            <Card style={{width: "90%", margin: "auto", alignSelf: "center"}}>
                <h1>Add Bracelet</h1>
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
                <TextField style={{width: "90%",marginTop: 10, alignSelf: "center"}} label="Mac Address" variant="outlined" value={macAddress} onChange={(event) => setMacAddress(event.target.value)}/>
                <Button style={{margin: 10}} variant="contained" color="primary" onClick={() => {
                    addBracelet({id: (Object.keys(bracelets).length + 1), name: username, macAddress: macAddress});
                    setUsername("");
                    setMacAddress("");
                }}>Add Bracelet</Button>
            </Card>
        </div>

    )
}
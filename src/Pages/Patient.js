
import {
    Autocomplete, Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField, Typography
} from "@mui/material";

import {useParams} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import {Line, Tooltip, XAxis, LineChart, YAxis} from "recharts";
import Context from "../Contexts/Context";
import SignUp from "../Components/SignUp";
import axios from "axios";

export default function Patient() {
    const { id } = useParams();
    const [patient, setPatient] = useState([]);
    const [date, setDate] = useState([]);
    const [hour, setHour] = useState([]);
    const [distance, setDistance] = useState([]);
    const [profileName, setProfileName] = useState("")
    const {showSingUp, toggleSingUp} = useContext(Context)

    const renderCustomXAxis = (props) => {
        return new Date(props).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    useEffect(() => {
        axios.get(`https://brace-guardian.herokuapp.com/patients/${id}`, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            console.log(res.data)
            setPatient(res.data);
        })
        
        axios.get("https://brace-guardian.herokuapp.com/get-profiles", {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res=> {
            console.log(res.data)
            res.data.forEach(e => {
                if(e.id == id){
                    setProfileName(e.name)
                }
            });
            
        }).catch(error => {
            console.log(error);
        });
       
    }, []);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>
            <Typography variant="h4" style={{margin: "2rem 0"}}>{profileName}</Typography>

            

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                    <Button>Date</Button> 
                                </Box>
                            </TableCell>   
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                    <Button>Hour</Button> 
                                </Box>
                            </TableCell>    
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                    <Button>Distance</Button> 
                                </Box>
                            </TableCell>                      
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patient?.map(row => (
                            <TableRow key={row.dataId} >
                                <TableCell >{row.created_at.split(' ')[0]}</TableCell> 
                                <TableCell>{row.created_at.split(' ')[1]}</TableCell> 
                                <TableCell>{row.distance}m</TableCell>                              
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {showSingUp ? <SignUp toggle={() => toggleSingUp()}/> : null}
        </div>
  );
}
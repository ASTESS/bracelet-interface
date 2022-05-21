
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
import axios from "axios";

export default function Patient() {
    const { id } = useParams();
    const [patient, setPatient] = useState([]);
    const {profileName} = useContext(Context)

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
        
       
    }, []);

  return (
    <div>
            <Typography variant="h4" style={{margin: "2rem 0"}}>{profileName}</Typography>

            

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button>Date | Hour</Button>
                                    
                                </Box>
                            </TableCell>                           
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        {patient?.map(row => (
                            <TableRow key={row.dataId}>
                                <TableCell>{row.created_at}</TableCell>                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </div>
  );
}
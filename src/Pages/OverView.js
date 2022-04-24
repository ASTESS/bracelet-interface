import {useEffect, useState} from "react";
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

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function OverView(){
    const [data, setData] = useState([{name: "name", totalFalls: 25, fallsToday: 5, fallsYesterday: 2, batteryValue: 90}, {name: "test", totalFalls: 20, fallsToday: 1, fallsYesterday: 13, batteryValue: 75}, {name: "bob", totalFalls: 10, fallsToday: 5, fallsYesterday: 2, batteryValue: 95}]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("Name");

    useEffect(() => {

        fetch("http://localhost:3333/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Something went wrong ...");
            }
        }).then(data => {
            setData(data);
        }).catch(error => {
            console.log(error);
        });


    }, []);

    function sortBy(sortBy){
        if(sort.endsWith("Asc")){
            setSort(sortBy + " Desc");
        }else if(sort.endsWith("Desc")){
            setSort(sortBy + " Asc");
        }else{
            setSort(sortBy + " Asc");
        }
    }
    return(
        <div>
            <Typography variant="h4">Overview</Typography>

            <div className="search-box" style={{float: "right", padding: 10}}>
                <Autocomplete
                    id="search"
                    value={search}
                    options={data.map(option => option.name)}
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

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button onClick={() => sortBy("Name")}>Name</Button>
                                    {(sort.includes("Name") && sort.endsWith("Asc")) ? <ArrowDropUpIcon/> : null}
                                    {(sort.includes("Name") && sort.endsWith("Desc")) ? <ArrowDropDownIcon/> : null}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button onClick={() => sortBy("Total Falls")}>Total Falls</Button>
                                    {(sort.includes("Total Falls") && sort.endsWith("Asc")) ? <ArrowDropUpIcon/> : null}
                                    {(sort.includes("Total Falls") && sort.endsWith("Desc")) ? <ArrowDropDownIcon/> : null}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button onClick={() => sortBy("Falls Today")}>Falls Today</Button>
                                    {(sort.includes("Falls Today") && sort.endsWith("Asc")) ? <ArrowDropUpIcon/> : null}
                                    {(sort.includes("Falls Today") && sort.endsWith("Desc")) ? <ArrowDropDownIcon/> : null}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button onClick={() => sortBy("Falls Yesterday")}>Falls Yesterday</Button>
                                    {(sort.includes("Falls Yesterday") && sort.endsWith("Asc")) ? <ArrowDropUpIcon/> : null}
                                    {(sort.includes("Falls Yesterday") && sort.endsWith("Desc")) ? <ArrowDropDownIcon/> : null}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button onClick={() => sortBy("Battery Value")}>Battery Value</Button>
                                    {(sort.includes("Battery Value") && sort.endsWith("Asc")) ? <ArrowDropUpIcon/> : null}
                                    {(sort.includes("Battery Value") && sort.endsWith("Desc")) ? <ArrowDropDownIcon/> : null}
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.filter(row => row.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
                            if(sort.includes("Name")){
                                if(sort.endsWith("Desc")){
                                    return a.name.localeCompare(b.name);
                                }else if(sort.endsWith("Asc")){
                                    return b.name.localeCompare(a.name);
                                }
                            }else if(sort.includes("Total Falls")){
                                if(sort.endsWith("Desc")){
                                    return b.totalFalls - a.totalFalls;
                                }else if(sort.endsWith("Asc")){
                                    return a.totalFalls - b.totalFalls;
                                }
                            }else if(sort.includes("Falls Today")){
                                if(sort.endsWith("Desc")){
                                    return b.fallsToday - a.fallsToday;
                                }else if(sort.endsWith("Asc")){
                                    return a.fallsToday - b.fallsToday;
                                }
                            }else if(sort.includes("Falls Yesterday")){
                                if(sort.endsWith("Desc")){
                                    return b.fallsYesterday - a.fallsYesterday;
                                }else if(sort.endsWith("Asc")){
                                    return a.fallsYesterday - b.fallsYesterday;
                                }
                            }else if(sort.includes("Battery Value")){
                                if(sort.endsWith("Desc")){
                                    return b.batteryValue - a.batteryValue;
                                }else if(sort.endsWith("Asc")){
                                    return a.batteryValue - b.batteryValue;
                                }
                            }
                        }).map(row => (
                            <TableRow key={row.name}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.totalFalls}</TableCell>
                                <TableCell>{row.fallsToday}</TableCell>
                                <TableCell>{row.fallsYesterday}</TableCell>
                                <TableCell>{row.batteryValue}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
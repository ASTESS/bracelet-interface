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
        setSort(sortBy);
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
                                {sort === "Name" ? <ArrowDropDownIcon/> : null}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button onClick={() => sortBy("Total Falls")}>Total Falls</Button>
                                {sort === "Total Falls" ? <ArrowDropDownIcon/> : null}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button onClick={() => sortBy("Falls Today")}>Falls Today</Button>
                                {sort === "Falls Today" ? <ArrowDropDownIcon/> : null}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button onClick={() => sortBy("Falls Yesterday")}>Falls Yesterday</Button>
                                {sort === "Falls Yesterday" ? <ArrowDropDownIcon/> : null}
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button onClick={() => sortBy("Battery Value")}>Battery Value</Button>
                                {sort === "Battery Value" ? <ArrowDropDownIcon/> : null}
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.filter(row => row.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
                            if(sort === "Name"){
                                return a.name.localeCompare(b.name);
                            }else if(sort === "Total Falls"){
                                return a.totalFalls - b.totalFalls;
                            }else if(sort === "Falls Today"){
                                return a.fallsToday - b.fallsToday;
                            }else if(sort === "Falls Yesterday"){
                                return a.fallsYesterday - b.fallsYesterday;
                            }else if(sort === "Battery Value"){
                                return a.batteryValue - b.batteryValue;
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
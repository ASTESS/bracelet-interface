import {useEffect, useState} from "react";

export default function OverView(){
    const [data, setData] = useState([{name: "name", totalFalls: 25, fallsToday: 5, fallsYesterday: 2, batteryValue: 90}, {name: "test", totalFalls: 20, fallsToday: 1, fallsYesterday: 13, batteryValue: 75}, {name: "bob", totalFalls: 10, fallsToday: 5, fallsYesterday: 2, batteryValue: 95}]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("Name");

    useEffect(() => {

        /* getting data from the server
        fetch('url')
        .then(response => response.json())
        .then(data => {
            setData(data.data);
        })
        */
    }, []);

    function sortBy(sortBy){
        setSort(sortBy);
    }


    return(
        <div>
            <h1>OverView</h1>

            <div className="search-box" style={{float: "right", padding: 10}}>
                <input type="text" placeholder="Search" onChange={(event) => setSearch(event.target.value)}/>
            </div>

            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th onClick={() => sortBy("Name")}>Name</th>
                        <th onClick={() => sortBy("Total Falls")}>Total Falls</th>
                        <th onClick={() => sortBy("Falls Today")}>Falls Today</th>
                        <th onClick={() => sortBy("Falls Yesterday")}>Falls Yesterday</th>
                        <th onClick={() => sortBy("Battery Value")}>Battery Value</th>
                    </tr>
                </thead>
                <tbody>


                {data.sort((a, b) => {
                    if(sort === "Name"){
                        return a.name.localeCompare(b.name);
                    }
                    else if(sort === "Total Falls"){
                        return a.totalFalls - b.totalFalls;
                    }
                    else if(sort === "Falls Today"){
                        return a.fallsToday - b.fallsToday;
                    }
                    else if(sort === "Falls Yesterday"){
                        return a.fallsYesterday - b.fallsYesterday;
                    }
                    else if(sort === "Battery Value"){
                        return a.batteryValue - b.batteryValue;
                    }
                }).map((item, index) => {
                    if(item.name.toLowerCase().includes(search.toLowerCase())){
                        return(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.totalFalls}</td>
                                <td>{item.fallsToday}</td>
                                <td>{item.fallsYesterday}</td>
                                <td>{item.batteryValue}</td>
                            </tr>
                        );
                    }
                })}
                </tbody>
            </table>
        </div>
    );
}
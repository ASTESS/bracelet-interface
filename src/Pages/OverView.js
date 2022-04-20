import {useEffect, useState} from "react";

export default function OverView(){
    const [data, setData] = useState([{name: "name", totalFalls: 10, fallsToday: 5, fallsYesterday: 2, batteryValue: 90}, {name: "name", totalFalls: 15, fallsToday: 5, fallsYesterday: 2, batteryValue: 90}, {name: "name", totalFalls: 10, fallsToday: 5, fallsYesterday: 2, batteryValue: 90}]);

    useEffect(() => {

        /* getting data from the server
        fetch('url')
        .then(response => response.json())
        .then(data => {
            setData(data.data);
        })
        */
    }, []);


    return(
        <div>
            <h1>OverView</h1>


            <div className="search-box" style={{float: "right", padding: 10}}>
                <input type="text" placeholder="Search" />
                <button>Search</button>
            </div>

            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total Falls</th>
                        <th>Falls Today</th>
                        <th>Falls Yesterday</th>
                        <th>Battery Value</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.totalFalls}</td>
                            <td>{item.fallsToday}</td>
                            <td>{item.fallsYesterday}</td>
                            <td>{item.batteryValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
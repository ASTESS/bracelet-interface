import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Line, Tooltip, XAxis, LineChart, YAxis} from "recharts";

export default function Patient() {
    const { id } = useParams();
    const [patient, setPatient] = useState(
        {name: "name", data: [
            {date: new Date(Date.now() - (3600 * 1000 * 24 * 5)), falls: 5},
            {date: new Date(Date.now() - (3600 * 1000 * 24 * 4)), falls: 10},
            {date: new Date(Date.now() - (3600 * 1000 * 24 * 3)), falls: 4},
            {date: new Date(Date.now() - (3600 * 1000 * 24 * 2)), falls: 1},
            {date: new Date(Date.now() - (3600 * 1000 * 24)), falls: 7},
            {date: new Date(), falls: 12},
            ]});

    const renderCustomXAxis = (props) => {
        return new Date(props).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    useEffect(() => {
        fetch(`http://localhost:3333/patients/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                setPatient(data);
            })
            .catch(err => console.log(err));
    }, []);

  return (
    <div>
        <h1>{patient.name}</h1>
        <p>{id}</p>
        <LineChart
            width={400}
            height={400}
            data={patient.data}
        >
            <Line type="monotone" dataKey="falls" stroke="#8884d8" />
            <XAxis dataKey="date"  tickFormatter={renderCustomXAxis}/>
            <YAxis />
            <Tooltip />
        </LineChart>
    </div>
  );
}
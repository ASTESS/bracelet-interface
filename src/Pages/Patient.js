import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Patient() {
    const { id } = useParams();
    const [patient, setPatient] = useState({name: "name", data: [{date: new Date()}, {date: new Date()}]});

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

    //temp page
  return (
    <div>
        <h1>{patient.name}</h1>
        <p>{id}</p>
        <div>
            {patient.data.map(data => (
                <div>
                    <h2>{data.date.toLocaleDateString()}</h2>
                </div>
            ))}
        </div>
    </div>
  );
}
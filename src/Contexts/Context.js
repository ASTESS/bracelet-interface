import { Functions, FunctionsTwoTone } from "@mui/icons-material";
import axios from "axios";
import { createContext, useState } from "react";
import SignUp from "../Components/SignUp";


export const Context = createContext({profileName: '',profileId: 0,showAddProfile: false, showSingUp: false, showEditProfile: false, toggleSingUp: () => {}, toggleEditProfile: () => {}, passProfile: () => {}, deleteProfile: () => {}, toggleAddProfile: () => {}})


export function ContextProvider ({children}) {
    const baseURL = "https://brace-guardian.herokuapp.com/"
    const [showSingUp, setShowSingUp] = useState(false);
    const [showEditProfile, setEditProfile] = useState(false);
    const [showAddProfile, setAddProfile] = useState(false);
    const [profileId, setProfileId] = useState(0);
    const [profileName, setProfileName] = useState(0);
    function toggleSingUp(){
        setShowSingUp(!showSingUp);
        console.log(showSingUp)
    }

    function toggleEditProfile(){
        setEditProfile(!showEditProfile)
        console.log(showEditProfile)
    }

    function toggleAddProfile(){
        setAddProfile(!showAddProfile)
        console.log(showAddProfile)
    }

    function passProfile(name, id){
        setProfileId(id)
        setProfileName(name)

    }

    function deleteProfile(id){
        axios.delete(baseURL + 'profiles/' + id, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }
    
    return (
        <Context.Provider value={{showAddProfile, profileName, profileId, showSingUp, showEditProfile, setShowSingUp, toggleSingUp, toggleEditProfile, passProfile, deleteProfile, toggleAddProfile}}>
            {children}
        </Context.Provider>
    )
    
}

export default Context
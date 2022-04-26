import {AppBar, Box, Button, Toolbar} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

export default function NavBar(){
    const navigate = useNavigate();
    const location = useLocation();

    if(location.pathname === "/"){
        return null;
    }
    else{
        return (
            <AppBar position="static" style={{backgroundColor: "#6200ea"}}>
                <Toolbar>
                    <Box flexGrow={1}>
                        <Button onClick={() => navigate("/overview")} color="inherit">Overview</Button>
                        <Button onClick={() => navigate("/nurses")} color="inherit">Nurse Overview</Button>
                        <Button onClick={() => navigate("/bracelets")} color="inherit">Bracelets</Button>
                    </Box>
                    <Box>
                        <Button onClick={() => {
                            localStorage.removeItem("token");
                            window.dispatchEvent( new Event('storage') );
                        }} color="inherit">Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    }

}
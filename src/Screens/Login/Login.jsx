import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import logo from "../../img/logoID.png";
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import { Toaster } from "react-hot-toast";
import { IngresarFuncion } from "../../funciones";

const Login = ({setter}) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const UserHanddler = (e) => {
        setUser(e.target.value)
        
    };
    const PwHandler = (e) => {
        setPassword(e.target.value)
    
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor:"#333c87",
            }}
        >
            <Toaster/>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                <img
                    src={logo}
                    alt="logo ID"
                    style={{
                        margin: 10,
                    }}
                />
                <TextField
                    id="filled-basic-usuario"
                    label="Usuario"
                    variant="filled"
                    sx={{ marginBottom: "20px", width: "300px" }}
                    tabIndex={1}
                    onChange={UserHanddler}
                />
                <TextField
                    id="filled-basic-clave"
                    label="Clave"
                    variant="filled"
                    type="password"
                    sx={{ marginBottom: "20px", width: "300px" }}
                    onChange={PwHandler}
                    
                />
                <Button variant="contained" endIcon={<LoginIcon/>} onClick={()=>IngresarFuncion(user,password,setter)}>
                    Ingresar
                </Button>
            </Box>
        </div>
    );
};

export default Login;

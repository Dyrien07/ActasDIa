import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Login from "../Login/Login";
import { ROUTE } from "../../Constantes";
import logo from "../../img/logoID.png";

const MenuPrincipal = () => {
    const [login, setLogin] = useState(secureLocalStorage.getItem("UserID"));

    const checkLogin = () => {
        let User = secureLocalStorage.getItem("userID");
        if (User) {
            setLogin(User);
        } else {
            setLogin(false);
        }
    };

    const Salir = () => {
        secureLocalStorage.removeItem("userID");
        setLogin(null);
    };

    useEffect(() => {
        checkLogin();
    }, [login]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#333c87",
            }}
        >
            {login ? (
                <Box
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
                            margin: "10px",
                        }}
                    />
                    <Typography
                        variant="h5"
                        component="h1"
                        gutterBottom
                    ></Typography>
                    <Button
                        component={Link}
                        to={ROUTE + "/armadoacta"}
                        variant="contained"
                        color="primary"
                        sx={{ marginBottom: "10px", width: "300px" }}
                    >
                        Generación de Actas
                    </Button>
                    <Button
                        component={Link}
                        to={ROUTE + "/envioacta"}
                        variant="contained"
                        color="success"
                        sx={{ marginBottom: "10px", width: "300px" }}
                    >
                        Envío de Actas
                    </Button>
                    <Button
                        component={Link}
                        to={ROUTE + "/getInfo"}
                        variant="contained"
                        color="info"
                        sx={{ marginBottom: "10px", width: "300px" }}
                    >
                        Descarga de datos y PDF
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ marginBottom: "10px", width: "300px" }}
                    >
                        Descarga KPI
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{ marginBottom: "10px", width: "300px" }}
                    >
                        Finalizar Periodo Inventarial
                    </Button>
                    <Button
                        onClick={Salir}
                        variant="contained"
                        color="error"
                        sx={{ width: "300px" }}
                    >
                        Salir
                    </Button>
                </Box>
            ) : (
                <Login setter={setLogin} />
            )}
        </div>
    );
};

export default MenuPrincipal;

import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ROUTE } from "../../Constantes";
import logoLeft from "../../assets/img/LogoID.png"; // Ajusta la ruta según tu estructura de archivos
import logoRight from "../../assets/img/logo_dia.jpg"; // Ajusta la ruta según tu estructura de archivos

const CustomHeader = () => {
    return (
        <div className="header-container bg-white">
            <div className="row align-items-center justify-content-between">
                <div className="col-auto">
                    <img src={logoLeft} alt="Logo Left" className="logo" />
                </div>
                <div className="col text-center">
                    <h4 className="m-0">Actas ID-DIA</h4>
                </div>
                <div className="col-auto">
                    <img src={logoRight} alt="Logo Right" className="logo-dia" />
                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <Link type="button" to={ROUTE + "/"} className="btn btn-light">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-bar-left"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"
                        />
                    </svg>
                    Menu Principal
                </Link>
            </div>
        </div>
    );
};

export default CustomHeader;

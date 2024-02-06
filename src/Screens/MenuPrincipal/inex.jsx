import React from "react";
import "./index.css"
import { Link } from "react-router-dom";

const MenuPrincipal = () => {
    return (
        <div className="MenuContainer">
            <Link to={"/armadoacta"}  type= "button" className="btn btn-primary ButtonMenu">Generacion de Actas</Link>
            <Link to={"/envioacta"} type="button" className="btn btn-success ButtonMenu">Envio de Actas</Link>
            <button className="btn btn-danger ButtonMenu">Control Actas</button>
            <button className="btn btn-dark ButtonMenu">Descarga de datos y PDF</button>
            <button className="btn btn-dark ButtonMenu">Descarga KPI</button>
            <button className="btn btn-warning ButtonMenu">Finzalidar Peridodo Inventarial</button>
        </div>
    );
};

export default MenuPrincipal;

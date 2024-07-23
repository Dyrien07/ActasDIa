import React, {   useState } from "react";
import DatoasActasDB from "./DatoasActasDB";
import CustomHeader from "../CustomHeader/CustomHeader";
import DateRangePicker from "../DatePickerDH/DatePickerDH";
import "./style.css";

const EnvioActas = () => {
    const [Datos, setDatos] = useState([]);


    
    return (
        <div>
            <CustomHeader></CustomHeader>

            <DateRangePicker setDatos={setDatos} Datos={Datos} />

            <div className="d-flex justify-content-center align-items-center">
                <table className="table table-hover table-group-divider margin-inline  table-bordered">
                    <thead className="table-light table-bordered bordered-primary ">
                        <tr>
                            <th scope="col">Almacen</th>
                            <th scope="col">Tipo de Acta</th>
                            <th scope="col">Nombre de Acta</th>
                            <th scope="col">Monto</th>
                            <th scope="col">Periodo Inventarial</th>
                            <th scope="col">Estado</th>
                            <th scope="col">HDR</th>
                            <th scope="col">Acciones</th>
                            <th scope="col">Comentarios</th>

                        </tr>
                    </thead>
                    {Datos.length === 0 && (
                        <tr>
                            <td className="text-center" colSpan="8">
                                No existen datos para mostrar
                            </td>
                        </tr>
                    )}
                    {Datos.map((row) => (
                        <DatoasActasDB data={row} key={row.ID} setDatos={setDatos} ArrayDatos={Datos} />
                    ))}
                </table>
            </div>
        </div>
    );
};

export default EnvioActas;

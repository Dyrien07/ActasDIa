import React, { useState } from "react";
import CustomHeader from "../CustomHeader/CustomHeader";
import DatePicker from "react-datepicker";

const ActasRechazadas = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>
            <CustomHeader></CustomHeader>
            <div style={
                {display:"flex",
                flexDirection:"row",
                margin: 10,
                justifyContent: "end",
                alignItems: "center",

        }}>
            <div style={{
                marginRight:10
            }}>
            <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat={"dd/MM/yyyy"}
                    todayButton={"hoy"}
                />
            </div>
               

                <DatePicker
                
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat={"dd/MM/yyyy"}
                    todayButton={"hoy"}
                />
                <buton className="btn btn-primary">Buscar</buton>
            </div>

            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Almacen</th>
                        <th scope="col">Tipo de Acta</th>
                        <th scope="col">Nombre de Acta</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Periodo Inventarial</th>
                        <th scope="col">Estado</th>
                        <th scope="col">HDR</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};

export default ActasRechazadas;

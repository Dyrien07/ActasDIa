import React, { useState } from "react";
import { InputLabel, InputHead, rowsDetails, DefinedRows } from "./InputLabel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArmadoActa = () => {
    const [rowsData, setRowsData] = useState([]);
    const [newRowData, setNewRowData] = useState({
        id: Date.now(),
        tienda: "",
        rectificacion: "",
        pedido: "",
        fecha: "",
        bultos: "",
        resolucion: "",
        debitoTransportista: "",

    });

    const verificarDatos = () => {
        for (let key in newRowData) {
            if(newRowData.hasOwnProperty(key)){
                if (newRowData[key] === "" || newRowData[key] === undefined) {
                    return false;
                }
            }
        }
        return true;
    };
    const addNewRow = () => {
        let Validacion = verificarDatos();
        if (Validacion === false) {
            toast.warn("Complete todos los campos para continuar", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        } else {
            setRowsData([...rowsData, newRowData]);
            setNewRowData({
                id: Date.now(),
                tienda: "",
                rectificacion: "",
                pedido: "",
                fecha: "",
                bultos: "",
                resolucion: "",
                debitoTransportista: "",
                
            });
        }
    };
    return (
        <div>
            <ToastContainer/>
            <table className="table">
                <thead>
                    <tr>
                        <InputHead />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {rowsDetails.map((row) =>{
                            return (
                            row.text !== "Acciones" && 
                                <InputLabel
                                    prevState={newRowData}
                                    label={row.text}
                                    propname={row.propname}
                                    handleChange={setNewRowData}
                                    value={newRowData[row.propname]}
                                />
                            )
                        } )}
                    </tr>
                    <DefinedRows setCurrentRows={setRowsData} definedRows={rowsData}/>
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={addNewRow}>
                Agregar Linea
            </button>
        </div>
    );
};

export default ArmadoActa;

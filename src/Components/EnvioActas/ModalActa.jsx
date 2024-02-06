import React from "react";
import ModalData from "./ModalData";



const ModalActa = ({Detalle, setterModal, data}) => {  
    
    
    return (
        <div className="d-flex justify-content-center align-items-center">
            <table className="table table-hover table-group-divider margin-inline  table-bordered">
                <thead className="table-light table-bordered bordered-primary ">
                    <tr>
                        <th scope="col">Monto</th>
                        <th scope="col">Bultos Faltantes</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Pedido</th>
                        <th scope="col">Rectificacion</th>
                        <th scope="col">Tienda</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                {Detalle.length === 0 && (
                    <tr>
                        <td className="text-center" colSpan="8">
                            No existen datos para mostrar
                        </td>
                    </tr>
                )}



                {Detalle.map(row=>(
                <ModalData Datos={row} setterModal={setterModal} data={data} key={row.ID}/>
                ))}

                
                
            </table>
        </div>
    );
};

export default ModalActa;

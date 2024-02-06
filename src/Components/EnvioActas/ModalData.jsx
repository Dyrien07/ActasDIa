import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import {  EliminarLineaDetalle } from "./EnvioHelpers";


const ModalData = ({ Datos, setterModal, data }) => {
    const fecha = new Date(Datos.Fecha);
    const año = fecha.getFullYear().toString().slice(-2);
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const dia = fecha.getDate().toString().padStart(2, "0");

    let fechaFormateada = dia +"-"+mes + "-" + año



    const DeleteRow = () => {
        setterModal(false);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Seguro que quiere eliminar la linea?",
                text: "El borrado es pormanente",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Borrar",
                cancelButtonText: "No,Cancelar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    let Borrado = await EliminarLineaDetalle(
                        Datos.ID_Acta,
                        Datos.ID
                    );
                    if (Borrado === "OK") {                        
                        swalWithBootstrapButtons.fire(
                            "Linea Borrada",
                            "",
                            "success"
                        );
                    } else {
                        Swal.fire({
                            title: "Hubo un error al borrar la linea",
                            icon: "error",
                        });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    setterModal(true);
                }
            })
            .catch(() => {
                return null;
            });
    };
    return (
        <tbody className="table-group-divider">
            <tr className="">
                <th scope="row">{Datos.Debito_Tranportista}</th>
                <td>{Datos.Bultos_Faltantes}</td>
                <td>{fechaFormateada}</td>
                <td>{Datos.Pedido}</td>
                <td>{Datos.Rectificacion}</td>
                <td>{Datos.Tienda}</td>
                <td>
                    {  data.Estado === "Pendiente Envio" &&(
                        <button className="btn" onClick={DeleteRow}>
                            <DeleteIcon color="error"></DeleteIcon>
                        </button>
                    )}
                </td>
            </tr>
        </tbody>
    );
};

export default ModalData;

import React, { useState } from "react";
import {
    EliminacionTotal,
    EnviarActa,
    ModificarActa,
    SendPdf,
    openHDR,
    verActasDetalle,
} from "./EnvioHelpers";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import "./style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalActa from "./ModalActa";
import AddIcon from "@mui/icons-material/Add";
import { Toaster, toast } from "react-hot-toast";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "#FFF",
    boxShadow: 24,
    p: 4,
};

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const DatoasActasDB = ({ data }) => {
    const [DetalleActa, setDetalleActas] = useState([]);
    const [modalOpen, setmodalOpen] = useState(false);
    const [VisibleAddLine, setVisibleAddLine] = useState(false);
    const [Monto, setMonto] = useState("");
    const [Bultos, setBultos] = useState("");
    const [Pedido, setPedido] = useState("");
    const [Rectificacion, setRectificacion] = useState("");
    const [Tienda, setTienda] = useState("");
   

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file.name.endsWith(".pdf")) {
            let Guardado = await SendPdf(file, data.ID);
            if (Guardado === "OK") {
                toast.success("El archivo se guardo correctamente");
               
            }else{
                toast.error("No se pudo guardar el archivo")
            }
        } else {
            toast.error("El archivo debe ser .PDF");
            return;
        }
    };

    const GetDetalle = async (ID) => {
        let detalle = await verActasDetalle(ID);
        setDetalleActas(detalle.data);
        setmodalOpen(true);
    };

    const AgregarLinea = async () => {
        try {
            if (
                Monto === "" ||
                Bultos === "" ||
                Pedido === "" ||
                Tienda === "" ||
                Rectificacion === ""
            ) {
                toast.error("Complete todos los datos para continuar");

                return;
            }
            let Mod = await ModificarActa(
                data.ID,
                Monto,
                Bultos,
                Pedido,
                Rectificacion,
                Tienda
            );
            if (Mod.data === "OK") {
                toast.success("Se agrego correctamente", {
                    style: {},
                });
                setVisibleAddLine(false);
                GetDetalle(data.ID);
            } else {
                toast.error("Hubo un error en Funcion AgregrLinea");
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <React.Fragment>
            <Toaster />
            <tbody className="table-group-divider">
                <tr
                    className={
                        data.Estado === "Enviado"
                            ? "table-success"
                            : "table-danger"
                    }
                >
                    <th scope="row">{data.Almacen}</th>
                    <td>{data.Tipo_Acta}</td>
                    <td>{data.Nombre_Acta}</td>
                    <td>{data.Monto}</td>
                    <td>{data.Periodo_Inventarial}</td>
                    <td>{data.Estado}</td>
                    <td>
                        {data.HDR === true ? (
                            <button className="btn">
                                <InsertDriveFileIcon
                                    color="success"
                                    onClick={() =>
                                        openHDR(
                                            data.ID,
                                        )
                                    }
                                />
                            </button>
                        ) : (
                            <Button component="label">
                                <UploadFileIcon color="error" />
                                <VisuallyHiddenInput
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                />
                            </Button>
                        )}
                    </td>
                    <td>
                        {data.Estado === "Pendiente Envio" && (
                            <button className="btn btn-light" onClick={()=>EnviarActa(data.HDR, data.ID)}>
                                <ForwardToInboxIcon color="primary"  />
                            </button>
                        )}
                        
                            <button
                                className="btn btn-light mx-1"
                                onClick={() => GetDetalle(data.ID)}
                            >
                                <ModeEditOutlineIcon color="success" />
                            </button>
                        
                        { data.Estado === "Pendiente Envio" && (
                            <button
                            className="btn btn-light b"
                            onClick={() => EliminacionTotal(data.ID)}
                        >
                            <DeleteIcon color="error"></DeleteIcon>
                        </button>)}
                    </td>
                </tr>
                <Modal
                    open={modalOpen}
                    onClose={() => setmodalOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{ ...style, overflowY: "auto", maxHeight: "80vh" }}
                    >
                        <div className="overflow-auto">
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h1"
                            >
                                {data.Nombre_Acta}
                            </Typography>
                            <div className="">
                                <ModalActa
                                    Detalle={DetalleActa}
                                    setterModal={setmodalOpen}
                                    data ={data}
                                />
                            </div>

                           { data.Estado === "Pendiente Envio" &&( <button
                                className=" btn btn-light"
                                onClick={() => setVisibleAddLine(true)}
                            >
                                <AddIcon color="success"></AddIcon>Agregar Linea
                            </button>)}
                            {VisibleAddLine && (
                                <React.Fragment>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Monto"
                                            onChange={(e) =>
                                                setMonto(e.target.value)
                                            }
                                            value={Monto}
                                        />
                                        <label htmlFor="floatingInput">Monto</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Bultos Faltantes"
                                            onChange={(e) =>
                                                setBultos(e.target.value)
                                            }
                                            value={Bultos}
                                        />
                                        <label htmlFor="floatingPassword">
                                            Bultos Faltantes
                                        </label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            onChange={(e) =>
                                                setPedido(e.target.value)
                                            }
                                            value={Pedido}
                                        />
                                        <label htmlFor="floatingInput">
                                            Pedido
                                        </label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingPassword"
                                            placeholder="Rectificacion"
                                            onChange={(e) =>
                                                setRectificacion(e.target.value)
                                            }
                                            value={Rectificacion}
                                        />
                                        <label htmlFor="floatingPassword">
                                            Rectificacion
                                        </label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Tienda"
                                            onChange={(e) =>
                                                setTienda(e.target.value)
                                            }
                                            value={Tienda}
                                        />
                                        <label htmlFor="floatingInput">
                                            Tienda
                                        </label>
                                    </div>

                                    <button
                                        onClick={AgregarLinea}
                                        className="btn btn-primary"
                                    >
                                        Enviar
                                    </button>
                                    <button
                                        className="btn btn-secondary mx-2"
                                        onClick={() => setVisibleAddLine(false)}
                                    >
                                        Cerrar
                                    </button>
                                </React.Fragment>
                            )}
                        </div>
                    </Box>
                </Modal>
              
            </tbody>
        </React.Fragment>
    );
};

export default DatoasActasDB;

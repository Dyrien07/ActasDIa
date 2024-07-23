import axios from "axios";
import { URLENDPOINT } from "../../Constantes.js";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

const verActasEnvio = async (EstadoActa, desde, hasta, setDatos) => {
    try {
        let actas = await axios.post(URLENDPOINT + "consultar/actas", {
            Estado: EstadoActa,
            Desde: desde,
            Hasta: hasta,
        });
        setDatos(actas.data);
    } catch (e) {
        Swal.fire("Se perdio la conexion con la base de datos");
        return [];
    }
};
const verActasTodo = async (desde, hasta, setDatos) => {
    try {
        let actas = await axios.post(URLENDPOINT + "consultar/all", {
            Desde: desde,
            Hasta: hasta,
        });
        setDatos(actas.data);
    } catch (e) {
        console.log(e.message);
        Swal.fire("Ocurio un error al intentar mostrar las actas");
    }
};

export const ConsultarActas = async (Estado, desde, hasta, setDatos, all) => {
    try {
        if (all === true) {
            verActasTodo(desde, hasta, setDatos);
        } else {
            verActasEnvio(Estado, desde, hasta, setDatos);
        }
    } catch (e) {
        return [];
    }
};

export const verActasDetalle = async (idActa) => {
    try {
        let detalleActa = await axios.post(URLENDPOINT + "consultar/detalle", {
            IDacta: idActa,
        });
        return detalleActa;
    } catch (e) {}
};

export const editorSimple = (userPermisos, setEditorUserSimple) => {
    if (userPermisos === 1) {
        setEditorUserSimple(false);
    } else {
        Swal.fire({
            title: "Usted no tiene permisos para actualizar el contenido de las actas",
            icon: "warning",
        });
    }
};

export const EliminarLineaDetalle = async (idActa, IDLinea) => {
    console.log(idActa, IDLinea);
    try {
        let Borrado = await axios.post(URLENDPOINT + "eliminar", {
            IDActa: idActa,
            IDLinea: IDLinea,
        });
        return Borrado.data;
    } catch (e) {
        Swal.fire({
            title: e.Respuesta.msj,
            icon: "error",
        });
    }
};

const EliminarTodo = async (IDacta) => {
    let Eliminacion = await axios.post(URLENDPOINT + "eliminar/EliminarTodo", {
        IDacta: IDacta,
    });
    return Eliminacion;
};

export const EliminacionTotal = async (IDacta, setDatos, Datos) => {
    try {
        Swal.fire({
            title: "Esta seguro que desea eliminar el acta?",
            text: "El borrado es permanente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    let Eliminacion = await EliminarTodo(IDacta);
                    if (Eliminacion.data === "OK") {
                        Swal.fire({
                            title: "Borrado!",
                            text: "El borrado es permanete.",
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "Ocurrio un Error",
                            icon: "error",
                        });
                    }
                }
            })
            .catch((e) => {
                Swal.fire({
                    title: e.message,
                    icon: "error",
                });
            });
    } catch (e) {
        Swal.fire({
            title: e.Respuesta.msj,
            icon: "error",
        });
    }
};
export const ModificarActa = async (
    ActaID,
    Monto,
    Bultos,
    Pedido,
    Rect,
    Tienda
) => {
    try {
        let Modificacion = await axios.post(
            URLENDPOINT + "eliminar/ModificarActa",
            {
                IDacta: ActaID,
                Monto: Monto,
                BultosF: Bultos,
                Pedido: Pedido,
                Rect: Rect,
                Tienda: Tienda,
            }
        );
        return Modificacion;
    } catch (e) {
        Swal.fire({
            title: "Error en funcion ModificarActa",
            icon: "error",
        });
    }
};

export const SendPdf = async (file, ID) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
        let archivo = await axios.post(
            URLENDPOINT + `crearactas/GuardarPDF/${ID}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log(archivo);
        return archivo.data;
    } catch (e) {
        toast.error(e.Respuesta.msj);
    }
};

export const openHDR = async (ID,) => {
    try {
        const response = await axios.post(URLENDPOINT + "consultar/HDR", {
            ID: ID,
        });

        const rutaArchivo = response.data;
        const test1 = rutaArchivo.split("\\")[2];
        console.log(test1);

        const archivoResponse = await axios({
            url: URLENDPOINT + "consultar/getPDF/" + test1, // Utiliza la ruta del archivo obtenida del servidor
            method: "GET",
            responseType: "blob",
        });

        // Crea un objeto URL para el archivo PDF
        const pdf = URL.createObjectURL(archivoResponse.data);

        // Abre una nueva ventana del navegador para mostrar el archivo PDF
        const newWindow = window.open(pdf, "_blank", "fullscreen=yes");

        if (newWindow) {
            // Puedes cerrar la ventana emergente después de cierto tiempo si es necesario
            // setTimeout(() => newWindow.close(), 5000);
        } else {
            alert(
                "El navegador bloqueó la apertura de una nueva ventana. Habilita las ventanas emergentes en tu navegador y vuelve a intentarlo."
            );
        }
    } catch (error) {
        // Manejar errores aquí
        console.error("Error al abrir el archivo PDF:", error);
    }
};
export const openHDRMod = async (ID,) => {
    try {
        const response = await axios.post(URLENDPOINT + "consultar/HDR", {
            ID: ID,
        });

        const rutaArchivo = response.data;
        const test1 = rutaArchivo.split("\\")[2];
        console.log(test1);

        const archivoResponse = await axios({
            url: URLENDPOINT + "consultar/getPDF/" + test1, // Utiliza la ruta del archivo obtenida del servidor
            method: "GET",
            responseType: "blob",
        });

        // Crea un objeto URL para el archivo PDF
        const pdf = URL.createObjectURL(archivoResponse.data);
        return pdf;

        
        
    } catch (error) {
        // Manejar errores aquí
        console.error("Error al abrir el archivo PDF:", error);
    }
};
export const EnviarActa = async (hdr, ID, Estado) => {

    try {
        if(Estado === "Rechazado"){
            Swal.fire({
                title: "Esta acta esta lista para ser reenviada?",
                text: "Una vez enviada no podra ser editada nuevamente",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, enviar",
            })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        let Send = await axios.post(URLENDPOINT + "crearactas/EnviarActa", {
                            ID: ID,
                        });
                        if (Send.data === "OK") {
                            Swal.fire({
                                title: "Acta reenviada!",
                                text: "Ya esta disponible para ser revisada por el cliente.",
                                icon: "success",
                            });
                        } else {
                            Swal.fire({
                                title: "Ocurrio un Error",
                                icon: "error",
                            });
                        }
                    }
                })
                .catch((e) => {
                    Swal.fire({
                        title: e.message,
                        icon: "error",
                    });
                });
                return

        }
        if (!hdr) {
            toast("Falta HDR", {
                icon: <DocumentScannerIcon color="error" />,
            });
            return;
        }
        let Send = await axios.post(URLENDPOINT + "crearactas/EnviarActa", {
            ID: ID,
        });
        if (Send.data === "OK") {
            toast.success(
                "Se envio el acta correctamente\n\nYa se encuentra en Control Actas como pendiente firma"
            );
        } else {
            toast.error("ocurrio un error");
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const EliminarPDF = async(ID) => {
    try{
        let Eliminar = await axios.post(URLENDPOINT + "crearactas/EliminarPDF",{
            ID: ID,
        })
        return Eliminar.data

    }catch (error) {
        toast.error(error.message);

    }
}

export  const LimpiarPDF = async(ID) => {
 let limpiar = await EliminarPDF(ID);
 if(limpiar === "OK"){
    toast.success("El PDF se borro correctamente")
 }else{
    toast.error("Error al borrar el pdf");
 }
}

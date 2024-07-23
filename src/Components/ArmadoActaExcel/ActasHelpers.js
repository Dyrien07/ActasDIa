import axios from "axios";
import Swal from "sweetalert2";
import { URLENDPOINT } from "../../Constantes";

const ModalCerrarACta = async (Datos, Nombre) => {
    try {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Todo listo para crear el acta?",
                text: "Luego puede editarse en el modulo de envio",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Crear acta",
                cancelButtonText: "No,Cancelar!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    let numeroID = await GrabarActa(Nombre, Datos);

                    if (numeroID.msj === "OK") {
                        swalWithBootstrapButtons.fire(
                            "Acta creada",
                            "Ya disponoble en el modulo dle envio de actas.",
                            "success"
                        );
                    } else {
                        Swal.fire({
                            title: "Hubo un error",
                            icon: "error",
                        });
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Se cancelo la accion",
                        "",
                        "error"
                    );
                }
            })
            .catch(() => {
                return null;
            });
    } catch (e) {}
};

const GrabarActa = async (Nombre, Datos) => {
    try {
        let test = await axios.post(URLENDPOINT + "crearactas/crearacta", {
            Datos,
            Nombre,
        });
        return test.data;
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: error.response.data.Respuesta.msj,
            icon: "error",
        });
    }
};

const ActasHelpers = {
    ModalCerrarACta,
    GrabarActa,
};

export default ActasHelpers;

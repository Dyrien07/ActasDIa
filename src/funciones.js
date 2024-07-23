import axios from "axios";
import { URLAUTH, URLENDPOINT } from "./Constantes";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

const Ingresar = async (user, pw, setter) => {
    try {
        let login = await axios.post(URLAUTH, {
            UserID: user,
            pass: pw,
            sp: "Validar_Usuario"
        });
        console.log(login.data);
        if (login.data.ID > 0) {
            toast.success("Ingreso correcto");
            setTimeout(() => {
                secureLocalStorage.setItem("userID", login.data.ID);
                setter(true);
            }, 1000);
        } else {
            toast.error("Ingreso incorrecto");
        }
    } catch (e) {
        toast.error("Hubo un error: " + e.message);
    }
};

export const IngresarFuncion = async (user, pw, setter) => {
    try {
        if (user.length < 3) {
            toast.error("Ingrese usuario");
            return;
        }
        if (pw.length === 0) {
            toast.error("Ingrese clave");
            return;
        }
        let LogIn = await Ingresar(user, pw, setter);
        return LogIn;
    } catch (err) {
        toast.error(err.message);
    }
};

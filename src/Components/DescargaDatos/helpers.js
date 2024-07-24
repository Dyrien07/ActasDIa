import axios from "axios";
import { URLENDPOINT } from "../../Constantes";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const buscarActaXId = async (id) => {
    let acta = await axios.post(URLENDPOINT + "get/id", {
        id,
    });

    return acta.data;
};

export const getDetalle = async (id) => {
    let detalle = await axios.post(URLENDPOINT + "get/detalle", {
        IDacta: id,
    });
    console.log(detalle.data);
    return detalle.data;
};

const buscarActasEntreFechas = async (desde, hasta, setter) => {
    let actas = await axios.post(URLENDPOINT + "get/actas-fechas", {
        desde,
        hasta,
    });
    return actas.data;
};

export const buscarActasxFechasFN = async (desde, hasta, setter, loader) => {
    try {
        if (desde === "" || hasta === "") {
            toast.error("Seleccione Fechas");
        } else {
            loader(true);
            let actas = await buscarActasEntreFechas(desde, hasta);
            setter(actas);
        }
        loader(false);
    } catch (e) {
        loader(false);
        toast.error(e.message);
    }
};

export const buscarActasPorIdFN = async (id, setter, loader) => {
    try {
        if (id === "") {
            toast.error("Ingrese un ID");
        } else {
            loader(true);
            let acta = await buscarActaXId(id);
            setter(acta);
        }
        loader(false);
    } catch (e) {
        loader(false);
        toast.error(e.message);
    }
};

export const generateExcelFile = async (rows) => {
    const wb = XLSX.utils.book_new();

    const ws1 = XLSX.utils.json_to_sheet(rows.map((row) => ({ ...row })));
    XLSX.utils.book_append_sheet(wb, ws1, "Datos");

    const ids = rows.map((row) => row.id);

    try {
        const detallesArrays = await Promise.all(
            ids.map((id) => getDetalle(id))
        );

        const detalles = detallesArrays.flat();

        if (detalles.length > 0) {
            const ws2 = XLSX.utils.json_to_sheet(detalles);
            XLSX.utils.book_append_sheet(wb, ws2, "Detalle Actas");
        } else {
            console.warn("No details available to add to the sheet.");
        }

        // Generar el archivo Excel
        XLSX.writeFile(wb, "Informe_Actas.xlsx");
    } catch (error) {
        console.error("Error fetching details:", error);
    }
};


export const handleRowClick = async (id, setid, setSelectedRow, setOpen) => {
    setid(id);

    try {
        const details = await getDetalle(id);
        setSelectedRow(details);
        setOpen(true);
    } catch (error) {
        console.error("Error fetching details:", error);
    }
};
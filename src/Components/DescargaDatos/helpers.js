import axios from "axios";
import { URLENDPOINT } from "../../Constantes";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PDFDocument } from "pdf-lib";
import { ColumnsDetail } from "./estructure";

const buscarActaXId = async (id) => {
    let acta = await axios.post(URLENDPOINT + "get/id", {
        id,
    });

    return acta.data;
};

const getNombreActa = async (id) => {
    try {
        let nombre = await axios.post(URLENDPOINT + "get/getNombreActa", {
            id,
        });
        console.log(nombre.data);
        return nombre.data;

    } catch (e) {
        console.error(e.message);
    }
};

export const getDetalle = async (id) => {
    let detalle = await axios.post(URLENDPOINT + "get/detalle", {
        IDacta: id,
    });

    return detalle.data;
};

const buscarActasEntreFechas = async (desde, hasta) => {
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

export const generarActaCompleta = async (ID) => {
    try {
        const response = await axios.post(URLENDPOINT + "consultar/HDR", {
            ID: ID,
        });

        const rutaArchivo = response.data;
        const test1 = rutaArchivo.split("\\")[2];
        

        const archivoResponse = await axios({
            url: URLENDPOINT + "consultar/getPDF/" + test1,
            method: "GET",
            responseType: "blob",
        });

        // Crear un nuevo documento PDF
        const doc = new jsPDF();
        const margin = 10;
        const pageWidth = doc.internal.pageSize.width;

        const fixedText = `
        Por la presente, los firmantes abajo dejan conformidad de los movimientos realizados a imputar al de abono de rectificaciones, movimiento de gestión AMO22A (Gestión de almacén), según sistema AS400, que corresponden a las tiendas y unidades de los artículos correspondientes a cada rectificación a continuación.
        Los mismos no deberán formar parte de la pérdida del almacén, por lo que no podrán imputarse, ni formar parte del cálculo denominado “perdida conocida de almacén”, según se detalla en el anexo 7 (cálculo de merma), del contrato entre las partes.`;

        // Ajustar el texto fijo
        const splitText = doc.splitTextToSize(fixedText, pageWidth - 2 * margin);
        let currentY = margin + 70;

        splitText.forEach(line => {
            if (currentY + 8 > doc.internal.pageSize.height - margin) {
                doc.addPage();
                currentY = margin + 70;
            }
            doc.text(line, margin, currentY);
            currentY += 8;
        });

        // Obtener el nombre del acta
        let nombre = await getNombreActa(ID);
        const nombreActa = nombre[0].Nombre_Acta;

        // Añadir el nombre del acta al PDF
        doc.setFontSize(14);
        const nombreActaLines = doc.splitTextToSize(nombreActa, pageWidth - 2 * margin);
        currentY += 10; // Espacio adicional antes del nombre del acta

        nombreActaLines.forEach(line => {
            if (currentY + 10 > doc.internal.pageSize.height - margin) {
                doc.addPage();
                currentY = margin + 10;
            }
            doc.text(line, margin, currentY);
            currentY += 10;
        });

        // Obtener los datos para las filas de la tabla
        const detalles = await getDetalle(ID);
        const tableRows = detalles.map(detalle => [
            detalle.Debito_Tranportista,
            detalle.Bultos_Faltantes,
            detalle.Fecha,
            detalle.Pedido,
            detalle.Rectificacion,
            detalle.Tienda,
        ]);

        // Calcular el total de "Monto" (Debito_Tranportista)
        const totalMonto = detalles.reduce((sum, detalle) => sum + parseFloat(detalle.Debito_Tranportista), 0);
        const totalRow = ["Total", totalMonto.toFixed(2), "", "", "", ""];
        tableRows.push(totalRow);

        // Configurar la tabla en el PDF
        const tableColumn = ColumnsDetail.map(col => col.headerName);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: currentY,
            margin: { top: 10 },
            didDrawPage: (data) => {
                if (data.cursor.y + data.table.height > doc.internal.pageSize.height - margin) {
                    doc.addPage();
                    data.cursor.y = margin;
                }
            },
            theme: 'striped',
        });

        // Obtener el nuevo PDF generado
        const newPdfBytes = doc.output("arraybuffer");

        // Cargar los bytes del nuevo PDF generado con pdf-lib
        const newPdfDoc = await PDFDocument.load(newPdfBytes);

        // Crear un documento PDF final
        const finalPdfDoc = await PDFDocument.create();

        // Copiar las páginas del nuevo PDF al documento final
        const newPageCount = newPdfDoc.getPageCount();
        for (let i = 0; i < newPageCount; i++) {
            const [page] = await finalPdfDoc.copyPages(newPdfDoc, [i]);
            finalPdfDoc.addPage(page);
        }

        // Cargar el PDF original
        const existingPdfBytes = await archivoResponse.data.arrayBuffer();
        const existingPdfDoc = await PDFDocument.load(existingPdfBytes);

        // Añadir el contenido del PDF original al final del documento final
        const existingPageCount = existingPdfDoc.getPageCount();
        for (let i = 0; i < existingPageCount; i++) {
            const [page] = await finalPdfDoc.copyPages(existingPdfDoc, [i]);
            finalPdfDoc.addPage(page);
        }

        // Descargar el PDF combinado
        const finalPdfBytes = await finalPdfDoc.save();
        const pdfBlob = new Blob([finalPdfBytes], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Abre una nueva ventana del navegador para mostrar el archivo PDF combinado
        const newWindow = window.open(pdfUrl, "_blank", "fullscreen=yes");

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
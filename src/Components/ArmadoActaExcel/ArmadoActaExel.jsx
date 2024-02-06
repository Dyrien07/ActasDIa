import React, { useState } from "react";
import { read, utils } from "xlsx";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ActasHelpers from "./ActasHelpers";

const ArmadoActaExcel = () => {
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);
    const [NombreActa, setNombreActa] = useState("")

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setError("Por favor, seleccione un archivo Excel.");
            return;
        }
        if (!file.name.endsWith(".xlsx")) {
            setError("El archivo debe ser un archivo Excel con extensión .xlsx.");
            return;
        }

        setError(null);

        const reader = new FileReader();

        reader.onload = (event) => {
            const data = event.target.result;

            try {
                const workbook = read(data, { type: "binary" });

                const jsonData = [];

                workbook.SheetNames.forEach((sheetName) => {
                    const sheet = workbook.Sheets[sheetName];
                    const sheetData = utils.sheet_to_json(sheet, { raw: false , range: 1});
                    setNombreActa(sheet.A1.h)
                   
                    sheetData.forEach((rowData, rowIndex) => {
                        console.log(`Fila ${rowIndex + 1}:`);
                        Object.keys(rowData).forEach((key) => {
                            console.log(` - ${key}: ${rowData[key]}`);
                        });
                    });

                    jsonData.push(...sheetData);
                });

                setTableData(jsonData);
            } catch (err) {
                setError("Error al leer el archivo Excel.");
            }
        };

        reader.readAsBinaryString(file);
    };

    const handleImportButtonClick = () => {
        const fileInput = document.getElementById("fileInput");
        fileInput.click();
    };

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}
            <Toaster />
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <button
                className="btn btn-primary"
                onClick={handleImportButtonClick}
            >
                Importar Excel
            </button>
            <button className="btn btn-danger" onClick={() => setTableData([])}>
                Limpiar
            </button>
            {tableData.length > 0 ? (
                <table className="table table-striped mt-3">
                    <thead className="thead-dark">
                        <tr>
                            {Object.keys(tableData[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((rowData, index) => (
                            <tr key={index}>
                                {Object.values(rowData).map((value, colIndex) => (
                                    <td key={colIndex}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="mt-3">No hay datos para mostrar.</div>
            )}
            <button
                className="btn btn-primary"
                onClick={() => ActasHelpers.ModalCerrarACta(tableData, NombreActa)}
            >
                Cerrar Acta
            </button>
            <Link to={"/"} className="btn btn-danger">
                Salir
            </Link>
        </div>
    );
};

export default ArmadoActaExcel;

import React, { useState } from "react";
import { read, utils } from "xlsx";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ActasHelpers from "./ActasHelpers";
import { ROUTE } from "../../Constantes";
import logo from "../../img/logoID.png"; // Asegúrate de tener la ruta correcta de tu logo
import "./ArmadoExcel.css"; // Importa el archivo CSS aquí

const ArmadoActaExcel = () => {
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);
    const [NombreActa, setNombreActa] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setError("Por favor, seleccione un archivo Excel.");
            return;
        }
        if (!file.name.endsWith(".xlsx")) {
            setError(
                "El archivo debe ser un archivo Excel con extensión .xlsx."
            );
            return;
        }

        setError(null);

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target.result;

            try {
                const workbook = read(data, { type: "binary" });
                const jsonData = [];
                let firstRow = [];

                workbook.SheetNames.forEach((sheetName) => {
                    const sheet = workbook.Sheets[sheetName];

                    // Obtener todas las filas como un array de arrays
                    const rows = utils.sheet_to_json(sheet, {
                        header: 1,
                        raw: false,
                    });

                    if (rows.length > 0) {
                        firstRow = rows[0];
                        if (firstRow.length === 0) {
                            setError("No se encontro el nombre del acta");
                        } else {
                            setNombreActa(firstRow[0]);
                        }
                    }
                    const sheetData = utils.sheet_to_json(sheet, {
                        raw: false,
                        range: 1,
                    });

                    jsonData.push(...sheetData);
                });

                setTableData(jsonData);
            } catch (err) {
                setError(err.message);
            }
        };

        reader.readAsBinaryString(file);
    };

    const handleImportButtonClick = () => {
        const fileInput = document.getElementById("fileInput");
        fileInput.click();
    };

    return (
        <div className="container">
            {error && <div className="alert alert-danger">{error}</div>}
            <Toaster />
            <div className="header-container">
                <div>
                    <img src={logo} alt="Logo ID" className="logo-img" />
                    <h1>Armado de Acta</h1>
                </div>
                <div>
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
                    <button
                        className="btn btn-danger"
                        onClick={() => setTableData([])}
                    >
                        Limpiar
                    </button>
                    <Link to={ROUTE + "/"} className="btn btn-danger">
                        Salir
                    </Link>
                </div>
            </div>
            {tableData.length > 0 ? (
                <table className="table table-striped">
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
                                {Object.values(rowData).map(
                                    (value, colIndex) => (
                                        <td key={colIndex}>{value}</td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No hay datos para mostrar.</div>
            )}
            <button
                className="btn btn-primary"
                onClick={() =>
                    ActasHelpers.ModalCerrarACta(tableData, NombreActa)
                }
            >
                Cerrar Acta
            </button>
        </div>
    );
};

export default ArmadoActaExcel;

import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, TextField } from "@mui/material";
import logoID from "../../img/logoID.png";
import { DataGrid } from "@mui/x-data-grid";
import { Columns, ColumnsDetail, style } from "./estructure";
import {buscarActasPorIdFN,buscarActasxFechasFN, generateExcelFile,handleRowClick} from "./helpers";
import { Toaster } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { ROUTE } from "../../Constantes";

const ExcelExportModule = () => {
    const [rows, setRows] = useState([]);
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [id, setid] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [open, setOpen] = useState(false);



    return (
        <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
            <Toaster />
            <AppBar
                position="static"
                color="default"
                style={{ backgroundColor: "white" }}
            >
                <Toolbar>
                    <Button
                        component={Link}
                        to={ROUTE + "/"}
                        variant="contained"
                        color="error"
                        style={{ marginRight: "10px" }}
                    >
                        Salir
                    </Button>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <img
                            src={logoID}
                            alt="Logo"
                            style={{ height: "40px", marginRight: "10px" }}
                        />
                        Descarga de Informacion
                    </Typography>
                    <TextField
                        label="Desde"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={desde}
                        onChange={(e) => setDesde(e.target.value)}
                        style={{ marginRight: "10px" }}
                    />
                    <TextField
                        label="Hasta"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={hasta}
                        onChange={(e) => setHasta(e.target.value)}
                        style={{ marginRight: "10px" }}
                    />
                    <Button
                        variant="contained"
                        onClick={() =>
                            buscarActasxFechasFN(
                                desde,
                                hasta,
                                setRows,
                                setLoading
                            )
                        }
                        style={{ marginRight: "10px" }}
                    >
                        Buscar Por Fechas
                    </Button>
                    <TextField
                        label="Buscar por ID de Acta"
                        type="text"
                        value={id}
                        onChange={(e) => setid(e.target.value)}
                        style={{ marginRight: "10px" }}
                    />
                    <Button
                        variant="contained"
                        onClick={() =>
                            buscarActasPorIdFN(id, setRows, setLoading)
                        }
                        style={{ marginRight: "10px" }}
                    >
                        Buscar ID
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => generateExcelFile(rows)}
                    >
                        Descargar Excel
                    </Button>
                </Toolbar>
            </AppBar>
            <div style={{ height: 700, width: "100%" }}>
                <DataGrid
                    hideFooter
                    rows={rows}
                    columns={Columns}
                    loading={loading}
                    onRowClick={(params) =>
                        handleRowClick(
                            params.row.id,
                            setid,
                            setSelectedRow,
                            setOpen
                        )
                    }
                />
            </div>

            <Modal
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Detalle del acta {id}
                    </Typography>
                    <Typography id="modal-modcodeal-description" sx={{ mt: 2 }}>
                        <div style={{ height: 400, width: "100%" }}>
                            <DataGrid
                                hideFooter
                                rows={selectedRow}
                                columns={ColumnsDetail}
                            />
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default ExcelExportModule;

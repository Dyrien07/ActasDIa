
import IconButton from "@mui/material/IconButton";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import { generarActaCompleta } from "./helpers";

export  const Columns = [
    {
        field: "id",
        headerName:"ID Acta",
        flex: 0.5,
    },
    {
        field: "Tipo_Acta",
        headerName: "Tipo de  Acta",
        width: "100",
        GridColDef: 1,
        flex: 1,
    },
    {
        field: "Nombre_Acta",
        headerName: "Nombre de Acta",
        width: "150",
        flex: 1,
    },
    {
        field: "Monto",
        headerName: "Monto",
        width: "100",
    },
    {
        field: "Periodo_Inventarial",
        headerName: "Periodo Inventarial",
        width: "150",
        flex: 0.8,
    },
    {
        field: "Estado",
        headerName: "Estado",
        width: "90",
        flex: 0.8,
        renderCell: (params) => {
            if (params.value === "Enviado") {
                return (
                    <IconButton color="error" size="small">
                        Pendiente Firma <CancelRoundedIcon />
                    </IconButton>
                );
            } else if (params.value === "Firmado") {
                return (
                    <IconButton color="success" size="small">
                        Firmado <CheckCircleIcon />
                    </IconButton>
                );
            } else if (params.value === "Rechazado") {
                return (
                    <IconButton color="secondary" size="small">
                        Rechazada <RemoveCircleIcon />
                    </IconButton>
                );
            }else if (params.value === "Pendiente Envio") {
                return (
                <IconButton color="warning" size="small">
                    Pendiente Envio <HourglassFullIcon /> 
                </IconButton>
                )
            }
        },
    },
    {
        field: "HDR",
        headerName: "Descargar Acta",
        width: "90",
        flex: 0.8,
        renderCell: (params)=>{
            if(params.value === true) {
                return (
                    <IconButton color="success" size="small">
                        <FileDownloadIcon onClick={()=>generarActaCompleta(params.id)}/>
                    </IconButton>
                )
            }else {
                return (
                    <IconButton color="danger" size="small">
                        <ContentPasteOffIcon/>
                    </IconButton>
                )
            }

        },
       
    },
    
];

export  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

   export const ColumnsDetail = [
    {
        field: "Debito_Tranportista",
        headerName: "Monto",
        flex: 1,
    },
    {
        field: "Bultos_Faltantes",
        headerName: "Bultos Faltantes",
        flex: 1,
    },
    {
        field: "Fecha",
        headerName: "Fecha",
        flex: 1,
    },
    {
        field: "Pedido",
        headerName: "Pedido",
        flex: 1,
    },
    {
        field: "Rectificacion",
        headerName: "Rectificacion",
        flex: 1,
    },
    {
        field: "Tienda",
        headerName: "Tienda",
        flex: 1,
    },
];
  
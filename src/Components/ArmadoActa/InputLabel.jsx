import { useEffect, useState } from "react";

const tableStyles = {
    tableStyle: { padding: 2, width: "80px" },
    inputStyle: { padding: 2, width: "150px" },
};
export const rowsDetails = [
    { text: "Tienda", propname: "tienda" },
    { text: "Rectificacion", propname: "rectificacion" },
    { text: "Pedido", propname: "pedido" },
    { text: "Fecha", propname: "fecha" },
    { text: "Bultos", propname: "bultos" },
    { text: "Resolución", propname: "resolucion" },
    { text: "Debito a transportista", propname: "debitoTransportista" },
    {text:"Acciones", propname: "acciones"}
];
export const InputHead = () => {
    return rowsDetails.map((row) => (
        <th style={tableStyles.tableStyle} scope="col">
            {row.text}
        </th>
    ));
};

export const InputLabel = ({
    prevState,
    propname,
    handleChange,
    label,
    value,
}) => {
    const changeInput = (e, propname) => {
        handleChange({
            ...prevState,
            [propname]: e.target.value,
        });
    };
    return (
        <td style={tableStyles.tableStyle}>
            <input
                style={tableStyles.inputStyle}
                type="text"
                placeholder={label}
                propname={propname}
                onChange={(e) => {
                    changeInput(e, propname);
                }}
                value={value}
            />
        </td>
    );
};

const TableDefinition = ({ dr, handleDelete }) => {
    return rowsDetails.map((rd) => {
        if(rd.propname === "acciones"){
            return <button onClick={()=>{handleDelete(dr.id)}}>BORRAR</button>
        }else{
            return <td>{dr[rd.propname]}</td>
        }
    });
};
export const DefinedRows = ({ definedRows, setCurrentRows }) => {
    const [rows, setRows] = useState(definedRows);
    const handleDelete = (id) => {
        const filtered = definedRows.filter(r => r.id !== id);
        console.log("ID A BORRAR: " + id);
        console.log(filtered);
        setCurrentRows(filtered);
    }
    useEffect(() => {
        setRows(definedRows);
    }, [definedRows]);
    return (
        <>
            {rows.map((dr) => {
                return (
                    <tr>
                        <TableDefinition handleDelete={handleDelete} id={dr.id} dr={dr} />
                    </tr>
                );
            })}
        </>
    );
};

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Swal from "sweetalert2";
import "./style.css";

import es from "date-fns/locale/es";
import { ConsultarActas } from "../EnvioActas/EnvioHelpers";
import moment from "moment";

const DateRangePickerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 8px;
    background-color: #fff; /* Color de fondo del contenedor */
`;

const Label = styled.label`
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: bold;
`;

const StyledDatePicker = styled(DatePicker)`
    font-size: 14px;
    padding: 8px;
    border: 2px solid #007bff; /* Borde del input */
    border-radius: 5px;
    outline: none;
    margin-bottom: 10px;
    margin-inline: 5px;
`;

const DateRangePicker = ({ setDatos }) => {
    const today = new Date();

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [estado, setEstado] = useState("Pendiente Envio");
    const [chkPendiente, setchkPendiente] = useState(true);
    const [chkEnviado, setchkEnviado] = useState(false);
    const [allActas, setallActas] = useState(false);
    const [rechazadas, setrechazadas] = useState(false);

    let fechaSQLDesde = moment(startDate).format("YYYY/MM/DD");
    let fechaSQLHasta = moment(endDate).format("YYYY/MM/DD");


    const onchangeActas = () => {
        if (allActas === false) {
            setallActas(true);
        }
        if (allActas === true) {
            setallActas(false);
        }
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    useEffect(() => {
        async function getData() {
            try {
                await ConsultarActas(
                    estado,
                    fechaSQLDesde.toString(),
                    fechaSQLHasta.toString(),
                    setDatos,
                    allActas
                );
            } catch (e) {
                Swal.fire({
                    title: "Hubo un error al consultar las Actas",
                    icon: "error",
                });
            }
        }
        getData();
    }, [estado, fechaSQLDesde, fechaSQLHasta, allActas, setDatos]);

    const onClickEnviado = (e) => {
        setEstado(e.target.value);
        setchkEnviado(true);
        setchkPendiente(false);
        setrechazadas(false)
    };
    const onClickPendiente = (e) => {
        setEstado(e.target.value);
        setchkEnviado(false);
        setchkPendiente(true);
        setrechazadas(false)
    };
    const onclickRecchazdo = (e) => {
        setEstado(e.target.value);
        setchkEnviado(false);
        setchkPendiente(false);
        setrechazadas(true);
        
    }

    return (
        <DateRangePickerWrapper>
            <div className="form-check form-switch mrg-5">
                <input
                    onChange={onchangeActas}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={allActas}
                />
                <label
                    className="form-check-label mrg-5"
                    htmlFor="flexSwitchCheckDefault"
                >
                    ver Todo
                </label>
            </div>
            <div className="form-check">
                <input
                    onChange={onClickEnviado}
                    className="form-check-input"
                    type="radio"
                    name="Enviado"
                    id="flexRadioDefault1"
                    checked={chkEnviado}
                    value={"Enviado"}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Enviado
                </label>
            </div>
            <div className="form-check mrg-10 ">
                <input
                    onChange={onClickPendiente}
                    className="form-check-input"
                    type="radio"
                    name="Pendiente Envio"
                    id="flexRadioDefault2"
                    checked={chkPendiente}
                    value={"Pendiente Envio"}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Pendiente
                </label>
                
            </div>
            <div className="form-check mrg-10 ">
                <input
                    onChange={onclickRecchazdo}
                    className="form-check-input"
                    type="radio"
                    name="Rechazadas"
                    id="flexRadioDefault2"
                    checked={rechazadas}
                    value={"Rechazado"}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Rechazadas
                </label>
                
            </div>
            <button
                type="button"
                onClick={() =>
                    ConsultarActas(
                        estado,
                        fechaSQLDesde,
                        fechaSQLHasta,
                        setDatos,
                        allActas
                    )
                }
                className="btn btn-primary "
            >
                Buscar
            </button>
            <Label>Desde:</Label>
            <StyledDatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona una fecha"
                locale={es}
            />
            <Label>Hasta:</Label>
            <StyledDatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona una fecha"
                locale={es}
            />
        </DateRangePickerWrapper>
    );
};

export default DateRangePicker;

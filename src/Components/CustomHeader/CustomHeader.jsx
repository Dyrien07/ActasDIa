import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const CustomHeader = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="d-grid gap-2 d-md-flex justify-content-md-start col center">
                    <Link type="button" to={"/"} className="btn btn-ligth">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-bar-left"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"
                            />
                        </svg>
                        Menu Principal
                    </Link>
                    <div className="col">
                    <h3>Actas ID-DIA</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomHeader;

import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import MenuPrincipal from "./Screens/MenuPrincipal/inex";
import ArmadoActaExel from "./Components/ArmadoActaExcel/ArmadoActaExel";
import EnvioActas from "./Components/EnvioActas/EnvioActas";
import ActasRechazadas from "./Components/ActasRechazadas/ActasRechazadas";
import { ROUTE } from "./Constantes";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                  <Route path={ ROUTE +"/" } element={<MenuPrincipal/>}/>
                    <Route path={ ROUTE+"/armadoacta"} element={<ArmadoActaExel />} />
                    <Route path={ ROUTE +"/envioacta"} element={<EnvioActas />} />
                    <Route path={ ROUTE+"/ControlActas"} element={<ActasRechazadas/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

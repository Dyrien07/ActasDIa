import { BrowserRouter, Route,Routes } from "react-router-dom";
import "./App.css";
import MenuPrincipal from "./Screens/MenuPrincipal/inex";
import ArmadoActaExel from "./Components/ArmadoActaExcel/ArmadoActaExel";
import EnvioActas from "./Components/EnvioActas/EnvioActas";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<MenuPrincipal/>}/>
                    <Route path="/armadoacta" element={<ArmadoActaExel />} />
                    <Route path="/envioacta" element={<EnvioActas />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

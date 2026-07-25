import { useState } from "react";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Agenda from "./pages/Agenda";
import Clientes from "./pages/Clientes";
import Proyectos from "./pages/Proyectos";
import Tareas from "./pages/Tareas";
import Archivos from "./pages/Archivos";

import Pagos from "./pages/Pagos";
import Gastos from "./pages/Gastos";
import PagosPersonal from "./pages/PagosPersonal";
import Bancos from "./pages/Bancos";
import Financiamientos from "./pages/Financiamientos";
import Servicios from "./pages/Servicios";
import Reportes from "./pages/Reportes";

import "./App.css";

function App() {
  const [pagina, setPagina] = useState("dashboard");

  return (
    <div className="app-layout">
      <Navbar setPagina={setPagina} />

      <div className="content">
        {pagina === "dashboard" && <Dashboard />}

        {pagina === "agenda" && <Agenda />}

        {pagina === "clientes" && <Clientes />}

        {pagina === "proyectos" && <Proyectos />}

        {pagina === "tareas" && <Tareas />}

        {pagina === "archivos" && <Archivos />}

        {pagina === "pagos" && <Pagos />}

        {pagina === "gastos" && <Gastos />}

        {pagina === "pagosPersonal" && (
          <PagosPersonal />
        )}

        {pagina === "bancos" && <Bancos />}

        {pagina === "financiamientos" && (
          <Financiamientos />
        )}

        {pagina === "servicios" && (
          <Servicios />
        )}

        {pagina === "reportes" && <Reportes />}
      </div>
    </div>
  );
}

export default App;
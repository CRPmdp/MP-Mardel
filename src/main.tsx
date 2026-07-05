// ==========================================
// 1. LIBRERÍAS EXTERNAS (node_modules)
// ==========================================
import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";

// ==========================================
// 2. ESTILOS GLOBALES
// ==========================================
import "./index.css";

// ==========================================
// 3. ESTRUCTURA Y RUTAS BASE
// ==========================================
import Root from "./routes/Root";
import App from "./App";

// ==========================================
// 4. MAIN PÁGINAS (En PascalCase)
// ==========================================
// Bloque Denuncias
import DenunciaForm from "./features/denuncias/DenunciaForm/DenunciaForm";
import Denuncias from "./features/denuncias/Denuncias";

// Bloque Reportes
import Reportes from "./features/reportes/Reportes";
import CuartoReporte from "./features/reportes/CuartoReporte";
import QuintoReporte from "./features/reportes/QuintoReporte";
import SextoReporte from "./features/reportes/SextoReporte";

// Bloque Investigaciones
import Investigaciones from "./features/investigaciones/Investigaciones";
import TodasInvestigaciones from "./features/investigaciones/TodasInvest/TodasInvestigaciones";
import Investigacion from "./features/investigaciones/Investigacion/Investigacion";
import Autorxs from "./features/investigaciones/Autorxs/Autorxs";
import FichaAutorxs from "./features/investigaciones/Autorxs/FichaAutorxs";

// Bloque Recursos
import Recursos from "./features/recursero/Recursero";
import Recurso from "./features/recursero/Recursos/Recursos";
import Organizate from "./features/recursero/Recursos/Organizate";

// Bloque Institucional y Otros
import Nosotrxs from "./components/Nosotrxs/Nosotrxs";
import Menu from "./components/Menu/Menu";
import GatilloFacil from "./features/gatilloFacil/GatilloFacil";
import Ficha from "./features/gatilloFacil/Fichas/Ficha";

// ==========================================
// CONFIGURACIÓN DE ENRUTAMIENTO (HashRouter)
// ==========================================
const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <App /> },
      { path: "/denuncias", element: <Denuncias /> },
      { path: "/form-denuncia", element: <DenunciaForm /> },
      { path: "/recursos", element: <Recursos /> },
      { path: "/nosotrxs", element: <Nosotrxs /> },
      { path: "/menu", element: <Menu /> },
      { path: "/gatillo-facil", element: <GatilloFacil /> },
      { path: "/recursos/:dominio", element: <Recurso /> },
      { path: "/:enlaceVer", element: <FichaAutorxs /> },
      { path: "/ficha/:Contador", element: <Ficha /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
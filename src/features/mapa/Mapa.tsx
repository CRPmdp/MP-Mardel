import styles from "./Mapa.module.css";
import { useEffect, useState } from "react";
import MapGL from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { REGIONES_CONFIG } from "../../constants/regiones";
import LogoMapa from "../../components/LogoMapa/LogoMapa";

import { limpiarCapasBase } from "./mapaUtils"; 
import Filtros, { EstadoFiltros } from "./Filtros/Filtros";
import SelectionOverview from "./SelectionOverview/SelectionOverview";

import DependenciasMarkers from "./Markers/DependenciasMarkers";
import GatilloMarkers from "./Markers/GatilloMarkers";
import ReportesMarkers from "./Markers/ReportesMarkers";

// IMPORTANTE: Importamos las funciones optimizadas desde nuestro servicio centralizado
import {
  getDataDeCasosDependencias,
  getDataDeCasosGatillo,
  getDataDeCasosReportes,
} from "../../services/fetching"; 

const Mapa = () => {
  // Estado que controla qué ciudad está activa en la visualización
  const [ciudadActiva, setCiudadActiva] = useState<string>("mar-del-plata");
  
  // Estados independientes para almacenar las colecciones de datos GeoJSON Geo-referenciados
  const [dependencias, setDependencias] = useState<any>(null);
  const [gatillos, setGatillos] = useState<any>(null);
  const [reportes, setReportes] = useState<any>(null);

  // Filtros de visibilidad por capas (Activos por defecto)
  const [filtros, setFiltros] = useState<EstadoFiltros>({
    dependencias: true,
    reportes: true,
    gatillo: true,
  });

  // Estados para gestionar la selección e interactividad con los marcadores del mapa
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  //
  const handleToggleFilter = (capa: keyof EstadoFiltros) => {
    setFiltros((prev) => ({
      ...prev,
      [capa]: !prev[capa],
    }));
  };

  // Obtenemos las coordenadas de inicio, zoom y límites del mapa según la región activa
  const configActual = REGIONES_CONFIG[ciudadActiva] || REGIONES_CONFIG["mar-del-plata"];

  if (!configActual) {
    return null; 
  }

  // useEffect reactivo: Se dispara cada vez que cambia "ciudadActiva"
  useEffect(() => {
    let isMounted = true;

    const cargarDatosDeCiudad = async () => {
      try {
        // 1. Limpiamos estados anteriores para evitar que se muestren pines viejos en la nueva ubicación
        setDependencias(null);
        setGatillos(null);
        setReportes(null);
        setSelectedMarkerId(null);
        setSelectedCase(null);

        // 2. Realizamos los fetches concurrentes en paralelo con Promise.all (Mucho más rápido)
        const [dataDeps, dataGatillos, dataReportes] = await Promise.all([
          getDataDeCasosDependencias(ciudadActiva),
          getDataDeCasosGatillo(ciudadActiva),
          getDataDeCasosReportes(ciudadActiva),
        ]);

        // 3. Si el componente sigue montado, actualizamos el estado global de capas
        if (isMounted) {
          setDependencias(dataDeps);
          setGatillos(dataGatillos);
          setReportes(dataReportes);
        }
      } catch (error) {
        console.error(`Error al cargar capas de datos para la región: ${ciudadActiva}`, error);
      }
    };

    cargarDatosDeCiudad();

    // Función de limpieza para prevenir race-conditions si el usuario cambia rápido de ciudad
    return () => {
      isMounted = false;
    };
  }, [ciudadActiva]);

  return (
    <section className={styles.mapaContainer}>
     
      
       {/* Selector de Ciudades para activar el dinamismo 
      <div className={styles.selectorCiudadContainer}>
        <select 
          className={styles.selectorCiudad}
          value={ciudadActiva} 
          onChange={(e) => setCiudadActiva(e.target.value)}
        >
          <option value="mar-del-plata">Mar del Plata</option>
          <option value="caba">CABA</option>
        </select>
      </div>*/}

       <LogoMapa nombreCiudad={configActual.nombre} ocultarEnMobile={true} />

      {/* Componente de Filtros de Capas */}
      <Filtros filtros={filtros} onToggleFilter={handleToggleFilter} />

      {/* Panel informativo lateral del caso seleccionado */}
      <SelectionOverview 
        caso={selectedCase} 
        onClose={() => {
          setSelectedCase(null);       // Limpiamos el caso activo
          setSelectedMarkerId(null);   // Y despintamos el pin seleccionado del mapa
        }} 
      />

      {/* Contenedor del Mapa MapLibreGL */}
      <MapGL
        key={ciudadActiva} // CRUCIAL: Forzar la recreación/re-renderizado limpio del canvas al cambiar de ciudad
        id="mapa"
        mapLib={maplibregl}
        initialViewState={{
          longitude: configActual.longitude,
          latitude: configActual.latitude,
          zoom: configActual.zoom,
        }}
        minZoom={configActual.minZoom}
        maxBounds={configActual.maxBounds}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=11519e9b-8a23-4b00-9cfc-82a2447d6be7"
        onLoad={(e) => limpiarCapasBase(e.target)}
      >
        
        {/* Renderizado condicional de marcadores según datos cargados y filtros activos */}
        {dependencias && filtros.dependencias && (
          <DependenciasMarkers
            dependencias={dependencias}
            setSelectedCase={setSelectedCase}
            setMarker={setSelectedMarkerId}
            selected={selectedMarkerId}
          />
        )}

        {gatillos && filtros.gatillo && (
          <GatilloMarkers
            gatillos={gatillos}
            setSelectedCase={setSelectedCase}
            setMarker={setSelectedMarkerId}
            selected={selectedMarkerId}
          />
        )}

        {reportes && filtros.reportes && (
          <ReportesMarkers
            dataDeReportes={reportes}
            setSelectedCase={setSelectedCase}
            setMarker={setSelectedMarkerId}
            selected={selectedMarkerId}
          />
        )}

      </MapGL>
    </section>
  );
};

export default Mapa;
import type {
  CasoDependencia,
  CasoGatillo,
  CasoReportes,
  DataDeCasos,
} from "../models/casos";
import type { Cargo } from "../models/cargos";
import type { Autor } from "../models/autorxs";
import type { Investigacion } from "../models/investigacion";

// Capturamos el BASE_URL de Vite para asegurar compatibilidad con GitHub Pages
const BASE_URL = import.meta.env.BASE_URL || "/";

/**
 * Función auxiliar para construir URLs absolutas correctas dentro de la carpeta public
 */
const getFullUrl = (path: string): string => {
  const cleanBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const getCargos = async (): Promise<Cargo[] | null> => {
  const response = await fetch(getFullUrl("data/cargos.json"));
  const data: Cargo[] | undefined = await response.json();
  return data ?? null;
};

/**
 * Obtiene las dependencias/comisarías de una ciudad específica.
 * Soporta tanto la estructura de carpetas (data/caba/dependencias.json) 
 * como la de archivos planos con sufijo (data/dependencias-caba.json).
 */
export const getDataDeCasosDependencias = async (
  ciudad: string = "mar-del-plata"
): Promise<DataDeCasos<CasoDependencia> | null> => {
  try {
    // Opción A: Estructura organizada por carpetas de ciudad
    const response = await fetch(getFullUrl(`data/${ciudad}/dependencias.json`));
    
    if (!response.ok) {
      // Opción B (Fallback): Estructura plana con sufijo de ciudad en el nombre del archivo
      const fallbackResponse = await fetch(getFullUrl(`data/dependencias-${ciudad}.json`));
      if (!fallbackResponse.ok) return null;
      return await fallbackResponse.json();
    }
    
    const data: DataDeCasos<CasoDependencia> | undefined = await response.json();
    return data ?? null;
  } catch (error) {
    console.error(`Error fetching dependencias para ${ciudad}:`, error);
    return null;
  }
};

/**
 * Obtiene los reportes comunitarios de una ciudad específica.
 */
export const getDataDeCasosReportes = async (
  ciudad: string = "mar-del-plata"
): Promise<DataDeCasos<CasoReportes> | null> => {
  try {
    const response = await fetch(getFullUrl(`data/${ciudad}/reportes.json`));
    
    if (!response.ok) {
      const fallbackResponse = await fetch(getFullUrl(`data/reportes-${ciudad}.json`));
      if (!fallbackResponse.ok) return null;
      return await fallbackResponse.json();
    }
    
    const data: DataDeCasos<CasoReportes> | undefined = await response.json();
    return data ?? null;
  } catch (error) {
    console.error(`Error fetching reportes para ${ciudad}:`, error);
    return null;
  }
};

/**
 * Obtiene los casos de gatillo fácil de una ciudad específica.
 */
export const getDataDeCasosGatillo = async (
  ciudad: string = "mar-del-plata"
): Promise<DataDeCasos<CasoGatillo> | null> => {
  try {
    const response = await fetch(getFullUrl(`data/${ciudad}/gatillo-facil.json`));
    
    if (!response.ok) {
      const fallbackResponse = await fetch(getFullUrl(`data/gatillo-facil.json`));
      if (!fallbackResponse.ok) return null;
      return await fallbackResponse.json();
    }
    
    const data: DataDeCasos<CasoGatillo> | undefined = await response.json();
    return data ?? null;
  } catch (error) {
    console.error(`Error fetching gatillo para ${ciudad}:`, error);
    return null;
  }
};

export const fetchAutor = async (enlaceVer: string): Promise<Autor | null> => {
  const response = await fetch(getFullUrl("data/autorxs.json"));
  const data: Autor[] = await response.json();
  // Buscar el autor por el enlaceVer
  return data.find((autor) => autor.enlaceVer === `/${enlaceVer}`) ?? null;
};

export const fetchAutorxs = async (): Promise<Autor[] | null> => {
  const response = await fetch(getFullUrl("data/autorxs.json"));
  const data: Autor[] = await response.json();
  return data;
};

export const fetchInvestigaciones = async (): Promise<Investigacion[] | null> => {
  const response = await fetch(getFullUrl("data/investigaciones.json"));
  const data: Investigacion[] = await response.json();
  return data;
};
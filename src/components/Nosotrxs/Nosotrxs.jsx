import styles from "./Nosotrxs.module.css";
import Logos from "../Logos/Logos";
import { FaInstagram, FaTwitter, FaTelegramPlane } from "react-icons/fa";

const listaDeLogos = [
  {
    image: "https://static.wixstatic.com/media/0f4ca0_398fde56198244a296fa90ac1d6590f9~mv2.png/v1/fill/w_456,h_456,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/CORREPI.png",
    link: "https://www.correpi.org/",
    name: "correpi",
  },
];

const Nosotrxs = () => {
  return (
    <section className={styles.nosotrxsContainer}>
      
      {/* 1. TÍTULOS GRANDES Y CENTRADOS */}
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>MAPA DE LA POLICÍA</h1>
        <h3 className={styles.subTitle}>
          Red de cuidados ciudadanos contra la violencia policial
        </h3>
      </header>

      {/* 2. DESCRIPCIÓN (TEXTO LIMPIO) */}
      <article className={styles.bajadaContainer}>
        <p className={styles.bajada}>
          El Mapa de la Policía es una herramienta de cuidados ciudadanos para
          contrarrestar la violencia policial. En un contexto de creciente
          deterioro social y de un avance represivo que amenaza los consensos
          democráticos, el Mapa apuesta a la organization desde abajo para
          denunciar y combatir la crueldad. Nuestra iniciativa parte de una
          intuición clave: democratizar la información y asumir el compromiso
          de dar testimonio es hoy un arma fundamental para enfrentar la
          opacidad de los poderes. Somos una red de personas y organizaciones
          que queremos construir estrategias novedosas de lucha por los
          derechos humanos.
        </p>
      </article>

      {/* 3. REDES SOCIALES */}
      <section className={styles.redesContainer}>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer" className={styles.socialCircle} title="Instagram">
          <FaInstagram />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer" className={styles.socialCircle} title="Twitter">
          <FaTwitter />
        </a>
        <a href="https://t.me/" target="_blank" rel="noreferrer" className={styles.socialCircle} title="Telegram Bot">
          <FaTelegramPlane />
        </a>
      </section>

      {/* 4. ORGANIZACIONES (AHORA EN CÍRCULOS ABAJO DE LAS REDES) */}
      <section className={styles.organizacionesContainer}>
        <div className={styles.logosCircularesWrapper}>
          <Logos logos={listaDeLogos} />
        </div>
      </section>

      {/* 5. CIERRE SUTIL */}
      <footer className={styles.footer}>
        <h4 className={styles.develop}>DESARROLLADA X EDIPO</h4>
      </footer>

    </section>
  );
};

export default Nosotrxs;
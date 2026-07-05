import { Link } from "react-router-dom";
import styles from "./Denuncias.module.css";
import Icons from "../../components/Iconos/Icons";
import Mapa from "../mapa/Mapa";

const Denuncias = () => {
  return (
    <>
      <section className={styles.denunciasContainer}>
        <section className={styles.denuncias}>
          <section className={styles.titleContainer}>
            <div>
              <h2 className={styles.title}>
                QUIERO <br />
                DENUNCIAR
              </h2>
              <h4 className={styles.subTitle}>
                Un hecho de violencia policial <br /> como víctima o testigo
              </h4>
            </div>
            <Icons
              icon={"denuncias"}
              className={styles.headerIcon}
              iconSize="4rem"
            />

            <Link to="/form-denuncia">
              <h4 className={styles.button}>Ir</h4>
            </Link>
          </section>

          <section className={styles.menuContainer}>
            <section className={styles.menu}>
              <h4 className={styles.buttonContainer}>
                El objetivo de este registro es visibilizar el abuso policial,
                para fortalecer las redes de cuidado ciudadano. Pero no implica
                automáticamente ninguna presentación institucional. <br /> En el
                caso de que quieras hacer una denuncia legal luego de llenar
                este formulario, podemos recomendarte cómo proceder. <br />{" "}
                <br />
                Te pedimos información de contacto, para verificar los hechos.
                Por eso nos vamos a comunicar con vos, por el canal que elijas.
                Si querés, podés mantener el anonimato. Y solo publicaremos la
                fuente, en el caso de que vos nos autorices.
              </h4>
            </section>
          </section>
        </section>
      </section>
      <Mapa className={styles.mapa} />
    </>
  );
};

export default Denuncias;

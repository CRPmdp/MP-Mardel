import { Link } from "react-router-dom";

import Icons from "../Iconos/Icons";
import styles from "./Menu.module.css";

const menuItems = [
  { path: "/", icon: "mapa" },
  { path: "/denuncias", icon: "denuncias" },
  { path: "/recursos", icon: "recursos" },
  { path: "/reportes", icon: "Reportes", },
  { path: "/gatillo-facil", icon: "Gatillo" },
  { path: "/nosotrxs", icon: "contacto" },
];

const Menu = () => {
  return (
 
    <section className={styles.menuContainer}>
      <section className={styles.menu}>
        {menuItems.map((menuItem, index) => (
          <Link key={index} to={menuItem.path}>
            <Icons
              icon={menuItem.icon}
              className={styles.icon}
              iconSize="3rem"
            />
            <h5 className={styles.iconName}>{menuItem.icon}</h5>
          </Link>
        ))}
      </section>
    </section>
   
  );
};

export default Menu;

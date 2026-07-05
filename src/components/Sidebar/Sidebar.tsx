import { Link } from "react-router-dom";

import Icons from "../Iconos/Icons";
import styles from "./Sidebar.module.css";

const menuItems = [
  { path: "/", icon: "mapa" },
  { path: "/denuncias", icon: "denuncias" },
  { path: "/recursos", icon: "recursos" },
  { path: "/gatillo-facil", icon: "Gatillo" },
  { path: "/menu", icon: "menu" },
];


const Sidebar = () => {
  return (
    <section id="Sidebar" className={styles.Sidebar}>
      {menuItems.map((menuItem, index) => (
                <Link key={index} to={menuItem.path}>
                  <Icons
                    icon={menuItem.icon}
                    className={styles.icon}
                    iconSize="2rem"
                  />
                </Link>
              ))}
    </section>
  );
};



export default Sidebar;

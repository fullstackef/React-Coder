import CartWidget from "../CartWidget/CartWidget";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { motion } from "framer-motion";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg d-flex justify-content-around sticky-top">
      <Link to="/" className="navbar-brand fw-bold">
        <motion.div animate={{ scale: [null, 1.2, 1] }}>
          TOYOTA
          <img className={styles.nav_logo} src="/toyo.png"></img>
        </motion.div>
      </Link>
      <ul className="navbar-nav">
        <li className={styles.nav_item}>
          <NavLink to="/category/Autos" className="nav-link">
            Autos
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to="/category/Camionetas" className="nav-link">
            Camionetas
          </NavLink>
        </li>
        <li className={styles.nav_item}>
          <NavLink to="/category/SUV" className="nav-link">
            SUV
          </NavLink>
        </li>
      </ul>
      <div>
        <CartWidget />
      </div>
    </nav>
  );
};

export default NavBar;

import { NavLink } from "react-router-dom";
import image from "../../images";
const styles = require("./navBar.module.css").default;

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <NavLink to={"/"} className={() => styles.navLink}>
          <div className={styles.welcome}>
            <img src={image.logoDog2} alt="No Found" />
            <h2>Dogs App</h2>
          </div>
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <ul>
          <NavLink to={"/home"} className={() => styles.navLink}>
            <li>Home </li>
          </NavLink>

          <NavLink to={"/Create"} className={() => styles.navLink}>
            <li>Create Dog</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

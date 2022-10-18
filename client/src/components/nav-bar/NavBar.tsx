import { NavLink } from "react-router-dom";
const styles = require('./navBar.module.css').default

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2><NavLink to={'/'} className={()=>styles.navLink}>
            Dogs App
        </NavLink></h2>
      </div>
      <nav className={styles.nav}>
        <ul>
            <NavLink to={'/home'} className={()=>styles.navLink}>
                <li>Home </li>   
            </NavLink>

            <NavLink to={'/Create'} className={()=>styles.navLink}>
                <li>Create Dog</li>    
            </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

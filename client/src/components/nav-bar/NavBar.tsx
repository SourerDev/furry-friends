import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div>
        <h2><NavLink to={'/'}>
            Dogs App
        </NavLink></h2>
      </div>
      <nav>
        <ul>
            <li><NavLink to={'/home'}>
                Home    
            </NavLink></li>

            <li><NavLink to={'/Create'}>
                Create Dog    
            </NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

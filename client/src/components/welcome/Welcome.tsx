import image from "../../images";
import { NavLink } from "react-router-dom";
const styles = require("./welcome.module.css").default;

const Welcome = () => {
  const onClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    window.location.href = "/home";
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.image}>
          <img src={image.logoDog} alt="never" />

        </div>
        <NavLink to={'home'}>
        <div className={styles.containerButton}>
          <button className={styles.button}>
            <span></span>
            <span></span>
            <span></span>
            <span></span> Enter
          </button>
        </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Welcome;

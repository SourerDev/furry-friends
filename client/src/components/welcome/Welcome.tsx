import image from "../../images";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../redux";
const styles = require("./welcome.module.css").default;

const Welcome = () => {
  const onClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    window.location.href = "/home";
  };
  const {allDogs} = useSelector((state:State)=>state.dogs)

  const loader = (<div className={styles.containerLoader}>
    <div className={styles.loader}>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
      <div className={styles.loaderSquare}></div>
    </div>
  </div>)

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.image}>
          <img src={image.logoDog} alt="never" />
        </div>
        <NavLink to={"home"}>
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
      {allDogs && allDogs?.length ? '' : loader}
    </div>
  );
};

export default Welcome;

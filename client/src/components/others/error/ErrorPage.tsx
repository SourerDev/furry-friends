import { NavLink } from "react-router-dom";
import image from "../../../images";

const styles = require("./Errorpage.module.css").default;
const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <NavLink to={"/home"}>
          <button className={styles.cta}>
            <span className={styles.hoverunderlineanimation}>
              {" "}
              Inital Page{" "}
            </span>

            <svg
              viewBox="0 0 46 16"
              height="10"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
              id="arrow-horizontal"
            >
              <path
                transform="translate(30)"
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                data-name="Path 10"
                id="Path_10"
              ></path>
            </svg>
          </button>
        </NavLink>
      </div>
      <div className={styles.error}>
        <h1>4</h1>
        <img src={image.error} alt="0" />
        <h1>4</h1>
      </div>
      <p>Error! Page NOT Found</p>
      <div className={styles.shadow}></div>
    </div>
  );
};

export default ErrorPage;

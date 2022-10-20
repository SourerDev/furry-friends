import { NavLink } from "react-router-dom";
import { Dogs } from "../../interfaces/interfaces";
const styles = require("./Dogcard.module.css").default;

const DogCard = (props: Dogs) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={props.image} alt={props.name} />
      </div>

      <div className={styles.description}>
        <div style={{}}>
          <h3 className={styles.name}>San Carlo</h3>
        </div>
        <div style={{ textAlign: "left", display: "flex" ,flexDirection:'column',justifyContent:'center',}}>
          <p className={styles.weight}>Weight: 12 - 12 cm</p>
          <p className={styles.temp}>Temperaments: canson, odioso</p>
        </div>
      </div>
    </div>
  );
};

export default DogCard;

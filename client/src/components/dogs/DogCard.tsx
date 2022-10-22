import { NavLink } from "react-router-dom";
import { Dogs } from "../../interfaces/interfaces";
const styles = require("./Dogcard.module.css").default;

const DogCard = (props: Dogs) => {



  const route = (<div className={styles.image}>
    <img src={props.image} alt={props.name} />
  </div>)


  return(<div className={styles.card}>
    
    {props.id === 'null'? route: <NavLink to={`/dog/${props.id}`}>{route}</NavLink>}

    <div className={styles.description}>
      <div style={{}}>
        <h3 className={styles.name}>{props.name}</h3>
      </div>
      <div style={{ textAlign: "left", display: "flex" ,flexDirection:'column',justifyContent:'center',}}>
        <p className={styles.weight}>{`Weight: ${props.weight}`}</p>
        <p className={styles.temp}>{`Temperaments: ${props.temperaments.join(', ')}`}</p>
      </div>
    </div>
  </div>) 
};

export default DogCard;

import { Dogs } from "../../interfaces/interfaces";
const styles = require('./Dogcard.module.css').default

const DogCard = (props: Dogs) => {
  return (
    <div className={styles.card}>
    
      <div className={styles.image}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={styles.attributes}>
        <h1>{props.name}</h1>

      </div>

    </div>
  );
};

export default DogCard;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../redux";

import DogCard from "../dogs/DogCard";
import image from "../../images";
import { FormState } from "../../interfaces/interfaces";
import { validations, divTime, temperamentsSelected } from "../../utils";
import { dogsApi } from "../../services/index";
import { bindActionCreators } from "redux";
const styles = require("./create.module.css").default;


const Create = () => {
  const dispatch = useDispatch();
  const {getAllDogs} = bindActionCreators(actionCreators,dispatch);

  const { temperaments } = useSelector((state: State) => state.temperament);

  const [state, setState] = useState<FormState>({
    name: "",
    height: "",
    weight: "",
    life: "",
    image: "",
    temperament: "",
    temperaments: [],
  });
  const [error, setError] = useState({
    name: "",
    height: "",
    weight: "",
    life: "",
    image: "",
    temperaments: "",
    post: "",
  });
  const [post, setPost] = useState({
    msg: "Added With Errors",
    img: true,
  });

  const changeState = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    let newValue = value.trimStart();
    const validateEntry = validations.validationInputs(name, newValue);

    if (!validateEntry.res)
      setError((previus) => {
        return {
          ...previus,
          [name]: validateEntry.msg,
        };
      });
    else
      setError((previus) => {
        return {
          ...previus,
          [name]: "",
        };
      });
    setState((previus) => {
      return {
        ...previus,
        [name]: newValue,
      };
    });
  };

  const changeStateTemperament = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>  
  ) => {
    evt.preventDefault();
      let temp: number = 0;

      temperaments?.forEach((element) => {
        if (state.temperament.toLowerCase() === element.name.toLowerCase())
          temp = element.id;
      });

      if (temp && !state.temperaments?.find((element) => element === temp)) {
        setState((previus) => {
          return {
            ...previus,
            temperament: "",
            temperaments: [...previus.temperaments, temp],
          };
        });
      }
    
  };

  const submit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!state.name || !state.height || !state.weight)
      return setError((previus) => {
        return { ...previus, post: "Fields not entered correctly" };
      });
    else
      setError((previus) => {
        return { ...previus, post: "" };
      });

    dogsApi
      .postDog({...state, life_span: state.life + ' years'})
      .then((response) => {
        if (response.data.msg) {
          setPost((previus) => {
            return { ...previus, msg: response.data.msg };
          });
        } else {
          setPost((previus) => {
            return { ...previus, img: false };
          });
        }

        divTime("msgSuccess", styles.msgSuccess, styles.noSee, 3000);
        setState(previus=>{
          return{
            ...previus,
            name: "",
            height: "",
            weight: "",
            life: "",
            image: "",
            temperament: "",
            temperaments: [],
          }
        })

        getAllDogs()

      })
      .catch((error) => {
        const msg = error?.response?.data?.msg
        if (msg) {
          setPost((previus) => {
            return { ...previus, img: false ,msg:msg };
          });
          divTime("msgSuccess", styles.msgSuccess, styles.noSee, 4000);
        }
        
      });
  };

  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
      </div>

      <div className={styles.containerForm}>
        <form onSubmit={submit} className={styles.form}>

          <div className={styles.inputGroup}>
          <input
              type="value"
              required={false}
              id="name"
              name="name"
              value={state.name}
              onChange={changeState}
              autoComplete='off'
              className={styles.input}
            />
            <label htmlFor="name" className={state.name? styles.noSee: styles.label}>Name</label>
            <span className={styles.error}>{error.name}</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              id="height"
              name="height"
              value={state.height}
              onChange={changeState}
              autoComplete="off"
              className={styles.input}
            />
            <label htmlFor="height" className={state.height? styles.noSee: styles.label}>Height</label>
            <span className={styles.error}>{error.height}</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              id="weight"
              name="weight"
              value={state.weight}
              onChange={changeState}
              autoComplete='off'
              className={styles.input}
            />
            <label htmlFor="weight" className={state.weight ? styles.noSee: styles.label}>Weight</label>
            <span className={styles.error}>{error.weight}</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              id="life"
              name="life"
              value={state.life}
              onChange={changeState}
              autoComplete='off'
              className={styles.input}
            />
            <label htmlFor="life" className={state.life ? styles.noSee: styles.label}>Life Span</label>
            <span className={styles.error}>{error.life}</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              id="image"
              name="image"
              value={state.image}
              onChange={changeState}
              autoComplete='off'
              className={styles.input}
            />
            <label htmlFor="image" className={state.image? styles.noSee: styles.label}>Image</label>
            <span className={styles.error}>{error.image}</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              id="temperament"
              list="temperaments"
              name="temperament"
              value={state.temperament}
              onChange={changeState}
              // onKeyDown={changeStateTemperament}
              className={styles.input}
              autoComplete='off'
            />
            <label htmlFor="temperament" className={state.temperament ? styles.noSee : styles.label}>Temperament</label>

            <datalist id="temperaments">
              {temperaments?.length ? (
                temperaments.map((element, i) => (
                  <option key={i} value={element.name} />
                ))
              ) : (
                <option value={"No Temperaments"} />
              )}
            </datalist>
            <button  onClick={changeStateTemperament} className={styles.add}>
                Add
            </button>
          </div>

          <div className={styles.containerCreate}>
            <span className={styles.error +' '+ styles.post}>{error.post}</span>
            <button className={styles.button}
              type="submit"
              disabled={
                error.name ||
                error.height ||
                error.weight ||
                error.life ||
                error.temperaments
                  ? true
                  : false
              }
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <div className={styles.dogcard}>
              <DogCard
                id={'null'}
                name={state.name}
                image={state.image}
                temperaments={temperaments?.length && state.temperaments.length ? temperamentsSelected(temperaments,state.temperaments): ['']}
                weight={state.weight}
              />
      </div>
      <div className={styles.noSee} id="msgSuccess">
        <img src={post.img ? image.success : image.warning} alt="No Found" />
        <span>{post.msg}</span>
      </div>
    </div>
  );
};

export default Create;

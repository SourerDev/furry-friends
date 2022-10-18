import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../redux";

import image from "../../images";
import { FormState } from "../../interfaces/interfaces";
import { validations, divTime } from "../../utils";
import { dogsApi } from "../../services/index";
const styles = require("./create.module.css").default;

const Create = () => {
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
    evt: React.KeyboardEvent<HTMLInputElement>
  ) => {
    evt.preventDefault();
    const { keyCode } = evt;

    if (keyCode === 13) {
      console.log("enter");
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
      .postDog(state)
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
      })
      .catch((error) => {
        const msg = error?.response?.data?.msg
        if (msg) {
          setPost((previus) => {
            return { ...previus, img: false ,msg:msg };
          });
          divTime("msgSuccess", styles.msgSuccess, styles.noSee, 4000);
        }
        console.log(error.message);
      });
  };
  return (
    <div>
      <div>
        <h1>Create Dog</h1>
      </div>

      <div>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={state.name}
              onChange={changeState}
              placeholder={"ex: Affenpinscher"}
            />
            <span>{error.name}</span>
          </div>

          <div>
            <label htmlFor="height">Height</label>
            <input
              type="text"
              id="height"
              name="height"
              value={state.height}
              onChange={changeState}
              placeholder="ex: 23 - 29"
            />
            <span>{error.height}</span>
          </div>

          <div>
            <label htmlFor="weight">Weight</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={state.weight}
              onChange={changeState}
              placeholder="ex: 3 - 6"
            />
            <span>{error.weight}</span>
          </div>
          <div>
            <label htmlFor="life">Life Span</label>
            <input
              type="text"
              id="life"
              name="life"
              value={state.life}
              onChange={changeState}
              placeholder={"ex: 10 - 12"}
            />
            <span>{error.life}</span>
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              type="text"
              id="image"
              name="image"
              value={state.image}
              onChange={changeState}
            />
            <span>Error</span>
          </div>
          <div>
            <label htmlFor="temperament">Temperament</label>
            <input
              id="temperament"
              list="temperaments"
              name="temperament"
              value={state.temperament}
              onKeyDown={changeStateTemperament}
              onChange={changeState}
            />

            <datalist id="temperaments">
              {temperaments?.length ? (
                temperaments.map((element, i) => (
                  <option key={i} value={element.name} />
                ))
              ) : (
                <option value={"No Temperaments"} />
              )}
            </datalist>
          </div>

          <div>
            <span>{error.post}</span>
            <button
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
      <div></div>
      <div className={styles.noSee} id="msgSuccess">
        <img src={post.img ? image.success : image.warning} alt="No Found" />
        <span>{post.msg}</span>
      </div>
    </div>
  );
};

export default Create;

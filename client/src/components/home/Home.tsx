import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux";
import DogCard from "../dogs/DogCard";
import { dogsApi } from "../../services/index";
import { divTime, orderBy, filter} from "../../utils";
import Loading from "../others/loading/Loading";

const styles = require("./Home.module.css").default;

const Home = () => {
  const dispatch = useDispatch();
  const { setPage, setDogs } = bindActionCreators(actionCreators, dispatch);
  const [state, setState] = useState({
    search: "",
    temperament: "",
    existing: false,
  });
  const { Dogs, allDogs } = useSelector((state: State) => state.dogs);
  const { page } = useSelector((state: State) => state.app);
  const { temperaments } = useSelector((state: State) => state.temperament);

  const changeState = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value, checked } = evt.target;
    setPage(-page);

    if (value.length < state.search.length)
      allDogs?.length
        ? setDogs(allDogs)
        : divTime("No Found", "no", styles.noSee, 4000);

    setState((previus) => {
      return {
        ...previus,
        [name]: name === "existing" ? checked : value.trimStart(),
      };
    });
  };

  const onSearch = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    dogsApi
      .getDogs(state.search)
      .then((response) => {
        setDogs(response.data);
      })
      .catch((error) => {
        const msg = error?.response?.data?.msg;
        if (msg) {
          divTime("NoFound", "no", styles.noSee, 4000);
        }
      });
  };

  const onAll = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setPage(-page);
    return allDogs?.length
      ? setDogs(allDogs)
      : divTime("NoFound", "no", styles.noSee, 4000);
  };

  const pagination = () => {
    return Dogs?.slice(page * 8, page * 8 + 8);
  };

  const nextPage = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (Dogs?.length && Dogs?.length > (page + 1) * 8) return setPage(1);
  };

  const prevPage = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (page > 0) return setPage(-1);
  };

  const onFilter = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    const newDogs = filter(
      allDogs?.length ? allDogs : null,
      state.temperament,
      state.existing
    );
    if (newDogs?.length) {
      setDogs(newDogs);
      setPage(-page);
    }
  };

  const onOrder = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    evt.preventDefault();
    const { value } = evt.target;
    console.log(value);
    const newDogs = orderBy(Dogs?.length ? Dogs : null, parseInt(value));
    if (newDogs?.length) {
      setDogs(newDogs);
      setPage(-page);
    }
  };

  return (
    <div className={styles.home}>
      {/* */}
      <div className={styles.header}>
        {/* */}
        <div className={styles.search}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            name="search"
            value={state.search}
            onChange={changeState}
          />
          <button onClick={onSearch} className={styles.searchButton}>
            <svg
              className={styles.searchIcon}
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>

          <div className={styles.noSee} id="NoFound">
            <span>without results</span>
          </div>
        </div>

        {/* */}
        <div className={styles.buttonsFilter}>
          <div>
            <button onClick={onAll} className={styles.button}>
              All
            </button>
          </div>

          {/* */}
          <div className={styles.containerFilter}>
            <div>
              <input
                placeholder="🔎 Temperament"
                className={styles.tempInput}
                list="temperaments"
                name="temperament"
                value={state.temperament}
                onChange={changeState}
                autoComplete="off"
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

            <div className={styles.checkbox}>
              <input
                type="checkbox"
                name="existing"
                id="existing"
                onChange={changeState}
                className={styles.check}
              />
              <label
                htmlFor="existing"
                className={styles.checkmark}
                title={"Existing Breed"}
              ></label>
              {/* <label htmlFor="existing" className={styles.checkText}>Existing Breed</label> */}
            </div>
            <div className={styles.filter}>
              <button type="submit" className={styles.btnFilter} onClick={onFilter}>
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* */}
      <div className={styles.container}>
        {/* */}
        <div
          className={styles.buttonsPage}
          style={{ transform: "rotate(180deg)" }}
        >
          <button onClick={prevPage}></button>
        </div>

        {/* */}
        <div className={styles.containerCards}>
          {/* */}
          <div className={styles.order}>
            <select
              className={""}
              name="order"
              defaultValue={"none"}
              onChange={onOrder}
            >
              <option value="none" disabled hidden>
                Select Order
              </option>
              <optgroup label="Name">
                <option value={1}>A - Z</option>
                <option value={2}>Z - A</option>
              </optgroup>
              <optgroup label="Peso">
                <option value={3}>Minor</option>
                <option value={4}>Major</option>
              </optgroup>
            </select>

            <span>{`page: ${page + 1} of ${Math.ceil(Dogs?.length ? Dogs?.length / 8: 0)}`}</span>
          </div>

          {/* */}
          <div className={styles.cards}>
            {Dogs?.length ? (
              pagination()?.map((element, i) => (
                <DogCard
                  key={i}
                  id={element.id}
                  name={element.name}
                  image={element.image}
                  temperaments={element.temperaments}
                  weight={element.weight}
                />
              ))
            ) : (<Loading/>)}
          </div>
        </div>

        {/* */}
        <div className={styles.buttonsPage}>
          <button onClick={nextPage}></button>
        </div>
      </div>
    </div>
  );
};

export default Home;

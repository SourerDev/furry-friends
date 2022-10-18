import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux";
import DogCard from "../dogs/DogCard";
import { dogsApi } from "../../services/index";
import { divTime,orderBy,filter} from "../../utils";

const styles = require("./Home.module.css").default;

const Home = () => {
  const dispatch = useDispatch();
  const { setPage, setDogs } = bindActionCreators(actionCreators, dispatch);
  const [state, setState] = useState({
    search: "",
    temperament: '',
    existing: false
  });
  const { Dogs, allDogs } = useSelector((state: State) => state.dogs);
  const { page } = useSelector((state: State) => state.app);
  const { temperaments } = useSelector((state: State) => state.temperament);

  const changeState = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value,checked } = evt.target;
    setPage(-page);
    if(name === 'existing')

    if (value.length < state.search.length)
      allDogs?.length
        ? setDogs(allDogs)
        : divTime("No Found", "no", styles.noSee, 4000);

    setState((previus) => {
      return { ...previus, [name]: name === 'existing' ? checked: value.trimStart() };
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

  const onFilter = (evt:React.FormEvent<HTMLFormElement>)=>{
    evt.preventDefault()
    const newDogs = filter(allDogs?.length ? allDogs : null,state.temperament,state.existing)
    if(newDogs?.length) {
      setDogs(newDogs)
      setPage(-page)
    }
  }

  const onOrder= (evt:React.ChangeEvent<HTMLSelectElement>)=>{
    evt.preventDefault()
    const {value} = evt.target
    console.log(value);
    const newDogs = orderBy(Dogs?.length ? Dogs : null ,parseInt(value))
    if(newDogs?.length) {
      setDogs(newDogs)
      setPage(-page)
    }    
  }

  return (
    <div className={styles.home}>
      {/* */}
      <div className={styles.header}>
        {/* */}
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search"
            name="search"
            value={state.search}
            onChange={changeState}
          />
          <button onClick={onSearch}>Search</button>
          <div className={styles.noSee} id="NoFound">
            <span>without results</span>
          </div>
        </div>
        {/* */}
        <div className={styles.buttonsFilter}>
          <button onClick={onAll}>All</button>
          <button>Filter</button>

          <select name="order" defaultValue={'none'} onChange={onOrder}>
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

          <div className={styles.formFilter}>
            <form onSubmit={onFilter}>
              <div>
                <input list="temperaments" name="temperament" value={state.temperament} onChange={changeState} />
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
                <input type="checkbox" name="existing" id="existing" onChange={changeState}
                />
                <label htmlFor="existing">Existing Breed</label>
              </div>
              <div>
                <button type="submit">Filter</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* */}
      <div className={styles.container}>
        {/* */}
        <div className={styles.buttonsPage}>
          <button onClick={prevPage}>{`<`}</button>
        </div>

        {/* */}
        <div className={styles.cards}>
          {Dogs?.length
            ? pagination()?.map((element, i) => (
                <DogCard
                  key={i}
                  id={element.id}
                  name={element.name}
                  image={element.image}
                  temperaments={element.temperaments}
                  weight={element.weight}
                />
              ))
            : "no results"}
        </div>

        {/* */}
        <div className={styles.buttonsPage}>
          <button onClick={nextPage}>{`>`}</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux";
import DogCard from "../dogs/DogCard";

const styles = require('./Home.module.css').default 

const Home = () =>{
    const dispatch = useDispatch()
    const {setPage} = bindActionCreators(actionCreators,dispatch);

    const {allDogs} = useSelector((state:State)=> state.dogs);
    const {page} = useSelector((state:State)=>state.app)

    const pagination =()=>{
        return allDogs?.slice(page,9)
    }

    useEffect(()=>{
         
    },[])

    return(
        <div className={styles.home}>
            <div className={styles.buttonsPage}>
                <button>{`<`}</button>
            </div>
            <div className={styles.cards}>
                {allDogs?.length ? pagination()?.map((element,i)=><DogCard
                    key={i}
                    id={element.id}
                    name={element.name}
                    image={element.image}
                    temperaments={element.temperaments}
                    weigth = {element.weigth}
                />):'no results'}
                
            </div>
            <div className={styles.buttonsPage}>
                <button>{`>`}</button> 
            </div>
        </div>
    )
}

export default Home;
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { ActionTypes } from "../../redux/actions/actionTypes";
import {actionCreators,State,} from "../../redux/index";
import Loading from "../others/loading/Loading";

const styles = require('./Dogdetail.module.css').default

const DogDetail=()=>{
    const dispatch = useDispatch()
    const {id} = useParams()

    const {getOneDog} = bindActionCreators(actionCreators,dispatch)
    const {oneDog} = useSelector((state:State)=> state.dogs);

    useEffect(()=>{
        getOneDog(id ? id : 0)
        return ()=>{
            dispatch({type: ActionTypes.GET_ONE_DOG, payload: {}})
        }
    },[id])
    
    return(
        <div className={styles.container}>
            {oneDog?.id ? <><div className={styles.header}>
                <h1>{oneDog?.name}</h1>
                <img src={oneDog?.image} alt={oneDog?.name} className={styles.image}/>
            </div>
            <div className={styles.description}>
                <p>{`Weight: ${oneDog?.weight} Lb`}</p>
                <p>{`Height: ${oneDog?.height} Cm`}</p>
                <p>{`Life: ${oneDog?.life_span}`}</p>
                <p>{`${oneDog?.origin}`}</p>
                <p>{`Temperaments: ${oneDog?.temperaments?.join(', ')}`}</p>
            </div> </>:<Loading/>}
        </div>
    )
}

export default DogDetail;
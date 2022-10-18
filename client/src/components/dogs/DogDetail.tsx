import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { ActionTypes } from "../../redux/actions/actionTypes";
import {actionCreators,State,} from "../../redux/index";

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
        <div>
            <h1>{oneDog?.name}</h1>
            <div>
                <img src={oneDog?.image} alt={oneDog?.name} />
            </div>
        </div>
    )
}

export default DogDetail;
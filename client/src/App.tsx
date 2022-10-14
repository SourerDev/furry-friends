import React,{useEffect} from 'react';
import './App.css';

import { bindActionCreators } from "redux";
import { useDispatch} from "react-redux";

import { Routes,Route } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import NavBar from "./components/nav-bar/NavBar";
import Home from "./components/home/Home";
import Create from "./components/create/Create";
import DogDetail from './components/dogs/DogDetail';
import { actionCreators } from './redux';


function App() {
  const dispatch = useDispatch();

  const {getAllDogs,getAllTemperaments} = bindActionCreators(actionCreators,dispatch);

  useEffect(()=>{
    getAllTemperaments()
    getAllDogs()
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<><Welcome/></>}/>
        <Route path='/home' element={<><NavBar/><Home/></>} />
        <Route path='/create' element={<><NavBar/><Create/></>}/>
        <Route path='/dog/:id' element={<><NavBar/><DogDetail/></>}/>
      </Routes>
    </div>
  );
}

export default App;

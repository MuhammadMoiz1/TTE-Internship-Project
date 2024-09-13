import React from 'react'
import "./Home.css"
import Header from '../../header/Header';
import ModelSlider from '../../ModelSlider/ModelSlider';
import OptionCards from '../../OptionCards/optionCards';


const Home = () => {
  return (
   <div>
    <Header/>
    <ModelSlider/>
    <OptionCards/>
   </div>
  );
  
}

export default Home;

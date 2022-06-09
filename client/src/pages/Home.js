import React from "react";
import HomeListings from '../components/HomeListings';
import {Link} from 'react-router-dom'

const Home =()=>{
    
    return(
        <div>
            <h1>Sales Going On</h1>
            <HomeListings/>
        </div>
    )
}

export default Home;
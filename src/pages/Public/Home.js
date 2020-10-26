import React, { Component } from 'react';
import {Row, Col, Carousel} from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";
import HomePanel from "../../App/layout/Public/HomePanel";
import "../../assets/scss/style.scss"

class Home extends Component{
        
render() {
   return ( 
        
        <Aux>
             <Navbar />
             <HomePanel />
        </Aux>
        
    )
}

}


export default Home;
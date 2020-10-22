/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {Row, Col, Carousel} from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Card from "../../App/components/MainCard";
import Navbar from "../../App/layout/Public/Navbar";
import HomePanel from "../../App/layout/Public/HomePanel";
import Monitoring from "../../App/layout/Public/Monitoring";
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
import React, { Component } from 'react';

import Aux from "../../App/components/_Aux";

import "../../assets/scss/style.scss"
import './Cabinet.scss'
import './Donate.scss'
import Navbar from "../../App/layout/Public/Navbar";
import News from "../../App/layout/Public/News";
import Contacts from "../../App/layout/Public/Contacts";
import DonateButtons from "../../App/layout/Public/DonateButtons";

class Donate extends Component{
    componentDidMount() {
        document.title = "Донат-услуги | Obvilion Network";
    }

   render() {
      return (
         <Aux>
            <div className="first">
               <div className="first-bg">
                  <img src={require('../../assets/images/bg.jpg')} alt='Фон' />
               </div>
               <Navbar />
               <News />

               <div className="title">
                  Магазин привилегий
               </div>
               <DonateButtons />
            </div>

            <div className="first-bg endBg">
               <img src={require('../../assets/images/bg5.png')} alt='Фон' />
            </div>
            <div className="end">
               <Contacts />
            </div>
         </Aux>
      )
   }
}


export default Donate;

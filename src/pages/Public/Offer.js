import React, { Component } from 'react';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";

import "../../assets/scss/style.scss"
import './Cabinet.scss'
import Contacts from "../../App/layout/Public/Contacts";
import News from "../../App/layout/Public/News";
import OfferComp from "../../App/layout/Public/OfferComp";

class Rules extends Component {
   render() {

      return (
         <Aux>
            <div className="first-bg">
               <img src={require('../../assets/images/bg.jpg')} />
            </div>

            <div className="first-bg bgg" style={{ paddingTop: '45vw' }}>
               <img src={require('../../assets/images/bg1.jpg')} />
            </div>

            <div className="first-bg bgg" style={{ paddingTop: '80vw' }}>
               <img src={require('../../assets/images/bg2.jpg')} />
            </div>

            <div className="first-bg bgg" style={{ paddingTop: '100vw' }}>
               <img src={require('../../assets/images/bg3.jpg')} />
            </div>

            <div className="first-bg bgg" style={{ paddingTop: '136vw' }}>
               <img src={require('../../assets/images/bg1.jpg')} />
            </div>

            <div className="first-bg" style={{ paddingTop: '167vw' }}>
               <img src={require('../../assets/images/bg5.png')} />
            </div>

            <div className="first" style={{ height: '154vw' }}>
               <Navbar />
               <News />

               <div className="title">
                  Договор оферты Obvilion.ru
               </div>

               <div style={{ marginTop: '2vw', paddingLeft: '7vw', paddingRight: '7vw' }}>
                  <OfferComp />
               </div>
            </div>

            <div className="first-bg end">
               <div style={{ marginTop: '13vw' }}>
                  <Contacts />
               </div>
            </div>
         </Aux>
      )
   }
}


export default Rules;

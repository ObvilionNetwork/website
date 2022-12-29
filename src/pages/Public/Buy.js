import React, { Component, useEffect } from 'react';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";

import "../../assets/scss/style.scss"
import './Cabinet.scss'
import Contacts from "../../App/layout/Public/Contacts";
import BuyComp from "../../App/layout/Public/BuyComp";
import Oops from "./Oops";
import News from "../../App/layout/Public/News";

const messages = {
   none: '',
   vip: 'VIP',
   premium: 'Premium',
   deluxe: 'Deluxe',
   legend: 'Legend',
   prefix: 'Смена префикса',
}

class Buy extends Component {
    componentDidMount() {
        document.title = "Покупка донат привилегии | Obvilion Network";
    }

   render() {
      const urlParams = new URLSearchParams(window.location.search);

      let p_name = messages[urlParams.get("id")];
      if (!p_name) {
         return (
            <Aux>
               <div className="first">
                  <div className="first-bg">
                     <img src={require('../../assets/images/bg.jpg')} />
                  </div>

                  <Navbar />
                  <News />

                  <div className="title2">
                     Донат-услуга не <br/> найдена
                  </div>

                  <div className="title2 title3">
                     Вы можете вернуться <br/>
                     на главную страницу или проверить <br/>
                     правильность своего запроса.
                  </div>
               </div>

               <div className="first-bg endBg">
                  <img src={require('../../assets/images/bg5.png')} />
               </div>
               <div className="end">
                  <Contacts />
               </div>
            </Aux>
         )
      }

      return (
         <Aux>
            <div className="first">
               <div className="first-bg">
                  <img src={require('../../assets/images/bg.jpg')} />
               </div>
               <Navbar />

               <div className="title" style={{ marginTop: '2.6vw' }}>
                  Покупка донат услуги {p_name}
               </div>

               <BuyComp />
            </div>

            <div className="first-bg endBg">
               <img src={require('../../assets/images/bg5.png')} />
            </div>
            <div className="end">
               <Contacts />
            </div>
         </Aux>
      )
   }
}


export default Buy;

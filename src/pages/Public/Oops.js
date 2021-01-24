import React, { Component } from 'react';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";

import "../../assets/scss/style.scss"
import './Cabinet.scss'
import './Oops.scss'
import Contacts from "../../App/layout/Public/Contacts";
import News from "../../App/layout/Public/News";

class Oops extends Component {
   render() {

      return (
         <Aux>
            <div className="first">
               <div className="first-bg">
                  <img src={require('../../assets/images/bg.png')} />
               </div>

               <Navbar />
               <News />

               <div className="title2">
                  Страница не <br/> найдена
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
}


export default Oops;

import React, { Component } from 'react';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";

import "../../assets/scss/style.scss"
import './Cabinet.scss'
import './Oops.scss'
import './NewYearEvent.scss'
import Contacts from "../../App/layout/Public/Contacts";

class NewYearEvent extends Component {
   render() {
      if (!window.localStorage.getItem('user') || !window.localStorage.getItem('token')) {
         return (
            <Aux>
               <div className="first">
                  <div className="first-bg">
                     <img src={require('../../assets/images/bg.jpg')} />
                  </div>

                  <Navbar />

                  <div className="title2" style={{ marginTop: '4vw', fontSize: '4.9vw', lineHeight: '5.2vw' }}>
                     Авторизируйтесь, <br/> прежде чем просматривать эту страницу
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

      const user = JSON.parse(window.localStorage.getItem('user'));

      return (
         <Aux>
            <div className="first" style={{height: '39vw'}}>
               <div className="first-bg">
                  <img src={require('../../assets/images/bg.jpg')} />
               </div>

               <Navbar />

               <div className="title titleP1">
                  Новогодний ивент 2022
               </div>

               <div className="inline">
                  <div className="descLeft" style={{ marginRight: '5vw' }}>
                     <div className="titleM1">
                        Информация о ивенте
                     </div>
                     Специально для Вас новогоднее настроение с комплексом серверов mc.obvilion.ru! Играйте на серверах нашего проекта и получайте ценные подарки!
                     <br/>
                     <br/>
                     Проводя час игры на нашем проекте вы получаете определенный подарок - от редкого предмета, до привилегий сроком до 3-ёх месяцев, или же донат валюту на Ваш игровой аккаунт! Время, проведённое в AFK не учитывается!
                     <br/>
                     <br/>
                     Выдача подарков действует с 27.12.2021.
                     <br/>
                     <br/>
                     Ивент действует с 23.12.2021 по 02.01.2022.
                  </div>
                  <div className="descLeft" style={{ height: '22vw' }}>
                     {
                        !user || !user.name ?
                           <div className="titleM1" style={{ textAlign: 'center', marginTop: '9vw' }}>
                              Для выдачи подарка необходима авторизация
                           </div> : (true ?
                           <div>
                              <div className="titleM1">
                                 Получение подарков 🎁
                              </div>
                              <div className="descM1">
                                 Доступное время: { Math.floor(user.timePlayed / 1000 / 60 / 60) }ч.
                              </div>
                              <div className="buttonM1">
                                 Получить приз
                              </div>
                              <div style={{ filter: 'blur(0.2vw)', opacity: '0.55' }}>
                                 <div className="strM1">
                                    Вы получили
                                 </div>
                                 <div className="strM1" style={{ marginTop: '4.5vw', width: '18vw', fontFamily: "'CeraPro Bold', sans-serif" }}>
                                    Предмет Ваджра на сервере HiTech
                                 </div>
                                 <div className="strM1" style={{ marginTop: '8.8vw', width: '18vw', opacity: '0.7' }}>
                                    Для получения предмета зайдите на сервер
                                 </div>
                                 <img src="https://grand-mine.ru/data/items/m49/item115_icon_1576517502l.jpg" style={{ width: '12vw', height: '12vw', marginLeft: '4.5vw', marginTop: '2.5vw', imageRendering: 'pixelated' }} />
                              </div>
                              <div className="titleM1" style={{ marginTop: '-7vw', marginLeft: '2.8vw', textShadow: '0.05vw 0.05vw 0.1vw black', fontSize: '1.6vw' }}>
                                 Выдача подарков действует с 27.12.2021.
                              </div>
                           </div> :
                           <div>
                              <div className="titleM1">
                              Получение подарков 🎁
                              </div>
                              <div className="descM1">
                              Доступное время: { user.timePlayed / 1000 / 60 / 60 }ч.
                              </div>
                              <div className="buttonM1">
                              Получить приз
                              </div>
                              <div className="strM1">
                              Вы получили
                              </div>
                              <div className="strM1" style={{ marginTop: '4.5vw', fontFamily: "'CeraPro Bold', sans-serif" }}>
                              Привилегия Vip
                              </div>
                              <img src={require('../../assets/images/user/avatar-2.jpg')} style={{ width: '12vw', height: '12vw', marginLeft: '4vw', marginTop: '2.5vw', imageRendering: 'pixelated' }} />
                           </div>)
                     }
                  </div>
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


export default NewYearEvent;

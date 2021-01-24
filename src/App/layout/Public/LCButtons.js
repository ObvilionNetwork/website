import React from 'react';
import "./LCButtons.scss"

class LCButtons extends React.Component {
   render() {
      const user = JSON.parse(window.localStorage.getItem('user'));

      return(
         <div className='LCButtons'>
            <a className="button-lc" href="/">
               <div className="title-lc">
                  Подключить <br/> Дискорд
               </div>
               <div className="description-lc">
                  Получи роль Verified, просматривай статистику и управляй аккаунтом через бота
               </div>
            </a>

            <a className="button-lc" href="/">
               <div className="title-lc">
                  Подключить <br/> 2FA
               </div>
               <div className="description-lc">
                  Защити свой аккаунт от взлома при помощи двухфакторной авторазации
               </div>
            </a>

            <a className="button-lc" href="/">
               <div className="title-lc">
                  Пополнить <br/> баланс
               </div>
               <div className="description-lc">
                  Пополни свой запас рубликов, тем самым ты поддержишь наш проект :З
               </div>
            </a>

            <a className="button-lc" href="/donate">
               <div className="title-lc">
                  Купить <br/> привилегии
               </div>
               <div className="description-lc">
                  Купи крутую привилегию и выделись среди игроков, поддержи проект!
               </div>
            </a>

            <a className="button-lc" href="/bugreport">
               <div className="title-lc">
                  Обратиться <br/> за помощью
               </div>
               <div className="description-lc">
                  Нужна помощь, нашли баг? Тыкайте на эту кнопашку и подробно расскажите о проблеме
               </div>
            </a>
         </div>
      )
   }
}

export default (LCButtons);

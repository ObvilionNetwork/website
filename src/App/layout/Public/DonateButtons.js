import React from 'react';
import "./DonateButtons.scss"

class DonateButtons extends React.Component {
   render() {
      const user = JSON.parse(window.localStorage.getItem('user'));

      return(
         <div className='DonateButtons'>
            <div className="button-lc">
               <div className="title-lc">
                  VIP
               </div>

               <div className="description-lc">
                  Дешёвая роль для VIP игроков :З
               </div>

               <div className="price">
                  49р/мес
               </div>

               <div className="max-price">
                  или 1199р навсегда
               </div>

               <a className="button-don " href="/buy?id=vip">
                  <div className="text">Приобрести</div>
               </a>

               <a className="info-don" href="/donate/about?id=vip">
                  Подробнее >
               </a>
            </div>

            <div className="button-lc">
               <div className="title-lc">
                  PREMIUM
               </div>

               <div className="description-lc">
                  Для тех, кому хочется чего-то большего
               </div>

               <div className="price">
                  119р/мес
               </div>

               <div className="max-price">
                  или 1599р навсегда
               </div>

               <a className="button-don " href="/buy?id=premium">
                  <div className="text">Приобрести</div>
               </a>

               <a className="info-don" href="/donate/about?id=premium">
                  Подробнее >
               </a>
            </div>

            <div className="button-lc">
               <div className="title-lc">
                  DELUXE
               </div>

               <div className="description-lc">
                  Идеальный функционал за небольшие деньги
               </div>

               <div className="price">
                  239р/мес
               </div>

               <div className="max-price">
                  или 2499р навсегда
               </div>

               <a className="button-don " href="/buy?id=deluxe">
                  <div className="text">Приобрести</div>
               </a>

               <a className="info-don" href="/donate/about?id=deluxe">
                  Подробнее >
               </a>
            </div>

            <div className="button-lc plus-margin">
               <div className="title-lc">
                  LEGEND
               </div>

               <div className="description-lc">
                  Ходят легенды, что эта привилегия самая крутая
               </div>

               <div className="price">
                  479р/мес
               </div>

               <div className="max-price">
                  или 3699р навсегда
               </div>

               <a className="button-don " href="/buy?id=legend">
                  <div className="text">Приобрести</div>
               </a>

               <a className="info-don" href="/donate/about?id=legend">
                  Подробнее >
               </a>
            </div>

            <div className="button-lc plus-margin">
               <div className="title-lc">
                  СМЕНА ПРЕФИКСА
               </div>

               <div className="description-lc">
                  Для тех, кто хочет выделиться в чате и табе
               </div>

               <div className="price">
                  69р/мес
               </div>

               <div className="max-price">
                  или 1399р навсегда
               </div>

               <a className="button-don " href="/buy?id=prefix">
                  <div className="text">Приобрести</div>
               </a>

               <a className="info-don" href="/donate/about?id=prefix">
                  Подробнее >
               </a>
            </div>
         </div>
      )
   }
}

export default (DonateButtons);

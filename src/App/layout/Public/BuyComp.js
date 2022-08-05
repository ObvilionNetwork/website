import React from 'react';

import "../../../assets/scss/style.scss"
import "./BuyComp.scss"
import Aux from "../../components/_Aux";
import Navbar from "./Navbar";
import Contacts from "./Contacts";

const apiLink = 'https://obvilion.ru/api/';
const messages = {
   none: '',
   vip: 'VIP',
   premium: 'Premium',
   deluxe: 'Deluxe',
   legend: 'Legend',
   prefix: 'Смена префикса',
}

class BuyComp extends React.Component {
   constructor (props) {
      super(props);

      const urlParams = new URLSearchParams(window.location.search);
      let p_name = messages[urlParams.get("id")];


      this.state = {
         prices: [],
         error: false,
         authError: false,
         for_player: urlParams.get("for"),
         donate_name: p_name,
         payment_method: 'Не указан',
         selDur: 0,
      };

      this.getData = this.getData.bind(this);
      this.updateName = this.updateName.bind(this);
      this.setDuration = this.setDuration.bind(this);
      this.getDurationStyle = this.getDurationStyle.bind(this);

      if (!this.state.for_player) {
         const user = JSON.parse(window.localStorage.getItem('user'));
         if (!user) {
            this.state.for_player = "Не указан";
            this.state.authError = true;
            return;
         }

         this.state.for_player = user.name;
      }
   }

   setDuration(id) {
      const r = this.state.prices[id];
      if (!r) {
         alert('Произошла ошибка: 1849 - цены не загружены!')
      }

      this.setState({
         total_price: r.price + r.discount,
         price: r.price,
         discount: r.discount,
         discount_perc: r.discount_percent,
         selDur: id
      });
   }
   getDurationStyle(id) {
      if (this.state.selDur === id) {
         return " block-inside-selected";
      }

      return "";
   }

   async updateName() {
      const name = prompt("Введите никнейм пользователя, для которого хотите произвести оплату", '');

      if (!name) {
         return;
      }

      try {
         const r = await fetch(apiLink + 'users/' + name, {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "GET"
         });

         await r.json();

         this.setState({
            for_player: name
         });
      } catch (e) {
         alert('Такого пользователя не существует. Перепроверьте введённые данные.');
      }
   }

   async getData() {
      try {
         const r = await fetch(apiLink + 'pay/prices', {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "GET"
         });

         const prices = (await r.json()).prices;
         const res = prices[this.state.donate_name].prices;

         this.setState({
            prices: res,
         });
      } catch (e) {
         this.setState({
            error: true
         });
      }
   }

   render() {
      if (this.state.error) {
         return (
            <div className="Buy">
               <div className="sub">
                  <div className="block-in" style={{ width: '45vw' }}>
                     <div className="block-in-error">
                        Произошла ошибка при обновлении цен на донат-услуги. <br/>
                        Пожалуйста, обратитесь к тех. поддержке
                     </div>
                  </div>
               </div>
            </div>
         )
      }

      return(
         <div className='Buy'>
            <div className="sub">
               <div className="block-in" id="first">
                  <div className="inline-info">
                     <div className="inline-left">
                        Получатель
                     </div>

                     <div className="inline-right" style={{ right: '1.2vw' }}>
                        {this.state.for_player}

                        <div className="button-icon" onClick={ this.updateName }>
                           <img src={require('../../../assets/images/edit.png')} />
                        </div>
                     </div>
                  </div>

                  <div className="inline-info">
                     <div className="inline-left">
                        Привилегия
                     </div>

                     <div className="inline-right" style={{ right: '1.2vw' }}>
                        {this.state.donate_name}

                        <a className="button-icon" href="/donate">
                           <img src={require('../../../assets/images/edit.png')} />
                        </a>
                     </div>
                  </div>

                  <div className="title-23 t">
                     Выберите продолжительность
                  </div>

                  <div className="bc-inline-block">
                     <div className={"block-inside" + this.getDurationStyle(0)} onClick={() => this.setDuration(0)}>
                        1 Месяц
                     </div>

                     <div className={"block-inside" + this.getDurationStyle(1)} onClick={() => this.setDuration(1)}>
                        2 Месяца
                        <div className="sale" style={{ color: 'rgba(181, 199, 248, 0.8)' }}>
                           Выгода 20%
                        </div>
                     </div>

                     <div className={"block-inside" + this.getDurationStyle(2)} onClick={() => this.setDuration(2)}>
                        3 Месяца
                        <div className="sale" style={{ color: 'rgba(169,189,243,0.8)' }}>
                           Выгода 30%
                        </div>
                     </div>
                  </div>

                  <div className="bc-inline-block" style={{ marginTop: '0.9vw' }}>
                     <div className={"block-inside" + this.getDurationStyle(3)} onClick={() => this.setDuration(3)}>
                        6 Месяцев
                        <div className="sale" style={{ color: 'rgba(169,175,243,0.8)' }}>
                           Выгода 40%
                        </div>
                     </div>

                     <div className={"block-inside" + this.getDurationStyle(4)} onClick={() => this.setDuration(4)}>
                        12 Месяцев
                        <div className="sale" style={{ color: 'rgba(183,169,243,0.8)' }}>
                           Выгода 50%
                        </div>
                     </div>

                     <div className={"block-inside" + this.getDurationStyle(5)} onClick={() => this.setDuration(5)}>
                        Навсегда
                        <div className="sale" style={{ color: 'rgba(205,169,243,0.8)' }}>
                           Выгода 90%+
                        </div>
                     </div>
                  </div>

                  <div className="inline-info" style={{ marginTop: '2.1vw' }}>
                     <div className="inline-left">
                        Способ оплаты
                     </div>

                     <div className="inline-right">
                        {this.state.payment_method}
                     </div>
                  </div>

                  <div className="inline-info">
                     <div className="inline-left">
                        Общая стоимость
                     </div>

                     <div className="inline-right">
                        {this.state.total_price} р.
                     </div>
                  </div>

                  <div className="inline-info">
                     <div className="inline-left">
                        Скидка
                     </div>

                     <div className="inline-right">
                        -{this.state.discount} р. ({this.state.discount_perc}%)
                     </div>
                  </div>

                  <div className="inline-info" style={{ marginTop: '1.5vw' }}>
                     <div className="inline-left">
                        Итого к оплате
                     </div>

                     <div className="inline-right">
                        {this.state.price} р.
                     </div>
                  </div>
               </div>
            </div>

            <div className="sub">
               <div className="block-in" id="right-1">
                  <div className="title-23">
                     Промокод (если есть)
                  </div>

                  <div className="bc-main-in">
                     <input className="bc-input" maxLength="40">

                     </input>

                     <div className="bc-ok">
                        <svg className="svg-bc" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M11.3889 21.6389L17.0834 27.3333L29.6111 14.8055" stroke="#E7E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                     </div>
                  </div>
               </div>
               <div className="block-in" id="right-2">
                  <div className="title-23">
                     Выберите метод оплаты
                  </div>

                  <div className="bc-inline-block">
                     <div className="block-inside block-inside-im" style={{
                        background: 'url(' + require('../../../assets/images/pay/yoomoney.png') + '), #FFFFFF',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center' }}>

                        Счёт ЮМани
                        <div className="sale">
                           Комиссия 1%
                        </div>
                     </div>

                     <div className="block-inside block-inside-im" style={{
                        background: 'url(' + require('../../../assets/images/pay/yoomoney.png') + '), #FFFFFF',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center' }}>

                        Банк. карта
                        <div className="sale">
                           Комиссия 3%
                        </div>
                     </div>

                     <div className="block-inside block-inside-im" style={{
                        background: 'url(' + require('../../../assets/images/pay/yoomoney.png') + '), #FFFFFF',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center' }}>

                        Номер телефона
                        <div className="sale">
                           Комиссия от 7,95%
                        </div>
                     </div>
                  </div>

                  <div className="bc-inline-block" style={{ marginTop: '0.9vw' }}>
                     <div className="block-inside block-inside-im block-inside-im-selected" style={{
                        background: 'url(' + require('../../../assets/images/pay/qiwi.png') + '), #FFFFFF',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center' }}>

                        Счёт Киви
                        <div className="sale">
                           Комиссия от 0%
                        </div>
                     </div>

                     <div className="block-inside block-inside-im" style={{
                        background: 'url(' + require('../../../assets/images/pay/qiwi.png') + '), #FFFFFF',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center' }}>

                        Банк. карта
                        <div className="sale">
                           Комиссия от 1%
                        </div>
                     </div>

                     <div className="block-inside block-inside-im" style={{
                        background: 'url(' + require('../../../assets/images/pay/payeer.png') + '), #FFFFFF',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center' }}>

                        14+ Способов
                        <div className="sale">
                           Комиссия от 0.5%
                        </div>
                     </div>
                  </div>

                  <div className="inf">
                     Оплачивая данную донат-услугу, вы принимаете <br/>
                     условия <b1 className="more">оферты</b1>.
                  </div>

                  <div className="button-f">
                     Перейти на страницу оплаты
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
export default (BuyComp);

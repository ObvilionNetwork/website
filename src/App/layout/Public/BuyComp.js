import React from 'react';

import "../../../assets/scss/style.scss"
import "./BuyComp.scss"
import Aux from "../../components/_Aux";
import Navbar from "./Navbar";
import Contacts from "./Contacts";
import navLogo from "../AdminLayout/Navigation/NavLogo";

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
         prices: {
            methods: {
               yoomoney: {
                  card: false,
                  mobile: false,
                  wallet: false,
               },
               qiwi: {
                  card: false,
                  wallet: false,
               },
               payeer: false
            },
            discounts: {
               m_1: 0,
               m_2: 10,
               m_3: 20,
               m_6: 30,
               m_12: 40,
               m_forever: 50,
            },
         },
         error: false,
         authError: false,
         for_player: urlParams.get("for"),
         donate_name: p_name,
         payment_method: 'Не указан',
         selDur: 0,
         selMet: -1,
         groupId: urlParams.get("id"),
      };

      this.getData = this.getData.bind(this);
      this.updateName = this.updateName.bind(this);
      this.setDuration = this.setDuration.bind(this);
      this.setMethod = this.setMethod.bind(this);
      this.getDurationStyle = this.getDurationStyle.bind(this);
      this.checkPromo = this.checkPromo.bind(this);
      this.toPay = this.toPay.bind(this);

      this.getData();

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

   available(id) {
      let avail = false;
      switch (id) {
         case 0:
            avail = this.state.prices.methods.yoomoney.wallet;
            break;
         case 1:
            avail = this.state.prices.methods.yoomoney.card;
            break;
         case 2:
            avail = this.state.prices.methods.yoomoney.mobile;
            break;
         case 3:
            avail = this.state.prices.methods.qiwi.wallet;
            break;
         case 4:
            avail = this.state.prices.methods.qiwi.card;
            break;
         case 5:
            avail = this.state.prices.methods.payeer;
      }
      return avail;
   }
   gname(id) {
      switch (id) {
         case 0:
            return 'Кошелёк ЮМани'
         case 1:
            return 'Карта, через ЮМани'
         case 2:
            return 'Номер телефона, через ЮМани'
         case 3:
            return 'Кошелёк Qiwi'
         case 4:
            return 'Карта, через Qiwi'
         case 5:
            return 'Payeer'
      }
   }
   setMethod(id) {
      if (this.state.selMet === id) {
         this.setState({ selMet: -1, payment_method: 'Не указан' });
         return;
      }

      if (!this.available(id)) {
         return;
      }

      this.setState({
         selMet: id,
         payment_method: this.gname(id),
      });
   }
   setDuration(id) {
      const groups = this.state.prices.groups;

      if (!groups) {
         return alert('Произошла ошибка: Цены не загружены! (E1800)')
      }

      let group;
      for (const g of groups) {
         if (g.textId === this.state.groupId) {
            group = g;
            break;
         }
      }

      if (!group) {
         for (const g of this.state.prices.otherPrices) {
            if (g.textId === this.state.groupId) {
               group = g;
               break;
            }
         }

         if (!group) {
            return alert('Произошла ошибка: Цены не загружены! (E1801)')
         }
      }

      const d = this.state.prices.discounts;

      const duration = [1,2,3,6,12,24];
      const discounts = [d.m_1, d.m_2, d.m_3, d.m_6, d.m_12, d.m_forever]

      const without_promo = group.cost * duration[id] - group.cost * duration[id] * discounts[id] / 100;

      const promo_d = this.state.promoFixed
         ? this.state.promo
         : this.state.promoPerc
            ? without_promo * this.state.promoPerc / 100
            : 0

      this.setState({
         total_price: group.cost * duration[id],
         price: Math.ceil(without_promo - promo_d),
         discount: Math.floor(group.cost * duration[id] * discounts[id] / 100),
         discount_perc: discounts[id],
         selDur: id,
         promo: Math.floor(promo_d),
      });
   }
   getDurationStyle(id) {
      if (this.state.selDur === id) {
         return " block-inside-selected";
      }

      return "";
   }
   getMethodStyle(id) {
      if (!this.available(id)) {
         return " block-inside-im-not-available";
      }

      if (this.state.selMet === id) {
         return " block-inside-im-selected";
      }

      return "";
   }

   async checkPromo() {
      const promo = document.getElementById('promo-input').value;

      if (promo.length < 3) {
         alert('Промокод введён неверно');
         return;
      }

      try {
         const r = await fetch(apiLink + 'donate/promo/' + promo + '?service=donate', {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "GET"
         });

         const data = await r.json();

         if (data.error) {
            alert('Промокод введен неверно: E' + data.code + ' ->' + data.error);
            return;
         }

         document.getElementById('promo-input').disabled = true;
         document.getElementById('promo-input').style.width = '100%';
         document.getElementById('promo-ok').style.display='none'
         alert('Промокод применён успешно. Если хотите изменить сбросить промокод, перезагрузите страницу.');

         if (data.discount) {
            const p = this.state.price * data.discount / 100;
            this.setState({
               promocode: promo,
               promo: p,
               promoPerc: data.discount,
               price: Math.ceil(this.state.price - p),
            });
         }
         else if (data.amount) {
            this.setState({
               promo: data.amount,
               promoFixed: true,
               price: Math.ceil(this.state.price - data.amount),
            });
         }
      } catch (e) {
         alert('Такого пользователя не существует. Перепроверьте введённые данные.');
      }
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
         const r = await fetch(apiLink + 'donate', {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "GET"
         });

         const data = await r.json();

         this.setState({
            prices: data,
         });

         this.setDuration(0);
      } catch (e) {
         this.setState({
            error: true
         });
      }
   }

   getDiscount(disc, color) {
      return disc
         ? <div className="sale" style={{ color }}>
            Выгода {disc}%
         </div>
         : undefined
   }

   redirectPost(url, data) {
      const form = document.createElement('form');
      document.body.appendChild(form);
      form.method = 'post';
      form.action = url;
      for (const name in data) {
         const input = document.createElement('input');
         input.type = 'hidden';
         input.name = name;
         input.value = data[name];
         form.appendChild(input);
      }
      form.submit();
   }

   async toPay() {
      if (this.state.for_player === 'Не указан') {
         alert('Вы не указали игрока для совершения оплаты');
         return;
      }

      const re = /\S+@\S+\.\S+/;

      if (!re.test(document.getElementById('donate-email').value)) {
         alert('Вы ввели некорректный Email для отправки чека');
         return;
      }

      if (this.state.selMet === 0 || this.state.selMet === 1 || this.state.selMet === 2) {
         const type = this.state.selMet === 0
            ? 'wallet'
            : this.state.selMet === 1
               ? 'card'
               : 'mobile';

         const duration = [1,2,3,6,12,24];

         try {
            const args = '?username=' + this.state.for_player
                        + '&paymentType=' + type
                        + '&type=' + (this.state.groupId === 'prefix' ? 'prefix' : this.state.groupId)
                        + '&email=' + document.getElementById('donate-email').value
                        + '&service=' + ((this.state.groupId === 'prefix') ? document.getElementById('prefix-text').value : this.state.groupId)
                        + ((this.state.groupId === 'prefix') ? ('&color=' + document.getElementById('prefix-color').value.replace('#', '%23')) : '')
                        + '&duration=' + duration[this.state.selDur]
                        + (this.state.promocode ? ('&promo=' + this.state.promocode) : '');

            const r = await fetch(apiLink + 'pay/yoomoney' + args, {
               headers: {
                  'Content-Type': 'application/json'
               },
               method: "GET"
            });

            const data = await r.json();

            if (data.error) {
               alert('Error with code ' + data.code + ' - ' + data.error)
               return;
            }

            this.redirectPost('https://yoomoney.ru/quickpay/confirm.xml', data)
         } catch (e) {
            console.error(e)
            this.setState({
               error: true
            });
         }
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
                        { this.getDiscount(this.state.prices.discounts.m_1, 'rgba(181, 199, 248, 0.8)') }
                     </div>

                     <div className={"block-inside" + this.getDurationStyle(1)} onClick={() => this.setDuration(1)}>
                        2 Месяца
                        { this.getDiscount(this.state.prices.discounts.m_2, 'rgba(188,181,248,0.8)') }
                     </div>

                     <div className={"block-inside" + this.getDurationStyle(2)} onClick={() => this.setDuration(2)}>
                        3 Месяца
                        { this.getDiscount(this.state.prices.discounts.m_3, 'rgba(185,166,255,0.8)') }
                     </div>
                  </div>

                  <div className="bc-inline-block" style={{ marginTop: '0.9vw' }}>
                     <div className={"block-inside" + this.getDurationStyle(3)} onClick={() => this.setDuration(3)}>
                        6 Месяцев
                        { this.getDiscount(this.state.prices.discounts.m_6, 'rgba(196,166,255,0.8)') }
                     </div>

                     <div className={"block-inside" + this.getDurationStyle(4)} onClick={() => this.setDuration(4)}>
                        12 Месяцев
                        { this.getDiscount(this.state.prices.discounts.m_12, 'rgba(195,156,253,0.8)') }
                     </div>

                     <div className={"block-inside" + this.getDurationStyle(5)} onClick={() => this.setDuration(5)}>
                        Навсегда
                        {
                           //this.getDiscount(this.state.prices.discounts.m_forever)
                           <div className="sale" style={{ color: 'rgba(218,158,255,0.8)' }}>
                              Выгода 98%
                           </div>
                        }
                     </div>
                  </div>

                  {
                     this.state.groupId === 'prefix' ? <>
                        <div className="title-23" style={{ marginTop: '1vw' }}>
                           Настройте префикс
                        </div>

                        <div className="bc-main-in">
                           <input id='prefix-color' type='color' className="bc-ok">
                           </input>

                           <input id='prefix-text' className="bc-input" maxLength="14">
                           </input>
                        </div>
                     </>
                        : undefined
                  }


                  <div className="inline-info" style={{ marginTop: '1.55vw' }}>
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

                  {
                     this.state.promo
                        ? <div className="inline-info">
                           <div className="inline-left">
                              Промокод
                           </div>

                           <div className="inline-right">
                              -{this.state.promo} р.
                              {
                                 this.state.promoPerc
                                    ? ` (${this.state.promoPerc}%)`
                                    : ''
                              }
                           </div>
                        </div>
                        : undefined
                  }

                  <div className="inline-info" style={{ marginTop: '1.3vw' }}>
                     <div className="inline-left">
                        Итого к оплате
                     </div>

                     <div className="inline-right" style={{ top: '-0.9vw', }}>
                        <b style={{ color: '#fff', fontSize: '2vw' }}>{
                           this.state.price < 0
                              ? 0
                              : this.state.price
                        }</b> р.
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
                     <input id='promo-input' className="bc-input" maxLength="40">

                     </input>

                     <div id='promo-ok' className="bc-ok" onClick={this.checkPromo}>
                        <svg className="svg-bc" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M11.3889 21.6389L17.0834 27.3333L29.6111 14.8055" stroke="#E7E7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                     </div>
                  </div>
               </div>
               <div className="block-in" id="right-2">
                  <div className="title-23">
                     Введите почту для отправки чека
                  </div>

                  <div className="bc-main-in" style={{ marginBottom: '1.5vw' }}>
                     <input type='email' id='donate-email' className="bc-input" maxLength="40" style={{ width: '100%' }}>
                     </input>
                  </div>

                  <div className="title-23">
                     Выберите метод оплаты
                  </div>

                  <div className="bc-inline-block">
                     <div className={"block-inside block-inside-im" + this.getMethodStyle(0)} onClick={() => this.setMethod(0)} style={{
                        background: 'url(' + require('../../../assets/images/pay/yoomoney.png') + '), #FFFFFF',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center' }}>

                        Счёт ЮМани
                        <div className="sale">
                           Комиссия 0.5%
                        </div>
                     </div>

                     <div className={"block-inside block-inside-im" + this.getMethodStyle(1)} onClick={() => this.setMethod(1)} style={{
                        background: 'url(' + require('../../../assets/images/pay/yoomoney.png') + '), #FFFFFF',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center' }}>

                        Банк. карта
                        <div className="sale">
                           Комиссия 2%
                        </div>
                     </div>

                     <div className={"block-inside block-inside-im" + this.getMethodStyle(2)} onClick={() => this.setMethod(2)} style={{
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
                     <div className={"block-inside block-inside-im" + this.getMethodStyle(3)} onClick={() => this.setMethod(3)} style={{
                        background: 'url(' + require('../../../assets/images/pay/qiwi.png') + '), #FFFFFF',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center' }}>

                        Счёт Киви
                        <div className="sale">
                           Комиссия от 0%
                        </div>
                     </div>

                     <div className={"block-inside block-inside-im" + this.getMethodStyle(4)} onClick={() => this.setMethod(4)} style={{
                        background: 'url(' + require('../../../assets/images/pay/qiwi.png') + '), #FFFFFF',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center' }}>

                        Банк. карта
                        <div className="sale">
                           Комиссия от 1%
                        </div>
                     </div>

                     <div className={"block-inside block-inside-im" + this.getMethodStyle(5)} onClick={() => this.setMethod(5)} style={{
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
                     условия <a href='/buy/offer'><b1 className="more">оферты</b1></a>.
                  </div>

                  <div className="button-f" onClick={this.toPay}>
                     Перейти на страницу оплаты
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
export default (BuyComp);

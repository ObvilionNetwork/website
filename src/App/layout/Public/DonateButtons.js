import React from 'react';
import "./DonateButtons.scss"
import Config from "../../../config"

class DonateButtons extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         prices: {

         },
         top: [

         ],
         bottom: [

         ]
      }

      this.getData = this.getData.bind(this);
      this.getData();
   }

   async getData() {
      try {
         const r = await fetch(Config.api_link + 'donate', {
            headers: {
               'Content-Type': 'application/json'
            },
            method: "GET"
         });

         const data = await r.json();
         const arr = [
            ...data.groups,
            ...data.otherPrices,
         ]

         this.setState({
            prices: data,
            top: arr,
         });
      } catch (e) {
         alert('Произошла ошибка при совершении запроса цен!\n' + e);
      }
   }

   render() {

      return(
         <div className='DonateButtons'>
            {
               this.state.top.map(g => <div className="button-lc plus-margin">
                  <div className="title-lc">
                     { g.name.toUpperCase() }
                  </div>

                  <div className="description-lc">
                     { g.description }
                  </div>

                  <div className="price">
                     { g.cost }р/мес
                  </div>

                  <div className="max-price">
                     или { g.foreverCost }р навсегда
                  </div>

                  <a className="button-don " href={ '/buy?id=' + g.textId }>
                     <div className="text">Приобрести</div>
                  </a>

                  <a className="info-don" href={ '/donate/about?id=' + g.textId }>
                     Подробнее >
                  </a>
               </div>)
            }
         </div>
      )
   }
}

export default (DonateButtons);

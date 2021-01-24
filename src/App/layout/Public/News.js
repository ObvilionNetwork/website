import React from 'react';
import "./News.scss"

class News extends React.Component {
   render() {
      const user = JSON.parse(window.localStorage.getItem('user'));

      return(
         <div className='News'>
            <div className="news">
               Новости:
            </div>

            <div className="lm-news">
               Глобальное обновление сайта, добавлен личный кабинет
            </div>

            <div className="lm-news">
               Произошёл вайп на сервере HiTech, обновление до 1.12.2
            </div>
         </div>
      )
   }
}

export default (News);

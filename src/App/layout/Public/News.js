import React from 'react';
import "./News.scss"

class News extends React.Component {
   render() {
      //const user = JSON.parse(window.localStorage.getItem('user'));

      return(
         <div className='News'>
            <div className="news">
               Новости:
            </div>

            <div className="lm-news">
               Обновлён дизайн сайта, добавлена страница выдачи подарков
            </div>

            <div className="lm-news">
               Добавлена страница правил проекта
            </div>
         </div>
      )
   }
}

export default (News);

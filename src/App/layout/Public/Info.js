import React from 'react';
import "./Info.scss"

class Info extends React.Component {
   render() {
      const user = JSON.parse(window.localStorage.getItem('user'));

      return(
         <div className='Info'>
            <div className='info-table info-user'>
               Ку
            </div>

            <div className='info-table info-discord'>
кук
            </div>

            <div className='info-table info-group'>
впвп
            </div>
         </div>
      )
   }
}

export default (Info);

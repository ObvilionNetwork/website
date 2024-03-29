import React from 'react';
import "./Info.scss"

class Info extends React.Component {
   render() {
      const user = JSON.parse(window.localStorage.getItem('user'));

      const group = user.groups.length > 0 ? user.groups.sort((a,b) => b.id - a.id)[0] : null;

      return(
         <div className='Info'>
            <div className='info-table info-user'>
               <div>
                  <div className="name-u">Логин</div>
                  <div className="value-u">{user.name}</div>
                  <div className="button-icon">
                     <img src={require('../../../assets/images/edit.png')} />
                  </div>
               </div>

               <div>
                  <div className="name-u">E-mail</div>
                  <div className="value-u">{user.email}</div>
                  <div className="button-icon">
                     <img src={require('../../../assets/images/edit.png')} />
                  </div>
               </div>

               <div>
                  <div className="name-u">Пароль</div>
                  <div className="value-u">***********</div>
                  <div className="button-icon">
                     <img src={require('../../../assets/images/edit.png')} />
                  </div>
               </div>
            </div>

            <div className='info-table info-discord'>
               <div>
                  <div className="name-u">Discord</div>
                  <div className="value-u">Не подключен</div>
                  <div className="button-icon">
                     <img src={require('../../../assets/images/settings.png')} />
                  </div>
               </div>

               <div>
                  <div className="name-u">2FA</div>
                  <div className="value-u">Выключен</div>
                  <div className="button-icon">
                     <img src={require('../../../assets/images/settings.png')} />
                  </div>
               </div>
            </div>

            <div className='info-table info-group'>
               {
                  user.money !== undefined ? <div>
                     <div className="name-u">Баланс</div>
                     <div className="value-u vu2">{user.money} p.</div>
                  </div> : undefined
               }

               <div>
                  <div className="name-u">Привилегия</div>
                  <div className="value-u vu2" style={{color: group ? group.color : "#bc9bff"}}>{group ? group.name : 'Не указано'}</div>
               </div>

               {
                  group && user.prefix === group.name
                     ? undefined
                     : <div>
                        <div className="name-u">Префикс</div>
                        <div className="value-u vu2" style={{color: user.prefixColor ? user.prefixColor : "#bc9bff"}}>{user.prefix}</div>
                     </div>
               }
               <div>
                  <div className="name-u">Дата окончания</div>
                  <div className="value-u vu2">{user.group ? user.group.end ? user.group.end : 'Нет' : 'Нет'}</div>
               </div>
            </div>
         </div>
      )
   }
}

export default (Info);

import React from 'react';
import "./RulesComp.scss"

import { rules, explanations } from "../../../pages/Public/rules.json"

class RulesComp extends React.Component {
   render() {
      return(
         <div className='parent-block'>
            {
               rules.map(doc => {
                  return <div className="asd">
                     <div className='title-rcs'>
                        { doc.title }
                     </div>

                     {
                        doc.content.map(dc => {
                           return <div className='rule'>
                              <r>
                                 <r className='title-rcd'>
                                    { dc.title }
                                 </r>
                                 <r className='title-rcf'>
                                    { dc.text }
                                 </r>
                                 <div style={{ marginTop: dc.content !== undefined ? '0.2vw' : '0vw' }}>
                                    {
                                       dc.content ? dc.content.map((dv, i) => {
                                          return <div style={{ marginTop: i === 0 ? '0.45vw' : undefined, marginLeft: '0.9vw', marginBottom: '0.45vw'}}>
                                             <r>
                                                <r className='title-rcd'>
                                                   { dv.title }
                                                </r>
                                                <r className='title-rcf'>
                                                   { dv.text }
                                                </r>
                                             </r>
                                          </div>
                                       }) : null
                                    }
                                 </div>
                              </r>
                           </div>
                        })
                     }
                  </div>
               })
            }
         </div>
      )
   }
}

export default (RulesComp);

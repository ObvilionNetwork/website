import React, { Component } from 'react';

import Aux from "../../App/components/_Aux";
import Navbar from "../../App/layout/Public/Navbar";
import HomePanel from "../../App/layout/Public/HomePanel";
import "../../assets/scss/style.scss"

class Home extends Component{
        
render() {
   return ( 
        
        <Aux>
             <Navbar />
             <HomePanel />
              <div className="News">
                  <div>Новости</div>
             </div>
        </Aux>
        
    )
}

}


export default Home;

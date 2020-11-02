import React from 'react';

import "../../../assets/scss/style.scss"
import "./Description.scss"

class Description extends React.Component {
    render() {
        return(
            <div className="logo">
                <img src={require('../../../assets/images/logo.png')} />
            </div>
            
        )
    }
}

export default (Description);

import React from 'react';
import './Modal.scss';

class Modal extends React.Component {
    render() {
        return <div className={ 'modal' + (this.props.active ? ' active' : '') }
                    onClick={() => this.props.setActive(false)}>

            <div className='content' onClick={(e) => e.stopPropagation()}>
                { this.props.children }
            </div>

        </div>;
    }
}

export default Modal;

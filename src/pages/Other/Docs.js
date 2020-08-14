import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

const styles = {
    size17: {
        'font-size': '17px',
        'padding-left': '6px',
        'color': 'white'
    },
    post: {
        'color': '#4eb6ff',
        'font-size': '19px',
        'font-weight': 'bolder'
    },
    get: {
        'color': '#4eff6b',
        'font-size': '19px',
        'font-weight': 'bolder'
    },
    delete: {
        'color': '#ff4e4e',
        'font-size': '19px',
        'font-weight': 'bolder'
    }
  };

class Docs extends Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title='Авторизация' isOption>
                            <p> 
                                <span style={styles.post}>POST </span> 
                                <span style={styles.size17}>/api/auth/register/ </span> 
                            </p>
                            <div style={{backgroundColor: '#343f5a'}} className='text-white p-2'>
                                <p>Что та тута</p>
                            </div>

                            <p/>

                            <p> 
                                <span style={styles.post}>POST </span> 
                                <span style={styles.size17}>/api/auth/login?login=test?password=test </span> 
                            </p>
                            <div style={{backgroundColor: '#343f5a'}} className='text-white p-2'>
                                <p>Что та тута</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
} 

export default Docs;
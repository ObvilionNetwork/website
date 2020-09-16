import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Card from "../../App/components/MainCard";

import '../../assets/scss/buttons.css';


class APITest extends Component {
    render() {

        return (
            <Aux>
                <Row>
                    <Col md={6}>
                        <Card title={"Body"}>
                            <form onSubmit={this.handleSubmit}>
                                <label style={{color: '#a9b7d0', fontSize: '14px'}}>
                                    Название: 
                                    <input type="text" style={{margin: '0 13px 0 7px', color: 'white', backgroundColor: '#3a4151', border: 0}} value={this.state.bodyVal} onChange={this.handleChange1}/>

                                    Значение: 
                                    <input type="text" style={{margin: '0 13px 0 7px', color: 'white', backgroundColor: '#3a4151', border: 0}} value={this.state.bodyVal} onChange={this.handleChange1}/>
                                </label>

                                <button onClick={() => {
                                    
                                }} style={{padding: '8px 12px'}} className="button-blue">Добавить</button>
                            </form>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title={"Headers"}>
                            
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title={"Settings"}>
                            
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title={"Result"}>
                            
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
} 

export default APITest;
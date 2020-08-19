import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../App/components/Aux";
import Card from "../../App/components/MainCard";

import '../../assets/scss/buttons.css';

class TodoList extends Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Col md={4}>
                        <Card title={"TO DO"}>

                                <button onClick={console.log("test")} className="button-blue">Добавить</button>
                            
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card title={"В процессе"}>
                            
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card title={"Закончено"}>
                            
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
} 

export default TodoList;
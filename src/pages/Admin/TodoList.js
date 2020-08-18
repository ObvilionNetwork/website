import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../App/components/Aux";
import Card from "../../App/components/MainCard";


class TodoList extends Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Col md={6}>
                        <Card title={""}>
                            
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title={""}>
                            
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
} 

export default TodoList;
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../App/components/Aux";
import Card from "../../App/components/MainCard";
import LineChart from '../../App/components/LineChart';


class SystemUsage extends Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Col md={6}>
                        <Card title={"Загрузка CPU [Сервер #1]"}>
                            <LineChart name='Загрузка CPU' link='https://api.jsonbin.io/b/5f3ab2d2af209d1016bd5664'/>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title={"Загрузка RAM [Сервер #1]"}>
                            <LineChart name='Загрузка RAM' link=''/>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
} 

export default SystemUsage;
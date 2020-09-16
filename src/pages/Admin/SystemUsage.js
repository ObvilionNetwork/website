import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Card from "../../App/components/MainCard";
import LineChart from '../../App/components/LineChart';


class SystemUsage extends Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Col md={6}>
                        <Card title={"Загрузка CPU [Сервер #1]"}>
                            <LineChart name='Загрузка CPU' link='https://my-json-server.typicode.com/ObvilionNetwork/test-json-db/cpuload'/>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title={"Загрузка RAM [Сервер #1]"}>
                            <LineChart name='Загрузка RAM' link='https://my-json-server.typicode.com/ObvilionNetwork/test-json-db/ramload'/>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
} 

export default SystemUsage;
import React, { Component } from 'react';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

import Aux from "../../../App/components/_Aux";
import Card from "../../../App/components/MainCard";
import Config from "../../../config";
import './Mods/Mods.scss';

class Clients extends Component {
    state = {
        clients: []
    }

    clientTypes = {
        FORGE: 'Forge',
        FABRIC: 'Fabric',
        LITE_LOADER: 'Lite loader',
        VANILLA: 'Vanilla'
    }

    constructor(props) {
        super(props);

        this._onDataUpdate = this._onDataUpdate.bind(this);
    }

    _onDataUpdate(data) {
        this.setState({
            ...data
        });
    }

    componentDidMount() {
        fetch(Config.api_link + 'control/clients', {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        })
            .then(async data => {
                const out = await data.json();

                if (out.error || !out.data) {
                    return console.error(out);
                }

                this._onDataUpdate({ clients: out.data });
            })
            .catch(console.error)
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title="Сборка">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Введите название клиента для поиска"
                                    aria-label="Введите название клиента для поиска"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button href='clients/create'>Создать сборку</Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <h4 className='mt-5'>Результат поиска</h4>
                            <hr/>

                            <div className="parent-block">
                                {
                                    (() => {
                                        const result = []

                                        for (const el of this.state.clients) {
                                            result.push(
                                                <div className="asd" onClick={() => window.location='clients/edit?id=' + el.id}>
                                                    <p className="titl">
                                                        {el.name}
                                                    </p>
                                                    <p onClick={() => window.location='clients/edit?id=' + el.id} className="desc endd">
                                                        - {this.clientTypes[el.type] || el.type || 'Forge'} {el.version || '1.7.10'}
                                                    </p>
                                                </div>
                                            )
                                        }

                                        return result;
                                    })()
                                }
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Clients;

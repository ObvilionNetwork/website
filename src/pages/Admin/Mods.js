import React, { Component } from 'react';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Card from "../../App/components/MainCard";
import Config from "../../config";
import './Mods.scss';

class Mods extends Component {
    state = {
        data: {
            mods: []
        }
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
            data
        });
    }

    componentDidMount() {
        fetch(Config.api_link + 'control/mods', {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        })
            .then(async data => {
                const out = await data.json();

                if (out.error || !out.data) {
                    return console.error(out);
                }

                this._onDataUpdate(out.data);
            })
            .catch(console.error)
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title="Моды">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Введите название мода для поиска"
                                    aria-label="Введите название мода для поиска"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button href='mods/upload'>Загрузить мод</Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <h4 className='mt-5'>Результат поиска</h4>
                            <hr/>

                            <div className="parent-block">
                                {
                                    (() => {
                                        const result = []

                                        for (const el of this.state.data.mods) {
                                            result.push(
                                                <div className="asd">
                                                    <p className="titl">
                                                        {el.name}
                                                    </p>
                                                    <p onClick={() => window.location='mods/edit?id=' + el.id} className="desc endd">
                                                        - {el.version} - {this.clientTypes[el.clientType] || el.clientType || 'Forge'} {el.clientVersion || '1.7.10'}
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

export default Mods;

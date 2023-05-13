import React, { Component } from 'react';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';

import Aux from "../../../../App/components/_Aux";
import Card from "../../../../App/components/MainCard";
import Config from "../../../../config";
import '../Mods/Mods.scss';
import { declination } from "../../../../utils/format";
import Loader from "../../../../App/layout/Loader";

class ClientMods extends Component {
    state = {
        data: null
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
        fetch(Config.api_link + 'control/clientmods', {
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
                        <Card title="Клиентские моды">
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Введите название категории для поиска"
                                    aria-label="Введите название категории для поиска"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button href='clientmods/create'>Создать категорию</Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <h4 className='mt-5'>Результат поиска</h4>
                            <hr/>

                            <div className="parent-block">
                                {
                                    (() => {
                                        const result = []

                                        if (!this.state.data) {
                                            return;
                                        }

                                        for (const el of this.state.data) {
                                            const c = el._count?.mods || 0;

                                            result.push(
                                                <div className="asd">
                                                    <p className="titl">
                                                        {el.name}
                                                    </p>
                                                    <p onClick={() => window.location='clientmods/edit?id=' + el.id} className="desc endd">
                                                        {c} {declination(c, ['мод', 'мода', 'модов'])} - {this.clientTypes[el.type] || el.type || 'Forge'} {el.version || '1.7.10'}
                                                    </p>
                                                </div>
                                            )
                                        }

                                        if (result.length === 0) {
                                            return <div className="asd">
                                                <p className="titl">
                                                    А здесь ничего нет :(
                                                </p>
                                                <p className="desc endd" style={{ marginLeft: '10px', cursor: 'auto' }}>
                                                    Пока-что здесь пусто, будь первым, создай категорию клиентских модов!
                                                </p>
                                            </div>
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

export default ClientMods;

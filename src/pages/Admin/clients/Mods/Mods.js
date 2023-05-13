import React, { Component } from 'react';
import {Row, Col, Button, InputGroup, FormControl, Form} from 'react-bootstrap';

import Aux from "../../../../App/components/_Aux";
import Card from "../../../../App/components/MainCard";
import Config from "../../../../config";
import './Mods.scss';

class Mods extends Component {
    state = {
        data: {
            mods: []
        },
        sortBy: window.localStorage.getItem('admSortBy') || 'AZ',
        sortCategory: window.localStorage.getItem('admSortCat') || 'ANY',
        searchName: ''
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
        this._updateData = this._updateData.bind(this);
    }

    _onDataUpdate(data) {
        this.setState({
            data
        });
    }

    _updateData(data) {
        this.setState({
            ...data
        });
    }

    componentDidMount() {
        fetch(Config.api_link + 'control/mod/createinfo',
            {
                headers: {
                    Authorization: window.localStorage.getItem('token')
                }
            })
            .then(async (d) => {
                const out = await d.json();

                if (out.error) {
                    return console.error(out);
                }

                this._updateData({ fromApi: out });
            })
            .catch(console.error)

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
                                    onChange={(e) => this.setState({ searchName: e.target.value }) }
                                />
                                <InputGroup.Append>
                                    <Button href='mods/upload'>Загрузить мод</Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <Row className='mt-4'>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Сортировать по</Form.Label>
                                        <Form.Control id='category' as="select" onChange={(e) => {
                                            this.setState({ sortBy: e.target.value });
                                            window.localStorage.setItem('admSortBy', e.target.value);
                                        }}>
                                            <option value='AZ' selected={this.state.sortBy === 'AZ'}>По алфавиту А-я</option>
                                            <option value='ZA' selected={this.state.sortBy === 'ZA'}>По алфавиту я-А</option>
                                            <option value='DATA' selected={this.state.sortBy === 'DATA'}>По дате создания (возр.)</option>
                                            <option value='DATA_I' selected={this.state.sortBy === 'DATA_I'}>По дате создания (убыв.)</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Категория мода</Form.Label>
                                        <Form.Control id='category' as="select" onChange={(e) => {
                                            this.setState({ sortCategory: e.target.value });
                                            window.localStorage.setItem('admSortCat', e.target.value);
                                        }}>
                                            <option value='ANY' selected={this.state.sortCategory === 'ANY'}>Все возможные</option>
                                            {this.state.fromApi && this.state.fromApi.categories ? Object.keys(this.state.fromApi.categories).map(value => {
                                                return <option value={value} selected={this.state.sortCategory === value}>{this.state.fromApi.categories[value]}</option>;
                                            }) : null}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <h4 className='mt-5'>Результат поиска</h4>
                            <hr/>

                            <div className="parent-block">
                                {
                                    (() => {
                                        const result = []

                                        const arr = this.state.data.mods;

                                        if (this.state.sortBy === 'AZ') {
                                            arr.sort((a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                                        }
                                        else if (this.state.sortBy === 'ZA') {
                                            arr.sort((b,a) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                                        }
                                        else if (this.state.sortBy === 'DATA') {
                                            arr.sort((b,a) => a.id - b.id)
                                        }
                                        else if (this.state.sortBy === 'DATA_I') {
                                            arr.sort((a,b) => a.id - b.id)
                                        }

                                        const sc = this.state.searchName.toLowerCase().trim();

                                        if (this.state.sortCategory !== 'ANY') {
                                            for (const el of arr) {
                                                if (el.category === this.state.sortCategory && el.name.toLowerCase().includes(sc))
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
                                        } else {
                                            for (const el of arr) {
                                                if (el.name.toLowerCase().includes(sc))
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
                                        }

                                        if (result.length === 0) {
                                            result.push(
                                                <div className="asd">
                                                    <p className="titl">
                                                        Ничего не найдено
                                                    </p>
                                                    <p className="endd" style={{marginLeft: '10px'}}>
                                                        Попробуйте обновить настройки поиска
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

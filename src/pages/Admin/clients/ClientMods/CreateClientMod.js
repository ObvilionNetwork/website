import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { defaultStyles as styles } from "../../../../utils/reactSelectorStyles";

import Aux from "../../../../App/components/_Aux";
import Card from "../../../../App/components/MainCard";
import Select from 'react-select';
import Config from "../../../../config";
import Modal from "../../../../App/components/Modal";

import '../../Buttons.scss'

class CreateClientMod extends Component {
    out = [];
    state = {
        version: '',
        clientType: '',
        types: {
            clientTypes: {
                FORGE: 'Forge',
                FABRIC: 'Fabric',
                LITE_LOADER: 'Lite loader'
            },
            gameVersions: [
                '1.7.10',
                '1.12.2'
            ]
        },
        mods: []
    }

    constructor(props) {
        super(props);

        this._onDataUpdate = this._onDataUpdate.bind(this);
        this.confirmReq = this.confirmReq.bind(this);
    }

    _onDataUpdate(data) {
        this.setState({
            data
        });
    }

    confirmReq() {
        const g = (name) => document.getElementById(name).value;

        const data = {
            name: g('name'),
            description: g('description'),
            type: g('clientType'),
            version: g('version'),

            mods: this.out.map(c=>c.value),
        }

        fetch(Config.api_link + 'control/clientmod/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            }
        })
            .then(async data => {
                const out = await data.json();

                if (out.error || !out.data) {
                    return console.error(out);
                }

                console.log(out.data)

                this.setState({ saved: true, id: out.data.id });
                //this._onDataUpdate(out.data);
            })
            .catch(console.error)
    }

    cancelReq() {
        window.history.go(-1);
    }

    componentDidMount() {
        fetch(Config.api_link + 'control/mod/createinfo', {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        })
            .then(async data => {
                const out = await data.json();

                if (out.error || !out) {
                    return console.error(out);
                }

                this.setState({ types: out });

                this.setState({
                    version: document.getElementById('version').value,
                    clientType: document.getElementById('clientType').value,
                })
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

                this.setState({ mods: out.data?.mods });
            })
            .catch(console.error)
    }

    render() {
        return (
            <Aux>
                <Modal active={ this.state.saved } setActive={() => window.history.go(-1)}>
                    <h4 className='font-weight-bold'>
                        <i className='feather icon-check' style={{ color: '#5be36d' }}/> Категория мода успешно создана
                    </h4>

                    <h5>Вы можете вернуться на предыдущую страницу или остаться</h5>
                    <hr style={{ marginBottom: '20px' }}/>

                    <Row className='mt-4' style={{marginLeft:'1px'}}>
                        <Button className='but-ok' onClick={() => window.history.go(-1)}>Вернуться назад</Button>
                        <Button className='but-cancel' onClick={() => window.location='edit?id=' + this.state.id}>Остаться</Button>
                    </Row>
                </Modal>

                <Row>
                    <Col>
                        <Card title="Создание категории клиентских модов">
                            <h4>Основные настройки</h4>
                            <hr/>

                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Название категории</Form.Label>
                                            <Form.Control id='name' placeholder="Введите название" />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Тип загрузчика категории</Form.Label>
                                            <Form.Control id='clientType' as="select"
                                                          onChange={()=>this.setState({clientType: document.getElementById('clientType').value})}>
                                                {this.state.types?.clientTypes ? Object.keys(this.state.types.clientTypes).map(value => {
                                                    return <option value={value}>{this.state.types.clientTypes[value]}</option>;
                                                }) : null}
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Описание категории</Form.Label>
                                            <Form.Control id='description' as="textarea"
                                                          placeholder="Введите описание категории" rows="3" />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Версия сборки</Form.Label>
                                            <Form.Control id='version' as="select" onChange={(e)=>this.setState({version: document.getElementById('version').value})}>
                                                {
                                                    this.state.types?.gameVersions ? this.state.types.gameVersions.map(value =>
                                                        <option defaultValue={value}>{value}</option>) : null
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>

                            <h4 style={{marginTop: '2rem'}}>Выберите клиентские моды</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={
                                    (()=>{
                                        const res = [];
                                        for (const c of this.state.mods) {
                                            if (c.clientType === this.state.clientType
                                                && c.clientVersion === this.state.version) {

                                                res.push({ value: c.id, label: c.name + ' ' + c.version });
                                            }
                                        }
                                        return res;
                                    })()
                                }
                                closeMenuOnSelect={false}
                                placeholder='Выберите клиентские моды'
                                styles = {styles}
                                onChange={(l) => this.out = l}
                            />

                            <Row className='mt-5' style={{marginLeft:'1px'}}>
                                <Button className='but-ok' onClick={this.confirmReq}>Сохранить</Button>
                                <Button className='ml-1 but-cancel' onClick={this.cancelReq}>Отмена</Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default CreateClientMod;

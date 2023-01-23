import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { defaultStyles as styles } from "../../../utils/reactSelectorStyles";

import Aux from "../../../App/components/_Aux";
import Card from "../../../App/components/MainCard";
import Select from 'react-select';
import Config from "../../../config";
import Modal from "../../../App/components/Modal";

import '../Buttons.scss'

class CreateClient extends Component {
    sup = {
        mods: [],
        clientCategories: [],
        libraries: [],
        natives: []
    }

    state = {
        version: '1.7.10',
        data: {
            types: {
                clients: [],
                optionalMods: [],
                cores: [],
                java: [
                    {
                        id: 'jre8u275',
                        name: 'Java 8 - 275 JRE'
                    }
                ],
                versions: [
                    '1.7.10',
                    '1.12.2'
                ],
                mods: [],
                libraries: [],
                natives: [],
            },
            client: {
                id: 0,
                name: '',
                description: '',
                version: '',
                icon: '',
                background: '',
                coreMod: {
                    id: 0,
                    name: ''
                },
                optionalMods: [],
                libraries: [],
                mods: [],
                natives: [],
                configsPath: '',
                type: 'FORGE',
                java: ''
            }
        }
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
            version: g('version'),
            icon: g('icon'),
            background: g('background'),
            coreModId: +g('core'),

            mods: this.sup.mods.map(c=>c.value),
            optionalMods: this.sup.clientCategories.map(c=>c.value),
            libraries: this.sup.libraries.map(c=>c.value),
            natives: this.sup.natives.map(c=>c.value),

            configsPath: g('configsPath'),
            java: g('java'),
        }

        fetch(Config.api_link + 'control/client/create', {
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
        fetch(Config.api_link + 'control/client/createinfo', {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        })
            .then(async data => {
                const out = await data.json();

                if (out.error || !out.data) {
                    return console.error(out);
                }

                console.log(out.data)

                this._onDataUpdate({ types: out.data, client: this.state.data.client });
            })
            .catch(console.error)
    }

    render() {
        return (
            <Aux>
                <Modal active={ this.state.saved } setActive={() => window.history.go(-1)}>
                    <h4 className='font-weight-bold'>
                        <i className='feather icon-check' style={{ color: '#5be36d' }}/> Клиент успешно создан
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
                        <Card title="Настройка сборки">
                            <h4>Основные настройки</h4>
                            <hr/>

                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Название сборки</Form.Label>
                                            <Form.Control id='name' placeholder="Введите название"
                                                          defaultValue={this.state.data.client.name} />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Иконка сборки</Form.Label>
                                        <Form.Control id='icon' placeholder="Введите ссылку на картинку"
                                                      defaultValue={this.state.data.client.icon} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Описание сборки</Form.Label>
                                            <Form.Control id='description' as="textarea" placeholder="Введите описание сборки"
                                                          rows="3" defaultValue={this.state.data.client.description} />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Фон сборки в лаунчере</Form.Label>
                                        <Form.Control id='background' placeholder="Введите ссылку на картинку"
                                                      defaultValue={this.state.data.client.background} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Версия сборки</Form.Label>
                                            <Form.Control id='version' as="select" onChange={(e)=>this.setState({version: document.getElementById('version').value})}>
                                                {
                                                    this.state.data.types.versions.map(value => {
                                                        if (this.state.data.client.version === value) {
                                                            return <option selected defaultValue={value}>{value}</option>
                                                        }

                                                        return <option defaultValue={value}>{value}</option>
                                                    })
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Ядро сборки</Form.Label>
                                        <Form.Control id='core' as="select">
                                            {
                                                this.state.data.types.cores.map(value => {
                                                    if (this.state.data.client.coreMod.id === value.id) {
                                                        this.state.data.client.coreMod.clientType = value.clientType;
                                                        return <option value={value.id} selected>{value.name}</option>
                                                    }

                                                    return <option value={value.id} onChange={()=>this.state.data.client.coreMod.clientType = value.clientType}>{value.name}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Версия Java</Form.Label>
                                        <Form.Control id='java' as="select">
                                            {
                                                this.state.data.types.java.map(value => {
                                                    if (value.id === this.state.data.client.java) {
                                                        return <option selected value={value.id}>{value.name}</option>;
                                                    }

                                                    return <option value={value.id}>{value.name}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Путь до конфигов</Form.Label>
                                        <Form.Control id='configsPath' placeholder="Введите путь до конфигов"
                                                      defaultValue={this.state.data.client.configsPath} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <h4 style={{marginTop: '2rem'}}>Выберите моды сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={
                                    (()=>{
                                        const res = [];
                                        for (const c of this.state.data.types.mods) {
                                            if (c.clientType === this.state.data.client.coreMod.clientType
                                                && c.clientVersion === document.getElementById('version').value) {

                                                res.push({ value: c.id, label: c.name + ' ' + c.version });
                                            }
                                        }
                                        return res;
                                    })()
                                }
                                closeMenuOnSelect={false}
                                placeholder='Выберите моды'
                                styles = {styles}
                                onChange={(l) => this.sup.mods = l}
                            />

                            <h4 className='mt-5'>Выберите категории клиентских модов сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={
                                    this.state.data.types.optionalMods.map(d => ({ value: d.id, label: d.name }))
                                }
                                closeMenuOnSelect={false}
                                placeholder='Выберите категории клиентских модов'
                                styles = {styles}
                                onChange={(l) => this.sup.clientCategories = l}
                            />

                            <h4 className='mt-5'>Выберите библиотеки сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={
                                    this.state.data.types.libraries.map(d => ({ value: d.id, label: d.name }))
                                }
                                closeMenuOnSelect={false}
                                placeholder='Выберите библиотеки'
                                styles = {styles}
                                onChange={(l) => this.sup.libraries = l}
                            />

                            <h4 className='mt-5'>Выберите нативы сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={
                                    this.state.data.types.natives.map(d => ({ value: d.id, label: d.name }))
                                }
                                closeMenuOnSelect={false}
                                placeholder='Выберите нативы'
                                styles = {styles}
                                onChange={(l) => this.sup.natives = l}
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

export default CreateClient;

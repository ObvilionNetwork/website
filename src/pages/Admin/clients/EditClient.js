import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { defaultStyles as styles } from "../../../utils/reactSelectorStyles";

import Aux from "../../../App/components/_Aux";
import Card from "../../../App/components/MainCard";
import Select from 'react-select';
import Config from "../../../config";
import Modal from "../../../App/components/Modal";

import '../Buttons.scss'

class EditClient extends Component {
    state = {
        mods_select: [],
        client_mods_select: [],
        libs_select: [],
        natives_select: [],

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
        this.confirmRemove = this.confirmRemove.bind(this);
    }

    _onDataUpdate(data) {
        this.setState({
            data
        });
    }

    confirmReq() {
        const urlParams = new URLSearchParams(window.location.search);
        const g = (name) => document.getElementById(name).value;

        const data = {
            id: urlParams.get('id'),
            name: g('name'),
            description: g('description'),
            version: g('version'),
            icon: g('icon'),
            background: g('background'),
            coreModId: +g('core'),

            mods: this.state.mods_select.map(c=>c.value),
            optionalMods: this.state.client_mods_select.map(c=>c.value),
            libraries: this.state.libs_select.map(c=>c.value),
            natives: this.state.natives_select.map(c=>c.value),

            configsPath: g('configsPath'),
            java: g('java'),
        }

        fetch(Config.api_link + 'control/client/edit', {
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

                this.setState({
                    saved: true,
                    //data: { client: out.data, types: this.state.data.types }
                });
            })
            .catch(console.error)
    }

    confirmRemove() {
        const urlParams = new URLSearchParams(window.location.search);

        fetch(Config.api_link + 'control/client?id=' + urlParams.get('id'),
            {
                method: 'DELETE',
                headers: {
                    Authorization: window.localStorage.getItem('token')
                }
            })
            .then(async (d) => {
                const out = await d.json();

                if (out.error) {
                    return console.error(out);
                }

                this.setState({
                    deleted: true
                });
            })
            .catch(console.error)
    }

    cancelReq() {

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

                this.setState({
                    data: { types: out.data, client: this.state.data.client }
                })
            })
            .catch(console.error)

        const urlParams = new URLSearchParams(window.location.search);

        fetch(Config.api_link + 'control/client?id=' + urlParams.get('id'), {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        })
            .then(async data => {
                const out = await data.json();

                if (out.error || !out.data) {
                    this.setState({ id_invalid_error: true })
                    return console.error(out);
                }

                this.setState({
                    client_mods_select: out.data.optionalMods.map(m=>({ value: m.id, label: m.name })),
                    mods_select: out.data.mods.map(m=>({ value: m.id, label: m.name + ' ' + m.version})),
                    libs_select: out.data.libraries.map(m=>({ value: m.id, label: m.name + ' ' + m.version})),
                    natives_select: out.data.natives.map(m=>({ value: m.id, label: m.name + ' ' + m.version})),

                    data: { client: out.data, types: this.state.data.types }
                })
            })
            .catch(console.error)
    }

    render() {

        return (
            <Aux>
                <Modal active={ this.state.deleted } setActive={() => window.history.go(-1)}>
                    <h4 className='font-weight-bold'>
                        <i className='feather icon-check' style={{ color: '#5be36d' }}/> Клиент успешно удалён
                    </h4>

                    <h5>Вы можете вернуться на предыдущую страницу</h5>
                    <hr style={{ marginBottom: '20px' }}/>

                    <Button className='but-ok' onClick={() => window.history.go(-1)}>Вернуться назад</Button>
                </Modal>

                <Modal active={ this.state.saved } setActive={() => window.history.go(-1)}>
                    <h4 className='font-weight-bold'>
                        <i className='feather icon-check' style={{ color: '#5be36d' }}/> Клиент успешно обновлен
                    </h4>

                    <h5>Вы можете вернуться на предыдущую страницу или остаться</h5>
                    <hr style={{ marginBottom: '20px' }}/>

                    <Row className='mt-4' style={{ marginLeft:'1px' }}>
                        <Button className='but-ok' onClick={() => window.history.go(-1)}>Вернуться назад</Button>
                        <Button className='but-cancel' onClick={() => this.setState({ saved: false })}>Остаться</Button>
                    </Row>
                </Modal>

                <Modal active={ this.state.id_invalid_error } setActive={() => window.history.go(-1)}>
                    <h4 className='font-weight-bold'>
                        <i className='feather icon-alert-circle' style={{ color: '#d55562' }}/> Ошибка загрузки клиента
                    </h4>

                    <h5>Клиент с указанным id не найден!</h5>
                    <hr style={{ marginBottom: '20px' }}/>

                    <Button onClick={() => window.history.go(-1)}>Вернуться назад</Button>
                </Modal>

                <Row>
                    <Col>
                        <Card title="Настройка сборки">
                            <h4>Основные настройки</h4>
                            <hr/>

                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="">
                                            <Form.Label>Название сборки</Form.Label>
                                            <Form.Control id='name' placeholder="Введите название"
                                                          defaultValue={this.state.data.client.name} />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="">
                                        <Form.Label>Иконка сборки</Form.Label>
                                        <Form.Control id='icon' placeholder="Введите ссылку на картинку"
                                                      defaultValue={this.state.data.client.icon} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="">
                                            <Form.Label>Описание сборки</Form.Label>
                                            <Form.Control id='description' as="textarea" placeholder="Введите описание сборки"
                                                          rows="3" defaultValue={this.state.data.client.description} />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="">
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
                                            <Form.Control id='version' as="select">
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
                                    <Form.Group controlId="">
                                        <Form.Label>Ядро сборки</Form.Label>
                                        <Form.Control id='core' as="select">
                                            {
                                                this.state.data.types.cores.map(value => {
                                                    if (this.state.data.client.coreMod.id === value.id) {
                                                        return <option value={value.id} selected>{value.name}</option>
                                                    }

                                                    return <option value={value.id}>{value.name}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="">
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
                                    <Form.Group controlId="">
                                        <Form.Label>Путь до конфигов</Form.Label>
                                        <Form.Control id='configsPath' placeholder="Введите путь до конфигов"
                                                      defaultValue={this.state.data.client.configsPath} />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <h4 style={{marginTop: '2rem'}}>Выберите моды сборки</h4>
                            <hr/>

                            {
                                (()=>{
                                    const out = this.state.data.types.mods.map(d => ({ value: d.id, label: d.name + ' ' + d.version }));

                                    return <Select
                                        isMulti
                                        value={this.state.mods_select}
                                        options={out}
                                        closeMenuOnSelect={false}
                                        placeholder='Выберите моды'
                                        styles = {styles}
                                        onChange={(l) => this.setState({mods_select: l})}
                                    />
                                })()
                            }

                            <h4 className='mt-5'>Выберите категории клиентских модов сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                value={this.state.client_mods_select}
                                options={
                                    this.state.data.types.optionalMods.map(d => ({ value: d.id, label: d.name }))
                                }
                                closeMenuOnSelect={false}
                                placeholder='Выберите категории клиентских модов'
                                styles = {styles}
                                onChange={(l) => this.setState({client_mods_select: l})}
                            />

                            <h4 className='mt-5'>Выберите дополнительные библиотеки сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={
                                    this.state.data.types.libraries.map(d => ({ value: d.id, label: d.name }))
                                }
                                value={this.state.libs_select}
                                closeMenuOnSelect={false}
                                placeholder='Выберите дополнительные библиотеки'
                                styles = {styles}
                                onChange={(l) => this.setState({ libs_select: l })}
                            />

                            <h4 className='mt-5'>Выберите дополнительные нативы сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={
                                    this.state.data.types.natives.map(d => ({ value: d.id, label: d.name }))
                                }
                                value={this.state.natives_select}
                                closeMenuOnSelect={false}
                                placeholder='Выберите дополнительные нативы'
                                styles = {styles}
                                onChange={(l) => this.setState({ natives_select: l })}
                            />

                            <Row className='mt-5' style={{marginLeft:'1px'}}>
                                <Button className='but-ok' onClick={this.confirmReq}>Сохранить</Button>
                                <Button className='ml-1 but-cancel' onClick={this.cancelReq}>Отмена</Button>
                                <Button className='but-remove' onClick={this.confirmRemove} style={{ marginRight: '15px',marginLeft: 'auto'}}>Удалить</Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default EditClient;

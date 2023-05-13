import React, { Component } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { defaultStyles as styles } from "../../../../utils/reactSelectorStyles";

import Aux from "../../../../App/components/_Aux";
import Card from "../../../../App/components/MainCard";
import Select from 'react-select';
import Config from "../../../../config";
import Modal from "../../../../App/components/Modal";

import '../../Buttons.scss'

class EditClientMod extends Component {
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
        data: {},
        mods: [],
        out_mods: [],
        multiple: true,
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
        const g = (name) => document.getElementById(name).value;
        const urlParams = new URLSearchParams(window.location.search);

        const data = {
            id: urlParams.get('id'),
            name: g('name'),
            description: g('description'),
            type: g('clientType'),
            version: g('version'),
            multiple: document.getElementById('multiple').checked,
            mods: this.state.out_mods.map(c=>c.value),
        }

        fetch(Config.api_link + 'control/clientmod/edit', {
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

                this.setState({ saved: true, id: urlParams.get('id') });
                //this._onDataUpdate(out.data);
            })
            .catch(console.error)
    }

    cancelReq() {
        window.history.go(-1);
    }

    confirmRemove() {
        const urlParams = new URLSearchParams(window.location.search);
        fetch(Config.api_link + 'control/clientmod?id=' + urlParams.get('id'),
            {
                method: 'DELETE',
                headers: {
                    Authorization: window.localStorage.getItem('token')
                }
            })
            .then(async (d) => {
                const out = await d.json();

                if (out.error) {
                    this.setState({ not_found_error: true })
                    return console.error(out);
                }

                this.setState({ deleted: true });
            })
            .catch(console.error)
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

        const urlParams = new URLSearchParams(window.location.search);
        fetch(Config.api_link + 'control/clientmod?id=' + urlParams.get('id'), {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        })
            .then(async data => {
                const out = await data.json();

                if (out.error || !out.data) {
                    this.setState({ not_found_error: true })
                    return console.error(out);
                }

                this.setState({
                    version: out.data.version,
                    clientType: out.data.type,
                    data: out.data,
                    multiple: out.data.multiple,
                    out_mods: out.data.mods.map(m=>({ value: m.id, label: m.name + ' ' + m.version }))
                });
            })
            .catch(console.error)
    }

    render() {
        return (
            <Aux>
                <Modal active={ this.state.saved } setActive={() => window.history.go(-1)}>
                    <h4 className='font-weight-bold'>
                        <i className='feather icon-check' style={{ color: '#5be36d' }}/> Категория успешно обновлена
                    </h4>

                    <h5>Вы можете вернуться на предыдущую страницу или остаться</h5>
                    <hr style={{ marginBottom: '20px' }}/>

                    <Row className='mt-4' style={{marginLeft:'1px'}}>
                        <Button className='but-ok' onClick={() => window.history.go(-1)}>Вернуться назад</Button>
                        <Button className='but-cancel' onClick={() => window.location='edit?id=' + this.state.id}>Остаться</Button>
                    </Row>
                </Modal>

                <Modal active={ this.state.deleted } setActive={() => window.history.go(-1)}>
                    <h4 className='font-weight-bold'>
                        <i className='feather icon-check' style={{ color: '#5be36d' }}/> Категория успешно удалена
                    </h4>

                    <h5>Вы можете вернуться на предыдущую страницу</h5>
                    <hr style={{ marginBottom: '20px' }}/>

                    <Button className='but-ok' onClick={() => window.history.go(-1)}>Вернуться назад</Button>
                </Modal>

                <Modal active={ this.state.not_found_error } setActive={() => window.history.go(-1)}>
                    <h4 className='font-weight-bold'>
                        <i className='feather icon-alert-circle' style={{ color: '#d55562' }}/> Ошибка загрузки категории
                    </h4>

                    <h5>Категория с указанным id не найдена!</h5>
                    <hr style={{ marginBottom: '20px' }}/>

                    <Button onClick={() => window.history.go(-1)}>Вернуться назад</Button>
                </Modal>

                <Row>
                    <Col>
                        <Card title="Редактирование категории клиентских модов">
                            <h4>Основные настройки</h4>
                            <hr/>

                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Название категории</Form.Label>
                                            <Form.Control id='name' placeholder="Введите название" defaultValue={this.state.data.name}/>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Тип загрузчика категории</Form.Label>
                                            <Form.Control id='clientType' as="select" onChange={()=>this.setState({clientType: document.getElementById('clientType').value})}>
                                                {this.state.types?.clientTypes ? Object.keys(this.state.types.clientTypes).map(value => {
                                                    return <option value={value} selected={value===this.state.data.type}>{this.state.types.clientTypes[value]}</option>;
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
                                                          placeholder="Введите описание категории" rows="3"
                                                          defaultValue={this.state.data.description} />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Версия модов</Form.Label>
                                            <Form.Control id='version' as="select" onChange={(e)=>this.setState({version: document.getElementById('version').value})}>
                                                {
                                                    this.state.types?.gameVersions ? this.state.types.gameVersions.map(value =>
                                                        <option defaultValue={value} selected={value===this.state.data.version}>{value}</option>) : null
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group>
                                            <Form.Check id='multiple' style={{ color: '#dedede', marginTop: '5px' }} type="checkbox" label="Разрешить выбор нескольких модов"
                                                        defaultChecked={this.state.data.multiple}/>
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
                                value={this.state.out_mods}
                                closeMenuOnSelect={false}
                                placeholder='Выберите клиентские моды'
                                styles = {styles}
                                onChange={(l) => this.setState({ out_mods: l })}
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

export default EditClientMod;

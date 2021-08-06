import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Card from "../../App/components/MainCard";

import './APITest.scss';

class APITest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            value: '', 
            names: [], 
            values: [], 
            nameh: '',
            valueh: '', 
            namesh: ["Content-Type"], 
            valuesh: ["application/json"], 
            inputStyle: {margin: '0 25px 0 7px', color: 'white', border: 'none', borderBottom: '2px solid #62a8e4', background: 'linear-gradient(#242c3e, #222833)'},
            inputStyleh: {margin: '0 25px 0 7px', color: 'white', border: 'none', borderBottom: '2px solid #62a8e4', background: 'linear-gradient(#242c3e, #222833)'},
            link: window.localStorage.getItem('apiLink'),
            type: 'GET',
            result: '{}',
            code: 'Неизвестен',
        };
  
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeNameh = this.onChangeNameh.bind(this);
        this.onChangeValueh = this.onChangeValueh.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmith = this.onSubmith.bind(this);
        this.onSubmitp = this.onSubmitp.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
    }
  
    onSubmit(event) {
        const ind = this.state.names.indexOf(this.state.name);

        if (ind === -1) {
            this.state.names.push(this.state.name);
            this.state.values.push(this.state.value);
        } else {
            const ok = window.confirm('Перезаписать переменную?');
            if(ok) {
                if(this.state.value !== '') {
                    // eslint-disable-next-line
                    this.state.values[ind] = this.state.value;
                } else {
                    this.state.names.splice(ind, 1);
                    this.state.values.splice(ind, 1);
                }
            } else
            this.setState({inputStyle: {margin: '0 25px 0 7px', color: 'white', border: 'none', borderBottom: '2px solid #f76060', background: 'linear-gradient(#242c3e, #222833)'}});
        }

        this.setState({names: this.state.names, values: this.state.values});

        event.preventDefault();
    }
    onSubmith(event) {
        const ind = this.state.namesh.indexOf(this.state.nameh);

        if (ind === -1) {
            this.state.namesh.push(this.state.nameh);
            this.state.valuesh.push(this.state.valueh);
        } else {
            const ok = window.confirm('Перезаписать переменную?');
            if(ok) {
                if(this.state.valueh !== '') {
                    // eslint-disable-next-line
                    this.state.valuesh[ind] = this.state.valueh;
                } else {
                    this.state.namesh.splice(ind, 1);
                    this.state.valuesh.splice(ind, 1);
                }
            } else
            this.setState({inputStyleh: {margin: '0 25px 0 7px', color: 'white', border: 'none', borderBottom: '2px solid #f76060', background: 'linear-gradient(#242c3e, #222833)'}});
        }

        this.setState({namesh: this.state.namesh, valuesh: this.state.valuesh});

        event.preventDefault();
    }
  
    onChangeName(event) {
        this.setState({inputStyle: {margin: '0 25px 0 7px', color: 'white', border: 'none', borderBottom: '2px solid #62a8e4', background: 'linear-gradient(#242c3e, #222833)'}})
        this.setState({name: event.target.value});
    }
    onChangeValue(event) {
        this.setState({value: event.target.value});
    }

    onChangeNameh(event) {
        this.setState({inputStyleh: {margin: '0 25px 0 7px', color: 'white', border: 'none', borderBottom: '2px solid #62a8e4', background: 'linear-gradient(#242c3e, #222833)'}})
        this.setState({nameh: event.target.value});
    }
    onChangeValueh(event) {
        this.setState({valueh: event.target.value});
    }

    onChangeLink(event) {
        this.setState({link: event.target.value});
        window.localStorage.setItem('apiLink', event.target.value);
    }
    onSubmitp(event) {
        event.preventDefault();

        var xhr = new XMLHttpRequest();
        xhr.open(this.state.type, this.state.link, false);

        this.state.namesh.forEach((e, i) => {
            xhr.setRequestHeader(e, this.state.valuesh[i]);
        });

        let bodyText = "{ ";
        this.state.names.forEach((e, i) => {
            if(this.state.names.length !== i+1) {
                bodyText += `"${e}": "${this.state.values[i]}", `;
            } else {
                bodyText += `"${e}": "${this.state.values[i]}" `;
            }
        });

        bodyText += '}';

        try {
            xhr.send(bodyText);
            this.setState({result: xhr.responseText, code: xhr.status});

            const res = JSON.stringify(JSON.parse(xhr.responseText), 2, 2);
            this.setState({result: res});
        } catch (e) {
            alert(e);
        }


    }
    handleChangeType(event) {
        this.setState({type: event.target.value});
    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col >
                        <Card title="Информация о запросе" isOption>
                            <div className="parent-block">
                                <div className="asdp" style={{ maxWidth: '135px', marginBottom: '10px' }}>
                                    <p style={{ marginTop: '-10px' }} className="title">
                                        Метод запроса
                                    </p>

                                    <select style={{ }} value={this.state.type} onChange={this.handleChangeType}>
                                        <option defaultValue="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                        <option value='PATCH'>PATCH</option>
                                    </select>
                                </div>

                                <div className="asdp" style={{ minWidth: '160px', width: '20%' }}>
                                    <p style={{ marginTop: '-10px' }} className="title">
                                        Ссылка на API
                                    </p>

                                    <input style={{ width: '100%' }} className="input-cui" placeholder="Введите ссылку к API" value="https://obvilionnetwork.ru/api" type="text" />
                                </div>

                                <div className="asdp" style={{ width: '45%' }}>
                                    <p style={{ marginTop: '-10px' }} className="title">
                                        Путь к запросу
                                    </p>

                                    <input style={{ width: '100%' }} className="input-cui" placeholder="Введите ссылку URI" type="text" />
                                </div>

                                <div className="asdp">
                                    <input className="input-cuib" type="button" value="Отправить запрос" />
                                </div>
                            </div>

                            <div className="parent-block">
                                <div className="asd-block" style={{ marginBottom: '10px' }}>
                                    <p className="title ntitle">
                                        Аргументы Query
                                    </p>

                                    <div style={{ color: '#fdf4f4'}}>
                                        <label className="arg-label">#1</label>
                                        <input style={{ width: '35%', marginTop: '10px' }} className="input-cui opk" placeholder="Введите название" type="text" />
                                        <label className="arg-label">=</label>
                                        <input style={{ width: '50%' }} className="input-cui opk" placeholder="Введите значение" type="text" />
                                        <label style={{
                                            fontSize: '1.1rem', fontWeight: 'normal', position: 'fixed',
                                            marginTop: '9px', color: 'rgba(255,173,173,0.9)'
                                        }} className="arg-label">x</label>
                                    </div>
                                    <div style={{ color: '#fdf4f4'}}>
                                        <label className="arg-label">#2</label>
                                        <input style={{ width: '35%', marginTop: '8px' }} className="input-cui opk" placeholder="Введите название" type="text" />
                                        <label className="arg-label">=</label>
                                        <input style={{ width: '50%' }} className="input-cui opk" placeholder="Введите значение" type="text" />
                                        <label style={{
                                            fontSize: '1.1rem', fontWeight: 'normal', position: 'fixed',
                                            marginTop: '8px', color: 'rgba(255,173,173,0.9)'
                                        }} className="arg-label">x</label>
                                    </div>
                                    <input style={{
                                        marginLeft: '7px', marginTop: '10px', borderRadius: '100px',
                                        padding: '0 15px', fontSize: '0.9rem', backgroundColor: 'rgba(159,207,255,0.13)',
                                        marginBottom: '10px'
                                    }} className="input-cuib" type="button" value="Создать Query аргумент" />
                                </div>

                                <div className="asd-block">
                                    <p className="title ntitle">
                                        Header-ы
                                    </p>

                                    <div style={{ color: '#fdf4f4'}}>
                                        <label className="arg-label">#1</label>
                                        <input style={{ width: '35%', marginTop: '10px' }} className="input-cui opk" placeholder="Введите название" type="text" />
                                        <label className="arg-label">=</label>
                                        <input style={{ width: '50%' }} className="input-cui opk" placeholder="Введите значение" type="text" />
                                        <label style={{
                                            fontSize: '1.1rem', fontWeight: 'normal', position: 'fixed',
                                            marginTop: '9px', color: 'rgba(255,173,173,0.9)'
                                        }} className="arg-label">x</label>
                                    </div>
                                    <div style={{ color: '#fdf4f4'}}>
                                        <label className="arg-label">#2</label>
                                        <input style={{ width: '35%', marginTop: '8px' }} className="input-cui opk" placeholder="Введите название" type="text" />
                                        <label className="arg-label">=</label>
                                        <input style={{ width: '50%' }} className="input-cui opk" placeholder="Введите значение" type="text" />
                                        <label style={{
                                            fontSize: '1.1rem', fontWeight: 'normal', position: 'fixed',
                                            marginTop: '8px', color: 'rgba(255,173,173,0.9)'
                                        }} className="arg-label">x</label>
                                    </div>
                                    <input style={{
                                        marginLeft: '7px', marginTop: '10px', borderRadius: '100px',
                                        padding: '0 15px', fontSize: '0.9rem', backgroundColor: 'rgba(159,207,255,0.13)',
                                        marginBottom: '10px'
                                    }} className="input-cuib" type="button" value="Создать заголовок" />
                                </div>

                                <div className="asd-block">
                                    <p className="title ntitle">
                                        Body
                                    </p>
                                    <div contentEditable="true">
                                        <div style={{ color: 'red' }}>
                                            Цветной текст
                                        </div>
                                        <div style={{ color: 'green' }}>
                                            это
                                        </div>
                                        <div style={{ color: 'blue' }}>
                                            круто
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card title="Ответ" isOption>

                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
} 

export default APITest;

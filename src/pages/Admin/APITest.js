import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Card from "../../App/components/MainCard";


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
                    <Col md={6}>
                        <Card title={"Body"}>
                            <form onSubmit={this.onSubmit}>
                                <label style={{color: '#a9b7d0', fontSize: '14px'}}>
                                    Название: 
                                    <input type="text" style={this.state.inputStyle} value={this.state.name} onChange={this.onChangeName}/>

                                    <label>
                                        Значение: 
                                        <input type="text" style={{margin: '0 25px 0 7px', color: 'white', border: 'none', borderBottom: '2px solid #62a8e4', background: 'linear-gradient(#242c3e, #222833)'}} value={this.state.value} onChange={this.onChangeValue}/>
                                    </label>
                                </label>

                                <input type="submit" style={{padding: '8px 12px', border: '0', color: 'white', backgroundColor: '#62a8e4'}} value="Добавить" />
                            </form>

                            {this.state.names.map((e, i) => 
                                <div key={i} style={{color: '#848E9A'}}>
                                    <label style={{color: '#62a8e4', marginRight: '5px'}}>#{i+1}</label>
                                    Название: 
                                    <label key={i + '1'} style={{color: 'white', marginLeft: '5px', marginRight: '12px'}}>
                                        {e}
                                    </label> 

                                    Значение:
                                    <label key={i + '2'} style={{color: 'white', marginLeft: '5px'}}>
                                        {this.state.values[i]}
                                    </label>
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title={"Headers"}>
                            <form onSubmit={this.onSubmith}>
                                <label style={{color: '#a9b7d0', fontSize: '14px'}}>
                                    Название: 
                                    <input type="text" style={this.state.inputStyleh} value={this.state.nameh} onChange={this.onChangeNameh}/>

                                    <label>
                                        Значение: 
                                        <input type="text" style={{margin: '0 25px 0 7px', color: 'white', border: 'none', borderBottom: '2px solid #62a8e4', background: 'linear-gradient(#242c3e, #222833)'}} value={this.state.valueh} onChange={this.onChangeValueh}/>
                                    </label>
                                </label>

                                <input type="submit" style={{padding: '8px 12px', border: '0', color: 'white', backgroundColor: '#62a8e4'}} value="Добавить" />
                            </form>

                            {this.state.namesh.map((e, i) => 
                                <div key={i} style={{color: '#848E9A'}}>
                                    <label style={{color: '#62a8e4', marginRight: '5px'}}>#{i+1}</label>
                                    Название: 
                                    <label key={i + '1'} style={{color: 'white', marginLeft: '5px', marginRight: '12px'}}>
                                        {e}
                                    </label> 

                                    Значение:
                                    <label key={i + '2'} style={{color: 'white', marginLeft: '5px'}}>
                                        {this.state.valuesh[i]}
                                    </label>
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title={"Settings"}>
                            <form onSubmit={this.onSubmitp}>
                                <label style={{color: '#a9b7d0', fontSize: '14px'}}>
                                    Ссылка: 
                                    <input type="text" style={{margin: '0 20px 0 7px', width: '280px', color: 'white', border: 'none', borderBottom: '2px solid #62a8e4', background: 'linear-gradient(#242c3e, #222833)'}} value={this.state.link} onChange={this.onChangeLink}/>
                                </label>

                                <select style={{backgroundColor: '#587ED0', marginRight: '18px', border: '0', outline: 'none', color: 'white'}} value={this.state.type} onChange={this.handleChangeType}>
                                    <option defaultValue="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="DELETE">DELETE</option>
                                    <option value='PATCH'>PATCH</option>
                                </select>

                                <input type="submit" style={{padding: '8px 12px', border: '0', color: 'white', backgroundColor: '#62a8e4'}} value="Отправить" />
                            </form>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title={"Result"}>
                            <p style={{color: '#62a8e4'}}>
                                Статус: {this.state.code}</p>
                            <pre style={{height: '600px'}}>
                                <code > 
                                    {this.state.result}
                                </code>
                            </pre>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
} 

export default APITest;
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Card from "../../App/components/MainCard";

import './APITest.scss';

class APITest extends Component {
    constructor(props) {
        super(props);

        this.body_content = React.createRef();
        this.result_body_content = React.createRef();

        this.Content = {
            method: React.createRef(),
            api_link: React.createRef(),
            link: React.createRef(),
        }

        this.state = {
            status_color: '',
            status: 'Запрос ещё не отправлен',
            out_headers: [],
            rem_list: {
                query: [],
                headers: []
            },
            config: {
                name: '',
                path: {
                    content: "/",
                    query: []
                },
                type: "POST",
                headers: [],
                body: ""
            }
        }

        const docs = window.localStorage.getItem('apidocs');
        if (docs != null) {
            try {
                this.state.config = JSON.parse(docs);
            } catch (e) {

            }
        }

        this._onAddQuery = this._onAddQuery.bind(this);
        this._onAddHeader = this._onAddHeader.bind(this);
        this._onSendReq = this._onSendReq.bind(this);
        this._updateCode = this._updateCode.bind(this);
        this._onLinkEdited = this._onLinkEdited.bind(this);
        this._onApiLinkEdited = this._onApiLinkEdited.bind(this);
        this._onMethodEdited = this._onMethodEdited.bind(this);
    }

    componentDidMount() {
        this.Content.method.current.value = this.state.config.type;
        this.Content.link.current.value = this.state.config.path.content;
        this._updateLink();

        const res = (inp) => {
            const obj = {};
            for (const s of inp) {
                if (typeof s.type === 'string') {
                    obj[s.name] = s.description;
                } else {
                    obj[s.name] = res(s.type);
                }
            }

            return obj;
        }

        if (typeof this.state.config.body === 'string') {
            try {
                const obj = JSON.parse(this.state.config.body);
                this.body_content.current.innerText = JSON.stringify(obj, 4, 4);
            } catch (e) {
                this.body_content.current.innerText = this.state.config.body;
            }
        } else {
            this.body_content.current.innerText = JSON.stringify(res(this.state.config.body), 4, 4);
        }

        const getCursorPosition = (parent) => {
            let selection = document.getSelection();
            let range = new Range;
            range.setStart(parent, 0);
            range.setEnd(selection.anchorNode, selection.anchorOffset);
            return range.toString().length;
        }

        const setCursorPosition = (parent, position) => {
            let child = parent.firstChild
            while(position > 0) {
                let length = child.textContent.length
                if(position > length) {
                    position -= length
                    child = child.nextSibling
                }
                else {
                    if(child.nodeType === 3) return document.getSelection().collapse(child, position)
                    child = child.firstChild
                }
            }
        }

        //this.body_content.current.textContent = '\n'
        this.body_content.current.addEventListener("input", (i) => {
            let curPos = getCursorPosition(this.body_content.current);

            const textL = this.body_content.current.textContent.length;
            if (i.inputType === 'insertParagraph') {
                if (textL === 1) {
                    this.body_content.current.textContent = '\n' + this.body_content.current.textContent;
                } else if (textL > 0) {
                    const i = this.body_content.current.textContent.split('');
                    i[curPos - 1] = i[curPos - 1] + '\n';
                    this.body_content.current.textContent = i.join('');
                } else {
                    this.body_content.current.textContent += '\n';
                }

                curPos++;
            }

            // Edit and save config
            const cfg = this.state.config;
            cfg.body = this.body_content.current.innerHTML;
            this.setState({
                config: cfg
            });
            window.localStorage.setItem('apidocs', JSON.stringify(cfg));

            this._updateCode(this.body_content.current);
            setCursorPosition(this.body_content.current, curPos);
        }, false);

        this._updateCode(this.body_content.current);
        this._updateCode(this.result_body_content.current);

        this.Content.method.current.addEventListener('change', this._onMethodEdited);
    }

    _updateCode(element) {
        const convertCssStyle = (reg) => {
            return /:$/.test(reg) ? 'field' : 'string';
        };

        const convertNonCssStyle = (reg) => {
            if (/true|false/.test(reg)) return 'bool';
            if (/null/.test(reg)) return 'null';
            return 'number';
        };

        const convertStyle = (reg) => {
            return /^"/.test(reg) ? convertCssStyle(reg) : convertNonCssStyle(reg);
        };

        const match = (reg) => {
            return "<span class=\"" + convertStyle(reg) + "\">" + reg + "</span>";
        };

        element.innerHTML = element.innerText
           .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match);
    }

    _updateLink() {
        this.Content.link.current.value = this.Content.link.current.value.split('?')[0].split('&')[0];

        // Edit and save config
        const cfg = this.state.config;
        cfg.path.content = this.Content.link.current.value;
        this.setState({
            config: cfg
        });
        window.localStorage.setItem('apidocs', JSON.stringify(cfg));

        for (let i = 0; i < this.state.config.path.query.length; i++) {
            const name = document.getElementById(`query_id${i}`).value;
            const opt = document.getElementById(`queryI_id${i}`).value;

            if (name === '') continue;

            this.Content.link.current.value += i === 0 ? `?${name}` : `&${name}`
            if (opt !== '') {
                this.Content.link.current.value += '=' + opt
            }
        }
    }

    _onSendReq(event) {
        let body;
        try {
            body = JSON.parse(this.body_content.current.innerText);
            body = JSON.stringify(body);
        } catch (e) {
            body = this.body_content.current.innerText;
        }

        let headers = {};
        for (let i = 0; i < this.state.config.headers.length; i++) {
            if (document.getElementById(`header_id${i}`).value !== '') {
                if (document.getElementById(`headerI_id${i}`).value !== '') {
                    headers[document.getElementById(`header_id${i}`).value] = document.getElementById(`headerI_id${i}`).value
                }
            }
        }

        let method = this.Content.method.current.value;

        let link = this.Content.api_link.current.value;
        if (!link.endsWith('/')) {
            link += '/';
        }

        if (this.Content.link.current.value.startsWith('/')) {
            link += this.Content.link.current.value.replace('/', '');
        } else {
            link += this.Content.link.current.value
        }

        const result = fetch(link, {
            body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
            headers,
            method,
        });

        result.then(async req => {
            let result = await req.text();

            try {
                result = JSON.parse(result);
                result = JSON.stringify(result, 4, 4);
                this.result_body_content.current.innerText = result;
                this._updateCode(this.result_body_content.current)
            } catch (e) {
                this.result_body_content.current.innerText = result;
            }

            let status_color = '';
            if (req.status >= 100) status_color = '#4692cc'
            if (req.status >= 200) status_color = '#46cc77'
            if (req.status >= 400) status_color = '#cc464b'

            const out_headers = [];
            req.headers.forEach((value, name) => {
                out_headers.push({
                    name, content: value
                })
            });
            this.setState({
                status: req.status + ' - ' + req.statusText,
                status_color,
                out_headers
            })
        });
    }

    _onAddQuery(event) {
        const cfg = this.state.config;

        for (let i = 0; i < cfg.path.query.length; i++) {
            if (document.getElementById(`query_id${i}`).value === '') {
                return;
            }
        }

        cfg.path.query.push({ name: '', value: '' });

        this.setState({
            config: cfg
        })

        window.localStorage.setItem('apidocs', JSON.stringify(cfg));
    }

    _onAddHeader(event) {
        const cfg = this.state.config;

        for (let i = 0; i < cfg.headers.length; i++) {
            if (document.getElementById(`header_id${i}`).value === '') {
                return;
            }
        }

        cfg.headers.push({ name: '' });

        this.setState({
            config: cfg
        })

        window.localStorage.setItem('apidocs', JSON.stringify(cfg));
    }

    _updateInput(event, from, id) {
        const cfg = this.state.config;
        const val = document.getElementById(`${from}_id${id}`).value

        if (from === 'query') {
            cfg.path.query[id].name = val;
            this._updateLink();
        }
        else if (from === 'queryI') {
            cfg.path.query[id].value = val;
            this._updateLink();
        }
        else if (from === 'header') {
            cfg.headers[id].name = val;
        }
        else if (from === 'headerI') {
            cfg.headers[id].value = val;
        }

        this.setState({
            config: cfg
        });
        window.localStorage.setItem('apidocs', JSON.stringify(cfg));
    }

    _onLinkEdited() {
        const cfg = this.state.config;
        cfg.path.content = this.Content.link.current.value;

        this.setState({
            config: cfg
        });
        window.localStorage.setItem('apidocs', JSON.stringify(cfg));
    }

    _onApiLinkEdited() {
        const cfg = this.state.config;
        cfg.path.api_link = this.Content.api_link.current.value;

        this.setState({
            config: cfg
        });
        window.localStorage.setItem('apidocs', JSON.stringify(cfg));
    }

    _onMethodEdited() {
        const cfg = this.state.config;
        cfg.type = this.Content.method.current.value;

        this.setState({
            config: cfg
        });
        window.localStorage.setItem('apidocs', JSON.stringify(cfg));
    }

    _onParamRemoved(event, from, id) {
        const cfg = this.state.config;
        const rm = this.state.rem_list;

        if (from === 'query') {
            cfg.path.query.splice(id, 1);

            for (let i = id; cfg.path.query.length > i; i++) {
                for (const s of rm.query) {
                    if (s.id === i) {
                        s.id = i - 1;
                        s.count = s.count += 1;
                    }
                }
            }

            this.setState({ config: cfg });
            this._updateLink();
        }
        else if (from === 'header') {
            this.setState({ config: cfg });
            cfg.headers.splice(id, 1);
        }

        this.setState({
            config: cfg,
            rem_list: rm
        });
        window.localStorage.setItem('apidocs', JSON.stringify(cfg));
    }

    _checkKey(id, type) {
        const rm = this.state.rem_list;
        if (type === 'query') {
            for (const el of rm.query) {
                if (el.id === id) {
                    console.log('id', id, 'count', el.count)
                    return id + '_' + el.count;
                }
            }

            rm.query.push({
                id, count: 0
            });
            return id + '_0';
        }

        else if (type === 'headers') {
            let i = 0;
            for (const el of rm.headers) {
                if (el.id === id) {
                    return id + '_' + el.count;
                }
                i++;
            }

            rm.headers.push({
                id, count: 0
            });
            return id + '_0';
        }
    }

    render() {

        return (
            <Aux>
                <Row>
                    <Col >
                        <Card title={this.state.config.name ? 'Информация о запросе - ' + this.state.config.name : 'Информация о запросе'} isOption>
                            <div className="parent-block">
                                <div className="asdp" style={{ maxWidth: '135px', marginBottom: '10px' }}>
                                    <p style={{ marginTop: '-10px' }} className="title">
                                        Метод запроса
                                    </p>

                                    <select ref={this.Content.method}>
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

                                    <input onInput={this._onApiLinkEdited} style={{ width: '100%' }} className="input-cui"
                                           ref={this.Content.api_link} placeholder="Введите ссылку к API"
                                           defaultValue={this.state.config.path.api_link ? this.state.config.path.api_link : "https://obvilionnetwork.ru/api"} type="text" />
                                </div>

                                <div className="asdp" style={{ width: '45%' }}>
                                    <p style={{ marginTop: '-10px' }} className="title">
                                        Путь к запросу
                                    </p>

                                    <input onInput={this._onLinkEdited} style={{ width: '100%' }} className="input-cui" ref={this.Content.link}
                                           placeholder="Введите ссылку URI" type="text" />
                                </div>

                                <div className="asdp">
                                    <input onClick={this._onSendReq} className="input-cuib" type="button" value="Отправить запрос" />
                                </div>
                            </div>

                            <div className="parent-block">
                                <div className="asd-block" style={{ marginBottom: '8px' }}>
                                    <p className="title ntitle">
                                        Аргументы Query
                                    </p>

                                    {
                                        this.state.config.path.query.map((e, i) => {
                                            return <div key={'lolo_' + this._checkKey(i, 'query')} style={{ color: '#fdf4f4'}}>
                                                <label className="arg-label">#{i + 1}</label>
                                                <input id={`query_id${i}`} onInput={(e) => {this._updateInput(e, 'query', i)}}
                                                       style={{ width: '35%', marginTop: '10px' }} className="input-cui opk" placeholder="Введите название"
                                                       defaultValue={e.name} type="text" />
                                                <label className="arg-label">=</label>
                                                <input id={`queryI_id${i}`} onInput={(e) => {this._updateInput(e, 'queryI', i)}}
                                                       style={{ width: '50%' }} className="input-cui opk" placeholder="Введите значение"
                                                       defaultValue={e.value} type="text" />
                                                <label style={{
                                                    fontSize: '1.1rem', fontWeight: 'normal', position: 'absolute',
                                                    marginTop: '9px', color: 'rgba(255,173,173,0.9)', cursor: 'pointer'
                                                }} onClick={(e) => {this._onParamRemoved(e, 'query', i)}} className="arg-label">x</label>
                                            </div>
                                        })
                                    }

                                    <input style={{
                                        marginLeft: '7px', marginTop: '10px', borderRadius: '100px',
                                        padding: '0 15px', fontSize: '0.9rem', backgroundColor: 'rgba(159,207,255,0.13)',
                                        marginBottom: '10px'
                                    }} className="input-cuib" type="button" onClick={this._onAddQuery} value="Создать Query аргумент" />
                                </div>

                                <div className="asd-block">
                                    <p className="title ntitle">
                                        Header-ы
                                    </p>

                                    {
                                        this.state.config.headers.map((e, i) => {
                                            return <div key={'loloh' + this._checkKey(i, 'header')} style={{ color: '#fdf4f4'}}>
                                                <label className="arg-label">#{i + 1}</label>
                                                <input id={`header_id${i}`} onInput={(e) => {this._updateInput(e, 'header', i)}}
                                                       style={{ width: '35%', marginTop: '10px' }} className="input-cui opk" placeholder="Введите название"
                                                       defaultValue={e.name} type="text" />
                                                <label className="arg-label">=</label>
                                                <input id={`headerI_id${i}`} onInput={(e) => {this._updateInput(e, 'headerI', i)}}
                                                       style={{ width: '50%' }} className="input-cui opk" placeholder="Введите значение"
                                                       defaultValue={e.value} type="text" />
                                                <label style={{
                                                    fontSize: '1.1rem', fontWeight: 'normal', position: 'absolute',
                                                    marginTop: '9px', color: 'rgba(255,173,173,0.9)', cursor: 'pointer'
                                                }} onClick={(e) => {this._onParamRemoved(e, 'header', i)}} className="arg-label">x</label>
                                            </div>
                                        })
                                    }

                                    <input onClick={this._onAddHeader} style={{
                                        marginLeft: '7px', marginTop: '10px', borderRadius: '100px',
                                        padding: '0 15px', fontSize: '0.9rem', backgroundColor: 'rgba(159,207,255,0.13)',
                                        marginBottom: '10px'
                                    }} className="input-cuib" type="button" value="Создать заголовок" />
                                </div>

                                <div className="asd-block">
                                    <p className="title ntitle">
                                        Body
                                    </p>
                                    <div style={{ margin: '0 5px 8px 5px', paddingRight: '4px' }} className="body-content" ref={this.body_content}
                                         spellCheck="false" contentEditable="true" suppressContentEditableWarning={true} />
                                </div>
                            </div>
                        </Card>

                        <Card title="Ответ" isOption>
                            <div className="parent-block">
                                <div className="asd-block" style={{ minWidth: '90%', backgroundColor: this.state.status_color,
                                    marginBottom: '12px', marginTop: '0', maxWidth: '100%' }}>
                                    <p className="title ntitle" style={{ fontSize: '1.2rem', color: '#fff' }}>
                                        {this.state.status}
                                    </p>
                                </div>

                                <div className="asd-block" style={{ marginBottom: '10px', maxWidth: '30%' }}>
                                    <p className="title ntitle">
                                        Заголовки
                                    </p>

                                    {
                                        this.state.out_headers.map((e, i) => {
                                            return <div style={{ color: '#fdf4f4'}}>
                                                <label className="arg-label">#{i+1}</label>
                                                <input readOnly style={{ width: '35%', marginTop: '8px', fontSize: '0.86rem' }} className="input-cui opk" value={e.name} type="text" />
                                                <label className="arg-label">=</label>
                                                <input readOnly style={{ width: '50%', fontSize: '0.86rem' }} className="input-cui opk" value={e.content} type="text" />
                                            </div>
                                        })
                                    }
                                </div>

                                <div className="asd-block">
                                    <p className="title ntitle">
                                        Ответ сервера
                                    </p>

                                    <div style={{ margin: '7px 5px 8px 5px', paddingRight: '4px' }} className="body-content"
                                         ref={this.result_body_content} spellCheck="false" />
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
} 

export default APITest;

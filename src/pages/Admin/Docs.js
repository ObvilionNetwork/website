import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Card from "../../App/components/MainCard";

import docs from "./docs_new.json"

import '../../assets/scss/buttons.css';
import './Docs.scss';

const styles = {
    size17: {
        'fontSize': '1.05rem',
        'paddingLeft': '6px',
        'color': 'white'
    },
    title: {
        fontSize: '1.19rem',
        paddingLeft: '7px',
        paddingTop: '4px',
        marginBottom: '4px',
        color: '#ebeef1',
        fontWeight: 'bolder'
    },
    name: {
        'fontSize': '0.9rem',
        'paddingLeft': '11px',
        'color': 'rgba(255,255,255,0.60)'
    },
    post: {
        'color': '#4eb6ff',
        'fontSize': '1.1875rem',
        'fontWeight': 'bolder'
    },
    get: {
        'color': '#4eff6b',
        'fontSize': '1.1875rem',
        'fontWeight': 'bolder'
    },
    patch: {
        'color': '#ffc04e',
        'fontSize': '1.1875rem',
        'fontWeight': 'bolder'
    },
    delete: {
        'color': '#ff4e4e',
        'fontSize': '1.1875rem',
        'fontWeight': 'bolder'
    }
  };

class Docs extends Component {
    _clone(obj) {
        let copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this._clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (const attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this._clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }


    render() {
        const to_object = (array, level) => {
            let s = '<r style="color: #c3cbd2">{</r><br/>';
            const pref = "&#160&#160&#160&#160&#160".repeat(level);
            for (const m of array) {
                s += pref + '<r style="color: #ffa553">' + m.name + '</r>';

                if (m.type) {
                    if (typeof m.type === 'string') {
                        s += ': <r style="color: #63b0ff;">' + m.type + '</r>';
                    } else {
                        s += ': ' + to_object(m.type, level + 1);
                    }
                }

                if (m.description) {
                    s += ' <r style="color: #888;">- ' + m.description + '</r><br/>';
                }
            }

            s += "&#160&#160&#160&#160&#160".repeat(level - 1) + '<r style="color: #c3cbd2">}</r>'

            return s;
        }

        return (
            <Aux>
                <Row>
                    <Col>
                        { docs.map((place, index) => (
                            <Card key={index} title={place.name} isOption>
                                {place.content.map((pl, i) => (
                                    <div key={i}>
                                        {
                                            i !== 0 ? <div style={{ paddingTop: '10px'}} /> : undefined
                                        }

                                        <p> 
                                            <span style={pl.type === 'GET' ? styles.get : pl.type === 'POST' ? styles.post : pl.type === 'PATCH' ? styles.patch : styles.delete}>{pl.type}</span>
                                            <span style={styles.size17}> {pl.path.content} </span>
                                            <span style={styles.name}> {pl.name} </span>
                                            <button onClick={() => {
                                                const copy = { ...pl };

                                                delete copy.description;
                                                delete copy.path.params;
                                                delete copy.result;
                                                delete copy.permissions;

                                                this.setState({});

                                                window.location.pathname = '/admin/apitest';
                                                window.localStorage.setItem('apidocs', JSON.stringify(copy));
                                            }} style={{backgroundColor: '#191f2b', outline: 'none', marginRight: 0, marginTop: '-2px'}} className="float-right button-blue">Тестировать</button>
                                        </p>

                                        <div style={{ backgroundColor: '#191f2b', borderRadius: '6px', marginTop: '-6px' }} className='p-2'>
                                            <div className="parent-block">
                                                <div className="asd">
                                                    <p style={styles.title}>
                                                        Описание
                                                    </p>
                                                    <p style={{ color: '#adcae7', paddingLeft: '7px', marginTop: '-1px', fontSize: '15.1px', marginBottom: '18px' }}>
                                                        {pl.description}
                                                    </p>
                                                </div>

                                                {
                                                    pl.path.params.length > 0 ?
                                                    <div className="asd">
                                                        <p style={styles.title}>
                                                            URL Параметры
                                                        </p>

                                                        <ul>
                                                            {pl.path.params.map((p) => {
                                                                return <li style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.93rem', marginLeft: '-19px' }}>
                                                                    <b style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.96rem' }}>
                                                                        {p.name}
                                                                    </b>

                                                                    {p.type ? ': ' + (p.type.length ? to_object(p.type, 1) : p.type) : null}
                                                                    {p.description ? ' - ' + p.description : null}
                                                                </li>;
                                                            })}
                                                        </ul>
                                                    </div> :
                                                    null
                                                }

                                                {
                                                    pl.path.query.length > 0 ?
                                                       <div className="asd">
                                                           <p style={styles.title}>
                                                               Query Параметры
                                                           </p>

                                                           <ul>
                                                               {pl.path.query.map((p) => {
                                                                   return <li style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.93rem', marginLeft: '-19px' }}>
                                                                       <b style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.96rem' }}>
                                                                           {p.name}
                                                                       </b>

                                                                       {p.type ? ': ' + (p.type.length ? to_object(p.type, 1) : p.type) : null}
                                                                       {p.description ? ' - ' + p.description : null}
                                                                   </li>;
                                                               })}
                                                           </ul>
                                                       </div> :
                                                       null
                                                }

                                                {
                                                    pl.headers.length > 0 ?
                                                       <div className="asd">
                                                           <p style={styles.title}>
                                                               Header-ы
                                                           </p>

                                                           <ul>
                                                               {pl.headers.map((p) => {
                                                                   return <li style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.93rem', marginLeft: '-19px' }}>
                                                                       <b style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.96rem' }}>
                                                                           {p.name}
                                                                       </b>

                                                                       {p.type ? ': ' + (p.type.length ? to_object(p.type, 1) : p.type) : null}
                                                                       {p.description ? ' - ' + p.description : null}
                                                                   </li>;
                                                               })}
                                                           </ul>
                                                       </div> :
                                                       null
                                                }

                                                {
                                                    typeof pl.body !== "string" && pl.body.length > 0 ?
                                                    pl.body.length > 0 ?
                                                       <div className="asd">
                                                           <p style={styles.title}>
                                                               Body
                                                           </p>

                                                           <ul style={{ marginLeft: '-32px', marginTop: '2px' }}>
                                                               {pl.body ? <td style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '6px', paddingTop: '10px', paddingLeft: '13px', paddingBottom: '11px', paddingRight: '14px' }} dangerouslySetInnerHTML={{__html: to_object(pl.body, 1)}} /> : null}
                                                           </ul>
                                                       </div> :
                                                       null :
                                                    typeof pl.body === "string" && pl.body ?
                                                      <div className="asd">
                                                          <p style={styles.title}>
                                                              Body
                                                          </p>

                                                          <ul style={{ marginLeft: '-32px', marginTop: '2px', fontSize: '1rem', color: '#63b0ff' }}>
                                                              #{pl.body}
                                                          </ul>
                                                      </div> :
                                                      null
                                                }

                                                {
                                                    pl.permissions ? pl.permissions.length > 0 ? <div className="asd">
                                                           <p style={styles.title}>
                                                               Необходимые права
                                                           </p>

                                                           <ul style={{ marginLeft: '-36px', marginTop: '2px' }}>
                                                               {
                                                                   pl.permissions.map((e) => {
                                                                       return <code style={{marginRight: '8px', fontSize: '0.9rem'}}>{e}</code>
                                                                   })
                                                               }
                                                           </ul>
                                                       </div> :
                                                       null : null
                                                }

                                                {
                                                    pl.result.error ? pl.result.error.length > 0 ? <div className="asd">
                                                           <p style={styles.title}>
                                                               Ошибки
                                                           </p>

                                                           <ul style={{ marginLeft: '-30px', marginTop: '2px' }}>
                                                               {pl.result.error.map((p) => {
                                                                       return <r>
                                                                           <b style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.96rem' }}>
                                                                               {p.code + ': '}
                                                                           </b>

                                                                           <r style={{ color: '#63b0ff' }}>
                                                                               {p.type ? (typeof p.type != 'string' ? <td style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '6px', paddingTop: '10px', paddingLeft: '13px', paddingBottom: '11px', paddingRight: '14px' }} dangerouslySetInnerHTML={{__html: to_object(p.type, 1)}} /> : '#' + p.type) : null}
                                                                           </r>
                                                                           {p.description ? ' - ' + p.description : null}
                                                                           <br/>
                                                                       </r>
                                                                })}
                                                           </ul>
                                                       </div> :
                                                       null : null
                                                }

                                                {
                                                    pl.result.success ? pl.result.success.length > 0 ? <div className="asd">
                                                           <p style={styles.title}>
                                                               Ответ
                                                           </p>

                                                           <ul style={{ marginLeft: '-30px', marginTop: '2px' }}>
                                                               {pl.result.success.map((p) => {
                                                                   return <r>
                                                                       <b style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.96rem' }}>
                                                                           {p.code + ': '}
                                                                       </b>

                                                                       {p.description && typeof p.type != 'string' ? p.description ? ' - ' + p.description : null : null}

                                                                       <r style={{ color: '#63b0ff' }}>
                                                                           {p.type ? (typeof p.type != 'string' ? <r><br/> <td style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '6px', paddingTop: '10px', paddingLeft: '13px', paddingBottom: '11px', paddingRight: '14px' }} dangerouslySetInnerHTML={{__html: to_object(p.type, 1)}} /></r> : '#' + p.type) : null}
                                                                       </r>
                                                                       {p.description && typeof p.type == 'string' ? p.description ? ' - ' + p.description : null : null}
                                                                       <br/>
                                                                   </r>
                                                               })}
                                                           </ul>
                                                       </div> :
                                                       null : null
                                                }
                                            </div>
                                        </div>

                                        { place.content.length - 1 !== i ? <p/> : null }
                                    </div>
                                ))}
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Aux>
        );
    }
} 

export default Docs;

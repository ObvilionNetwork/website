import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";

import docs from "./docs.json"

const styles = {
    size17: {
        'fontSize': '17px',
        'paddingLeft': '6px',
        'color': 'white'
    },
    post: {
        'color': '#4eb6ff',
        'fontSize': '19px',
        'fontWeight': 'bolder'
    },
    get: {
        'color': '#4eff6b',
        'fontSize': '19px',
        'fontWeight': 'bolder'
    },
    patch: {
        'color': '#ffc04e',
        'fontSize': '19px',
        'fontWeight': 'bolder'
    },
    delete: {
        'color': '#ff4e4e',
        'fontSize': '19px',
        'fontWeight': 'bolder'
    }
  };

class Docs extends Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        { docs.cards.map((place, index) => (
                            <Card key={index} title={place.name} isOption>
                                {place.routes.map((pl, i) => (
                                    <div key={i}>
                                        <p> 
                                            <span style={pl.type === 'GET' ? styles.get : pl.type === 'POST' ? styles.post : pl.type === 'PATCH' ? styles.patch : styles.delete}>{pl.type}</span> 
                                            <span style={styles.size17}>{pl.path}</span> 
                                        </p>
                                        <div style={{backgroundColor: '#343f5a'}} className='p-2'>
                                            <span style={{color: 'white'}}>
                                                {
                                                    pl.headers.length !== 0 ? 
                                                    <div>Headers: {pl.headers.map((pl, i) => (
                                                        <code key={i}>
                                                            {pl}
                                                        </code>
                                                    ))}<br/></div> : null
                                                }
                                                {
                                                    pl.arguments.length !== 0 ? 
                                                    <div>Аргументы: {pl.arguments.map((p, i) => (
                                                        <code key={i}>
                                                            {p}
                                                        </code>
                                                    ))}<br/></div> : null
                                                }
                                                {
                                                    pl.arguments.length !== 0 ? 
                                                    <div>Права: {pl.permissions.map((pl, i) => (
                                                        <code key={i}>
                                                            {pl}
                                                        </code>
                                                    ))}<br/><br/></div> : null
                                                }

                                                <p style={{color: '#b0ceee'}}> 
                                                    {pl.description}
                                                </p>
                                                <span style={{color: '#ced3da'}}>
                                                    Возращает JSON: <br/> 
                                                    <code>{ pl.return }</code> <br/>

                                                    { pl.returnErr !== '' ? <p>При ошибке возращает JSON: <br/> 
                                                    <code>{ pl.returnErr }</code></p> : null }
                                                </span>
                                            </span>
                                        </div>

                                        { place.routes.length - 1 !== i ? <p/> : null }
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
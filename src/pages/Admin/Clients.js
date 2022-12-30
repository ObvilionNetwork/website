import React, {Component} from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Card from "../../App/components/MainCard";
import Select from 'react-select';

const styles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: '#18191a',
        borderColor: '#2e2f34',
        color: '#d3d3d3',
        padding: '5px 10px',
        borderRadius: '5px',
        //height: '50px',
        '&:hover':
            {
                border: '1px solid #0679A8',
            },
        '&:focus':
            {
                boxShadow: '0 0 0.8rem rgb(121 121 121 / 24%)'
            }
    }),
    multiValue: (base) => ({
        ...base,
        background: 'none',
        margin: '3px',
    }),
    multiValueLabel: (base) => ({
        ...base,
        backgroundColor: '#2e2f34',
        color: 'white',
        fontSize: '105%'
    }),
    multiValueRemove: (base) => ({
        ...base,
        backgroundColor: '#373a48',
    }),
    indicatorSeparator: (base) => ({}),
    input: (base) => ({
        ...base,
        color: '#e0e0e0',
    }),
    menuList: (base) => ({
        ...base,
        backgroundColor: '#18191a',
    }),
    option: (base) => ({
        "label": "option",
        "cursor": "default",
        "display": "block",
        "fontSize": "inherit",
        "width": "100%",
        "userSelect": "none",
        "WebkitTapHighlightColor": "rgba(0, 0, 0, 0)",
        "backgroundColor": "transparent",
        "padding": "8px 12px",
        ":hover": {
            "backgroundColor": "#29292c"
        },
        "boxSizing": "border-box",
        color: '#b0b0b0'
    }),

};

class Clients extends Component {
    render() {
        const options = [
            { value: 'chocolate', label: 'Industrial Craft 2' },
            { value: 'strawberry', label: 'Thermal Expansion' },
            { value: 'vanilla', label: 'Forestry' },
            { value: 'chocolate1', label: 'Chocolate' },
            { value: 'strawberry1', label: 'Strawberry' },
            { value: 'vanilla1', label: 'Vanilla' },
            { value: 'chocolate2', label: 'Chocolate' },
            { value: 'strawberry2', label: 'Strawberry' },
            { value: 'vanilla2', label: 'Vanilla' },
            { value: 'chocolate3', label: 'Chocolate' },
            { value: 'strawberry4', label: 'Strawberry' },
            { value: 'vanilla5', label: 'Vanilla' },
            { value: 'chocolate6', label: 'Chocolate' },
            { value: 'strawberry7', label: 'Strawberry' },
            { value: 'vanilla9', label: 'Vanilla' },
            { value: 'chocolate63', label: 'Chocolate' },
            { value: 'strawberry74', label: 'Strawberry' },
            { value: 'vanilla69', label: 'Vanilla' },
            { value: 'ch5ocolate6', label: 'Chocolate' },
            { value: 'st6rawberry7', label: 'Strawberry' },
            { value: 'van87illa9', label: 'Vanilla' },
            { value: 'ch55ocolate6', label: 'Chocolate' },
            { value: 'st6rawbe7rry7', label: 'Strawberry' },
            { value: 'van878illa9', label: 'Vanilla' },
        ];

        return (
            <Aux>
                <Row>
                    <Col>
                        <Card title="Настройка сборки">
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Выберите сборку</Form.Label>
                                <Form.Control as="select">
                                    <option>HiTech</option>
                                    <option>MagicRPG</option>
                                    <option>SkyTech</option>
                                </Form.Control>
                            </Form.Group>

                            <h4 className="mt-5">Настройки сборки</h4>
                            <hr/>

                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="">
                                            <Form.Label>Название сборки</Form.Label>
                                            <Form.Control placeholder="Введите название" />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="">
                                        <Form.Label>Иконка сборки</Form.Label>
                                        <Form.Control placeholder="Введите ссылку на картинку" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="">
                                            <Form.Label>Описание сборки</Form.Label>
                                            <Form.Control as="textarea" placeholder="Введите описание сборки" rows="3" />
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="">
                                        <Form.Label>Фон сборки в лаунчере</Form.Label>
                                        <Form.Control placeholder="Введите ссылку на картинку" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="">
                                            <Form.Label>Версия сборки</Form.Label>
                                            <Form.Control as="select">
                                                <option>1.7.10</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="">
                                        <Form.Label>Ядро сборки</Form.Label>
                                        <Form.Control as="select">
                                            <option>Forge 1.7.10 - 1614</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="">
                                        <Form.Label>Версия Java</Form.Label>
                                        <Form.Control as="select">
                                            <option>Java 8 - 275 JRE</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="">
                                        <Form.Label>Путь до конфигов</Form.Label>
                                        <Form.Control placeholder="Введите путь до конфигов" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <h4 style={{marginTop: '2rem'}}>Выберите моды сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={options}
                                closeMenuOnSelect={false}
                                placeholder='Выберите моды'
                                styles = {styles}
                                onChange={console.log}
                            />

                            <h4 className='mt-5'>Выберите категории клиентских модов сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={options}
                                closeMenuOnSelect={false}
                                placeholder='Выберите категории клиентских модов'
                                styles = {styles}
                            />

                            <h4 className='mt-5'>Выберите библиотеки сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={options}
                                closeMenuOnSelect={false}
                                placeholder='Выберите библиотеки'
                                styles = {styles}
                            />

                            <h4 className='mt-5'>Выберите нативы сборки</h4>
                            <hr/>

                            <Select
                                isMulti
                                options={options}
                                closeMenuOnSelect={false}
                                placeholder='Выберите нативы'
                                styles = {styles}
                            />
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default Clients;

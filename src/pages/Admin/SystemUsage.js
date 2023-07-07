import React, {Component} from 'react';
import {Button, Col, Row} from 'react-bootstrap';

import Aux from "../../App/components/_Aux";
import Card from "../../App/components/MainCard";
import Chart from "chart.js";
import Config from "../../config";
import Modal from "../../App/components/Modal";

class SystemUsage extends Component {

    constructor(props) {
        super(props);
        this.state = { };

        this.update = this.update.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async update() {
        const data = await fetch(Config.api_link + 'control/stats/1', {
            headers: {
                Authorization: window.localStorage.getItem('token')
            }
        });

        const out = await data.json();

        if (out.error) {
            clearInterval(this.interval);

            // Нет прав
            if (out.code === 4010) {
                this.setState({ error: "К сожалению, у вас недостаточно прав для просмотра этого контента." })
                return;
            }

            this.setState({ error: "К сожалению, произошла ошибка.", code: out.code, message: out.error })
            return;
        }

        const labels = [];
        const cpuValues = [];
        const ramValues = [];
        const rxValues = [];
        const txValues = [];
        const readValues = [];
        const writeValues = [];

        for (const el of out.data) {
            labels.push(el.date);
            cpuValues.push(el.cpu);
            ramValues.push(el.ram / 1024 / 1024);
            rxValues.push(el.netRx);
            txValues.push(el.netTx);
            readValues.push(el.diskRead);
            writeValues.push(el.diskWrite);
        }

        this.chart.data = {
            labels: reduceArray(labels, 20),
            datasets: [{
                data: interpolateArray(cpuValues, 20),
                borderColor: "rgb(82,255,117)",
                backgroundColor: "rgba(82,255,85,0.1)",
                fill: true,
                borderWidth: 1,
                pointRadius: 0
            }]
        }
        this.chart.update();


        this.chartRam.data = {
            labels: reduceArray(labels, 20),
            datasets: [{
                data: interpolateArray(ramValues, 20),
                borderColor: "rgb(255,232,82)",
                backgroundColor: "rgba(255,186,82,0.1)",
                fill: true,
                borderWidth: 1,
                pointRadius: 0
            }]
        }
        this.chartRam.update();


        this.chartNet.data = {
            labels: reduceArray(labels, 20),
            datasets: [
                {
                    label: 'Прием',
                    data: interpolateArray(rxValues, 20),
                    borderColor: "rgb(82,122,255)",
                    backgroundColor: "rgba(82,137,255,0.07)",
                    fill: true,
                    borderWidth: 1,
                    pointRadius: 0
                },
                {
                    label: 'Отдача',
                    data: interpolateArray(txValues, 20),
                    borderColor: "rgb(192,82,255)",
                    backgroundColor: "rgba(171,82,255,0.07)",
                    fill: true,
                    borderWidth: 1,
                    pointRadius: 0
                },
            ]
        }
        this.chartNet.update();


        this.chartDisk.data = {
            labels: reduceArray(labels, 20),
            datasets: [
                {
                    label: 'Чтение',
                    data: interpolateArray(readValues, 20),
                    borderColor: "rgb(125,255,82)",
                    backgroundColor: "rgba(99,255,82,0.07)",
                    fill: true,
                    borderWidth: 1,
                    pointRadius: 0
                },
                {
                    label: 'Запись',
                    data: interpolateArray(writeValues, 20),
                    borderColor: "rgb(255,148,82)",
                    backgroundColor: "rgba(255,82,122,0.07)",
                    fill: true,
                    borderWidth: 1,
                    pointRadius: 0
                },
            ]
        }
        this.chartDisk.update();
    }

    async componentDidMount() {

        this.chart = new Chart(this.node, {
            type: "line",
            data: {},
            options: {
                legend: {
                    display: false,
                },
                animation: {
                    duration: 0
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 100,
                            stepSize: 20,
                            callback: (value, index, values) => {
                                return value + '%';
                            },
                            fontColor: 'rgba(255,255,255,0.42)',
                            fontSize: 13
                        },
                        gridLines: {
                            color: '#1a1a1c'
                        },
                        lineWidth: 1
                    }],
                    xAxes: [{
                        sampleSize: 5,
                        type: 'time',
                        time: {
                            unit: 'second',
                            displayFormats: {
                                second: 'HH:mm'
                            }
                        },
                        gridLines: {
                            color: '#1b1b1c',
                            lineWidth: 1
                        },
                        ticks: {
                           maxTicksLimit: 20
                        }
                    }]
                }
            }
        });

        this.chartRam = new Chart(this.nodeRam, {
            type: "line",
            data: {},
            options: {
                legend: {
                    display: false,
                },
                animation: {
                    duration: 0
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 1024 * 8,
                            stepSize: 1024 * 2,
                            callback: (value, index, values) => {
                                return Math.round(value / 1024 * 10) / 10 + ' GB';
                            },
                            fontColor: 'rgba(255,255,255,0.42)',
                            fontSize: 13
                        },
                        gridLines: {
                            color: '#1a1a1c'
                        },
                        lineWidth: 1
                    }],
                    xAxes: [{
                        sampleSize: 5,
                        type: 'time',
                        time: {
                            unit: 'second',
                            displayFormats: {
                                second: 'HH:mm'
                            }
                        },
                        gridLines: {
                            color: '#1b1b1c',
                            lineWidth: 1
                        },
                        ticks: {
                            maxTicksLimit: 20
                        }
                    }]
                }
            }
        });

        this.chartNet = new Chart(this.nodeNet, {
            type: "line",
            data: {},
            options: {
                animation: {
                    duration: 0
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 6,
                            callback: (value, index, values) => {
                                const val = Math.round(value / 1024 / 1024 * 10) / 10;
                                if (val === 0) {
                                    return Math.round(value / 1024 * 10) / 10 + ' Kb/s';
                                }

                                return val + ' Mb/s';
                            },
                            fontColor: 'rgba(255,255,255,0.42)',
                            fontSize: 13
                        },
                        gridLines: {
                            color: '#1a1a1c'
                        },
                        lineWidth: 1
                    }],
                    xAxes: [{
                        sampleSize: 5,
                        type: 'time',
                        time: {
                            unit: 'second',
                            displayFormats: {
                                second: 'HH:mm'
                            }
                        },
                        gridLines: {
                            color: '#1b1b1c',
                            lineWidth: 1
                        },
                        ticks: {
                            maxTicksLimit: 20
                        }
                    }]
                }
            }
        });

        this.chartDisk = new Chart(this.nodeDisk, {
            type: "line",
            data: {},
            options: {
                animation: {
                    duration: 0
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 6,
                            callback: (value, index, values) => {
                                const val = Math.round(value / 1024 / 1024 * 10) / 10;
                                if (val === 0) {
                                    return Math.round(value / 1024 * 10) / 10 + ' Kb/s';
                                }

                                return val + ' Mb/s';
                            },
                            fontColor: 'rgba(255,255,255,0.42)',
                            fontSize: 13
                        },
                        gridLines: {
                            color: '#1a1a1c'
                        },
                        lineWidth: 1
                    }],
                    xAxes: [{
                        sampleSize: 5,
                        type: 'time',
                        time: {
                            unit: 'second',
                            displayFormats: {
                                second: 'HH:mm'
                            }
                        },
                        gridLines: {
                            color: '#1b1b1c',
                            lineWidth: 1
                        },
                        ticks: {
                            maxTicksLimit: 20
                        }
                    }]
                }
            }
        });

        this.update().then();
        this.interval = setInterval(this.update, 10000);
    }

    render() {
        return (
            <Aux>
                <Modal active={ this.state.error } setActive={() => { this.setState({ error: false }) }}>
                    <h4 className='font-weight-bold' style={{ fontSize: '24px' }}>
                        <i className='feather icon-alert-circle' style={{ color: '#e35b7b' }}/> У вас недостаточно прав
                    </h4>

                    <br/>

                    <h5> { this.state.error } <br/> Обратитесь к администрации проекта</h5>

                    {
                        this.state.message
                            ? <h5 style={{ marginTop: '20px' }}>
                                Сообщение: {this.state.message} <br/>
                                Код ошибки: {this.state.code}
                            </h5>

                            : <h5 style={{ marginTop: '20px' }}>Право: SHOW_STATS</h5>
                    }

                    <hr style={{ marginBottom: '20px' }}/>

                    <Row className='mt-4' style={{marginLeft:'1px'}}>
                        <Button className='but-ok' onClick={() => window.history.go(-1)}>Вернуться назад</Button>
                    </Row>
                </Modal>

                <Row>
                    <Col md={6}>
                        <Card title="Загрузка ЦП">
                            <canvas
                                style={{ width: 800, height: 310 }}
                                ref={node => (this.node = node)}
                            />
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title="Загрузка ОЗУ">
                            <canvas
                                style={{ width: 800, height: 310 }}
                                ref={node => (this.nodeRam = node)}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Card title="Загрузка сети">
                            <canvas
                                style={{ width: 800, height: 330 }}
                                ref={node => (this.nodeNet = node)}
                            />
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card title="Загрузка диска">
                            <canvas
                                style={{ width: 800, height: 330 }}
                                ref={node => (this.nodeDisk = node)}
                            />
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}


function interpolateArray(arr, to) {
    const b = [];

    const coef = (arr.length + 1) / to;

    let cur = 0;

    for (let i = 0; i < to - 1; i++) {
        const to = cur + coef;

        const from_index = Math.floor(cur);
        const to_index = Math.floor(to);

        const ost = cur - from_index;

        b[i] = arr[from_index] - (arr[from_index] - arr[to_index]) * ost;

        cur += coef;
    }

    b.push(arr[arr.length - 1])

    return b;
}
export function reduceArray(arr, to) {
    if (arr.length < to) return arr;

    const t = ~~(arr.length / (to - 1));

    const out = [];
    let ind = 0;

    for (let i = 0; i < to - 1; i++) {
        out.push(arr[ind]);
        ind += t;
    }

    out.push(arr[arr.length - 1]);

    return out;
}


export default SystemUsage;

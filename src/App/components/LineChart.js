import React from 'react';
import NVD3Chart from 'react-nvd3';
import getJSONFromURL from '../utils/request'

let last = {
    y: [0]
}

async function update(link) {
    getJSONFromURL(link, (status, res) => {
        last.y = res.last;
    });
}

function getDatum(type) {
    let res = [];
    
    last.y.forEach((value, index) => { 
        res.push({
            'x': index,
            'y': value
        });
    });

    return [
        {
            values: res,
            key: 'Загрузка ' + type,
            color: '#55b9e6',
            area: true
        }
    ];
}

class LineChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }
    
    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
        update(this.props.link);
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 2000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let data = getDatum(this.props.type);
        return (
            <div>
                {
                    React.createElement(NVD3Chart, {
                        xAxis: {

                            tickFormat: function(d){ return d; },
                            axisLabel: 'Время (сек.)'
                        },
                        yAxis: {
                            axisLabel: 'Загрузка ' + this.props.type,
                            tickFormat: function(d) {return parseFloat(d).toFixed(0); }
                        },
                        type:'lineChart',
                        datum: data,
                        x: 'x',
                        y: 'y',
                        height: 280,
                        renderEnd: function(){
                            console.log('renderEnd');
                        }
                    })
                }
            </div>
        )
    }
}

export default LineChart;
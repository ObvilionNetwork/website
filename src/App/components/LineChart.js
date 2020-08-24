import React from 'react';
import Chart from "chart.js";
import getJSONFromURL from '../utils/request'

async function update(last, props, chart) {
    
    await getJSONFromURL(props.link, (status, res) => {
        if(res) {
            if(res.last) {
                last = res.last;
            }
        } 
        const d = new Date();
        d.setSeconds(d.getSeconds() - 2 * last.length);

        console.log(last);
        chart.data = {
            labels: last.map((val, i) => {
                d.setSeconds(d.getSeconds() + 2 * (i + 1));
                return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
            }),
            datasets: [
                {
                label: props.name,
                data: last,
                backgroundColor: "rgba(82, 143, 255, 0.1)",
                borderColor: "rgba(82, 143, 255, 1)",
                fill: true
                }
            ]
            }
        chart.update();
    });
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
    update(this.last, this.props, this.chart);
  }

  componentDidMount() {
    const node = this.node;
    const chart = new Chart(node, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: this.props.name,
              data: [],
              borderColor: "rgba(82, 143, 255, 1)",
              fill: false
            }
          ]
        },
        options: {
          legend: {
              labels: {
                  fontColor: '#E3E3E3'
              }
          },
          animation: {
            duration: 0
          }
        }
    });

    this.last = [];
    this.chart = chart;
    this.interval = setInterval(() => this.tick(), 2000);
    update(this.last, this.props, this.chart);
  }

  render() {
    return (
      <div>
        <canvas
          style={{ width: 800, height: 300 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default LineChart;
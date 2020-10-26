import React from "react";
import { Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";

import Aux from "../../App/components/_Aux";
import DEMO from "../../store/constant";
import getJSONFromURL from '../../App/utils/request'

import avatar1 from "../../assets/images/user/avatar-1.jpg";

let finances = {};
let bugs = {};
let players = {};
let auths = {};
let servers = {};

const apiLink = 'http://api.obvilionnetwork.ban/';
const token = 'a4HH.iF1fpzuo8oDR9RslwYJnOHEOEEni9wZsu9sXg7wzSvD20';

async function load() {
  finances = await (await fetch(apiLink + 'finances', {
    headers: {
      Authorization: token
    }
  })).json();

  bugs = await (await fetch(apiLink + 'bugs', {
    headers: {
      Authorization: token
    }
  })).json();

  players = await (await fetch(apiLink + 'users/stats', {
    headers: {
      Authorization: token
    }
  })).json();

  servers = await (await fetch(apiLink + 'servers', {
    headers: {
      Authorization: token
    }
  })).json();
}

class Dashboard extends React.Component {
  componentDidMount() {
    load();
  }

  render() {
    const tabToday = (
      <Aux>
        <Table responsive hover className="m-0">
          <tbody>
            <tr className="unread">
              <td>
                <img
                  className="rounded-circle"
                  style={{ width: "40px" }}
                  src={avatar1}
                  alt="activity-user"
                />
              </td>
              <td>
                <h6 className="mb-1">KeviTV</h6>
                <p className="m-0">Владелец</p>
              </td>
              <td>
                <h6 style={{padding: '6%'}} className="text-muted">
                  <i className="fa fa-clock-o text-c-green f-14 m-r-15" />
                  11 МАЯ 12:56
                </h6>
              </td>
              <td>
                <h6 style={{padding: '3%'}} >
                  Заблокировал игрока Test на сервере HiTech
                </h6>
              </td>
            </tr>
          </tbody>
        </Table>
      </Aux>
    );

    return (
      <Aux>
        <Row>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Заработок за месяц</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />
                      {finances.profit === undefined ? 'Загрузка...' : finances.profit + 'р.'}
                      <p className="m-r-5">{!finances.profitGoal ? 'Загрузка...' : 'из ' + finances.profitGoal + 'р.'}</p>
                    </h3>
                  </div>

                  <div className="col-3 text-right">
                    <p className="m-b-0">{finances.profit === undefined ? 'Загрузка...' : Math.round(finances.profit / finances.profitGoal * 100) + "%"}</p>
                  </div>
                </div>
                <div className="progress m-t-30" style={{ height: "7px" }}>
                  <div
                    className="progress-bar progress-c-theme"
                    role="progressbar"
                    style={{ width: finances.profit === undefined ? '0%' : Math.round(finances.profit / finances.profitGoal * 100) + "%" }}
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Расходы за месяц</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className="feather icon-arrow-down text-c-red f-30 m-r-5" />{" "}
                      {!finances.expenses ? 'Загрузка...' : finances.expenses + 'р.'}
                      <p className="m-r-5">{!finances.expensesMax ? 'Загрузка...' : 'из ' + finances.expensesMax + 'р.'}</p>
                    </h3>
                  </div>

                  <div className="col-3 text-right">
                    <p className="m-b-0">{!finances.expenses ? 'Загрузка...' : Math.round(finances.expenses / finances.expensesMax * 100) + "%"}</p>
                  </div>
                </div>
                <div className="progress m-t-30" style={{ height: "7px" }}>
                  <div
                    className="progress-bar progress-c-theme2"
                    role="progressbar"
                    style={{ width: !finances.expenses ? '0%' : Math.round(finances.expenses / finances.expensesMax * 100) + "%" }}
                    aria-valuenow="16"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Общий бюджет</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                      <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                      {!finances.total ? 'Загрузка...' : finances.total + 'р.'}
                      <p className="m-r-5">{finances.totalMax === undefined ? 'Загрузка...' : 'из ' + finances.totalMax + 'р.'}</p>
                    </h3>
                  </div>

                  <div className="col-3 text-right">
                    <p className="m-b-0">{finances.totalMax === undefined ? 'Загрузка...' : Math.round(finances.total / finances.totalMax * 100) + "%"}</p>
                  </div>
                </div>
                <div className="progress m-t-30" style={{ height: "7px" }}>
                  <div
                    className="progress-bar progress-c-theme"
                    role="progressbar"
                    style={{ width: finances.total === undefined ? '0%' : Math.round(finances.total / finances.totalMax * 100) + "%" }}
                    aria-valuenow="70"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={8}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">Последние авторизации</Card.Title>
              </Card.Header>
              <Card.Body className="px-0 py-2">
                <Table responsive hover>
                  <tbody>
                    { auths.result ? 
                    auths.result.map((res, i) => i <= 4 ? (
                      <tr key={i} className="unread">
                        <td>
                          <img
                            className="rounded-circle"
                            style={{ width: "40px"}}
                            src={res.avatarURL}
                            alt="activity-user"
                          />
                        </td>
                        <td>
                          <h6 className="mb-1">{res.name}</h6>
                          <p className="m-0">IP: {res.ip}</p>
                        </td>
                        <td>
                          <h6 className="text-muted">
                            {
                              res.type === 'out' ? <i className="fa fa-circle text-c-red f-10 m-r-15" /> : <i className="fa fa-circle text-c-green f-10 m-r-15" /> 
                            }
                            {res.time}
                          </h6>
                        </td>
                        <td>
                          <a
                            href={DEMO.BLANK_LINK}
                            className="label theme-bg2 text-white f-12"
                          >
                            Профиль
                          </a>
                          <a
                            href={DEMO.BLANK_LINK}
                            className="label theme-bg text-white f-12"
                          >
                            Управление
                          </a>
                        </td>
                      </tr>
                    ) : null )
                    : null }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card className="card-event">
              <Card.Body>
                <div className="row align-items-center justify-content-center">
                  <div className="col">
                    <h5 className="m-0">Баг-репорты</h5>
                  </div>
                  <div className="col-auto">
                    <a
                      href={DEMO.BLANK_LINK}
                      className="label theme-bg2 text-white f-14 f-w-400 float-right"
                    >
                      Просмотр
                    </a>
                  </div>
                </div>
                <h2 className="mt-2 f-w-300">
                  <sub className="text-muted f-14">{bugs.count === undefined ? 'Загрузка...' : bugs.count} Репортов</sub>
                </h2>
                <h6 className="text-muted mt-3 mb-0">
                  Среди них {bugs.important === undefined ? 'Загрузка...' : bugs.important} особой важности
                </h6>
                <i className="fa fa-exclamation-circle text-c-yellow f-50" />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body className="border-bottom">
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-users f-30 text-c-blue" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">{players.count === undefined ? 'Загрузка...' : players.count}</h3>
                    <span className="d-block text-uppercase">
                      всего игроков
                    </span>
                  </div>
                </div>
              </Card.Body>
              <Card.Body>
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-activity f-30 text-c-green" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">{players.online === undefined ? 'Загрузка...' : players.online}</h3>
                    <span className="d-block text-uppercase">
                      игроков онлайн
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Мониторинг серверов</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  {servers.servers ? servers.servers.map((res, i) => (
                    <div className="col-xl-12">
                      <h6 className="align-items-center float-left">
                        {res.players === -1 ? <i className="fa fa-circle f-10 m-r-10 text-c-red" /> : res.players === res.maxPlayers ? <i className="fa fa-circle f-10 m-r-10 text-c-yellow" /> : <i className="fa fa-circle f-10 m-r-10 text-c-green" />}
                        {res.name}
                      </h6>
                      <h6 className="align-items-center float-right">{res.players === -1 ? "Сервер выключен" : res.players + "/" + res.maxPlayers }</h6>
                      <div className="progress m-t-30 m-b-20" style={{ height: "6px" }}>
                        <div
                          className="progress-bar progress-c-theme"
                          role="progressbar"
                          style={{ width: !res.players ? '0%' : Math.round(res.players / res.maxPlayers * 100) + "%" }}
                          aria-valuenow="70"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  )) : null}

                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={8} className="m-b-30">
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="В последнее время">
                {tabToday}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Dashboard;

import React from "react";
import { Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";

class Dashboard extends React.Component {
  render() {
    const tabContent = (
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
                <h6 className="mb-1">Hohol</h6>
                <p className="m-0">Администратор</p>
              </td>
              <td>
                <h6 style={{padding: '6%'}} className="text-muted">
                  <i className="fa fa-clock-o text-c-green f-14 m-r-15" />
                  12 МАЯ 12:56
                </h6>
              </td>
              <td>
                <h6 style={{padding: '3%'}} >
                  Изменил право Кик участников для роли Модератор
                </h6>
              </td>
            </tr>
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
                <h6 className="mb-1">Hohol</h6>
                <p className="m-0">Администратор</p>
              </td>
              <td>
                <h6 style={{padding: '6%'}} className="text-muted">
                  <i className="fa fa-clock-o text-c-green f-14 m-r-15" />
                  12 МАЯ 12:56
                </h6>
              </td>
              <td>
                <h6 style={{padding: '3%'}} >
                  Изменил право Кик участников для роли Модератор
                </h6>
              </td>
            </tr>
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
                <h6 className="mb-1">Hohol</h6>
                <p className="m-0">Администратор</p>
              </td>
              <td>
                <h6 style={{padding: '6%'}} className="text-muted">
                  <i className="fa fa-clock-o text-c-green f-14 m-r-15" />
                  12 МАЯ 12:56
                </h6>
              </td>
              <td>
                <h6 style={{padding: '3%'}} >
                  Изменил право Кик участников для роли Модератор
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
                      <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{" "}
                      0р.
                    </h3>
                  </div>

                  <div className="col-3 text-right">
                    <p className="m-b-0">0%</p>
                  </div>
                </div>
                <div className="progress m-t-30" style={{ height: "7px" }}>
                  <div
                    className="progress-bar progress-c-theme"
                    role="progressbar"
                    style={{ width: "0%" }}
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
                      720р.
                    </h3>
                  </div>

                  <div className="col-3 text-right">
                    <p className="m-b-0">16%</p>
                  </div>
                </div>
                <div className="progress m-t-30" style={{ height: "7px" }}>
                  <div
                    className="progress-bar progress-c-theme2"
                    role="progressbar"
                    style={{ width: "16%" }}
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
                      2153р.
                    </h3>
                  </div>

                  <div className="col-3 text-right">
                    <p className="m-b-0">70%</p>
                  </div>
                </div>
                <div className="progress m-t-30" style={{ height: "7px" }}>
                  <div
                    className="progress-bar progress-c-theme"
                    role="progressbar"
                    style={{ width: "70%" }}
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
                        <p className="m-0">IP: 10.0.2.2.100</p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-green f-10 m-r-15" />
                          11 МАЯ 12:56
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
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src={avatar2}
                          alt="activity-user"
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">HOffin</h6>
                        <p className="m-0">IP: 10.0.2.2.100</p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-red f-10 m-r-15" />
                          11 МАЯ 10:35
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
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src={avatar3}
                          alt="activity-user"
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">LolMC</h6>
                        <p className="m-0">IP: 10.0.2.2.100</p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-green f-10 m-r-15" />
                          9 МАЯ 17:38
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
                        <h6 className="mb-1">TestJ</h6>
                        <p className="m-0">IP: 10.0.2.2.100</p>
                      </td>
                      <td>
                        <h6 className="text-muted f-w-300">
                          <i className="fa fa-circle text-c-red f-10 m-r-15" />
                          19 МАЯ 12:56
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
                    <tr className="unread">
                      <td>
                        <img
                          className="rounded-circle"
                          style={{ width: "40px" }}
                          src={avatar2}
                          alt="activity-user"
                        />
                      </td>
                      <td>
                        <h6 className="mb-1">BanPoIp</h6>
                        <p className="m-0">IP: 10.0.2.2.100</p>
                      </td>
                      <td>
                        <h6 className="text-muted">
                          <i className="fa fa-circle text-c-green f-10 m-r-15" />
                          21 ИЮЛЯ 12:56
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
                  45<sub className="text-muted f-14">Репортов</sub>
                </h2>
                <h6 className="text-muted mt-3 mb-0">
                  Среди них 2 особой важности
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
                    <h3 className="f-w-300">235</h3>
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
                    <h3 className="f-w-300">26</h3>
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
                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-circle f-10 m-r-10 text-c-green" />
                      HiTech
                    </h6>
                    <h6 className="align-items-center float-right">30/45</h6>
                    <div
                      className="progress m-t-30 m-b-20"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "70%" }}
                        aria-valuenow="70"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-circle f-10 m-r-10 text-c-yellow" />
                      SkyTech
                    </h6>
                    <h6 className="align-items-center float-right">45/45</h6>
                    <div
                      className="progress m-t-30  m-b-20"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "100%" }}
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-circle f-10 m-r-10 text-c-red" />
                      Magic
                    </h6>
                    <h6 className="align-items-center float-right">
                      Сервер выключен
                    </h6>
                    <div
                      className="progress m-t-30  m-b-20"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "0%" }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-circle f-10 m-r-10 text-c-red" />
                      Matter
                    </h6>
                    <h6 className="align-items-center float-right">
                      Сервер выключен
                    </h6>
                    <div
                      className="progress m-t-30  m-b-20"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "0%" }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-circle f-10 m-r-10 text-c-red" />
                      Galactic
                    </h6>
                    <h6 className="align-items-center float-right">
                      Сервер выключен
                    </h6>
                    <div
                      className="progress m-t-30  m-b-20"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "0%" }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-circle f-10 m-r-10 text-c-red" />В
                      разработке...
                    </h6>
                    <h6 className="align-items-center float-right">
                      Сервер выключен
                    </h6>
                    <div
                      className="progress m-t-30  m-b-5"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "0%" }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={8} className="m-b-30">
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="Сегодня">
                {tabContent}
              </Tab>
              <Tab eventKey="week" title="На этой неделе">
                {tabContent}
              </Tab>
              <Tab eventKey="all" title="Всё время">
                {tabContent}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Dashboard;

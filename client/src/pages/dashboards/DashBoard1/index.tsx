import { Col, Row, Card, Dropdown } from 'react-bootstrap';
import { SisenseApp, SisenseDashboard, SisenseWidget } from '@sisense/sjs-react';
import { SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';

import regionalConfig from '../../../config_region';

// hooks
import { usePageTitle } from '../../../hooks';

// component
//import Statistics from './Statistics';
//import SalesChart from './SalesChart';
//import StatisticsChart from './StatisticsChart';
//import RevenueChart from './RevenueChart';
//import Users from './Users';
import Inbox from './Inbox';
import Projects from './Projects';

// dummy data
import { messages, projectDetails } from './data';

const DashBoard1 = () => {
    // set pagetitle
    usePageTitle({
        title: 'Home',
        breadCrumbItems: [
            {
                path: '/dashboard',
                label: 'Home',
                active: true,
            },
        ],
    });

    const urlParams = 'hostname=' + window.location.hostname + '&amp;sisenseUrl=' + regionalConfig.SISENSE_URL;

    //TODO: get single event handler working async - right now one widget loading overrides the previously set titles for other widgets
    // const [widgetTitles, setWidgetTitles] = useState({widget1:'', widget2:'', widget3:'', widget4:'', widget5:''});

    // const onLoaded = async (event: CustomEvent, widgetNumber: string)=>{
    // 	const widget = event.target as HTMLSisenseWidgetElement;
    // 	const model = await widget.getModel();
    // 	setWidgetTitles({...widgetTitles, [widgetNumber]: model.title});
    // };
    const [widgetTitle1, setWidgetTitle1] = useState('.');
    const [widgetTitle2, setWidgetTitle2] = useState('.');
    const [widgetTitle3, setWidgetTitle3] = useState('.');
    const [widgetTitle4, setWidgetTitle4] = useState('.');
    const [widgetTitle5, setWidgetTitle5] = useState('.');

    const onLoaded = async (event: CustomEvent, setterName: Function) => {
        const widget = event.target as HTMLSisenseWidgetElement;
        const model = await widget.getModel();
        setterName(model.title);
    };


    return (

        <>
            <SisenseApp url={regionalConfig.SISENSE_URL} urlParams={urlParams}>
                <SisenseDashboard oid={regionalConfig.SJS_DASHBOARD.DASHBOARD_ID}>
                    <Row>
                        <Col md={12} xl={4}>
                            <Row>
                                <Col sm={6} md={6} xl={6}>

                                    <Card>
                                        <Card.Body bsPrefix="card-body mouse-pointer fixed-padding">
                                            <Dropdown className="float-end" align="end">
                                                <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} to="/apps/insights">
                                                        Explore Insights
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {widgetTitle1 && <h4 className="header-title mt-0">{widgetTitle1}</h4>}
                                            <a href="/apps/insights">
                                                <SisenseWidget
                                                    oid={regionalConfig.SJS_DASHBOARD.WIDGET1_ID}
                                                    height={150}
                                                    onLoaded={(event) => onLoaded(event, setWidgetTitle1)}
                                                />
                                            </a>
                                        </Card.Body>
                                    </Card>

                                </Col>
                                <Col sm={6} md={6} xl={6}>
                                    <Card>
                                        <Card.Body bsPrefix="card-body mouse-pointer fixed-padding">
                                            <Dropdown className="float-end" align="end">
                                                <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} to="/apps/insights">
                                                        Explore Insights
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {widgetTitle2 && <h4 className="header-title mt-0">{widgetTitle2}</h4>}
                                            <a href="/apps/insights">
                                                <SisenseWidget
                                                    oid={regionalConfig.SJS_DASHBOARD.WIDGET2_ID}
                                                    height={150}
                                                    onLoaded={(event) => onLoaded(event, setWidgetTitle2)}
                                                />
                                            </a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6} md={6} xl={6}>
                                    <Card>
                                        <Card.Body bsPrefix="card-body mouse-pointer fixed-padding">
                                            <Dropdown className="float-end" align="end">
                                                <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} to="/apps/insights">
                                                        Explore Insights
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {widgetTitle3 && <h4 className="header-title mt-0">{widgetTitle3}</h4>}
                                            <a href="/apps/insights">
                                                <SisenseWidget
                                                    oid={regionalConfig.SJS_DASHBOARD.WIDGET3_ID}
                                                    height={150}
                                                    onLoaded={(event) => onLoaded(event, setWidgetTitle3)}
                                                />
                                            </a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col sm={6} md={6} xl={6}>
                                    <Card>
                                        <Card.Body bsPrefix="card-body mouse-pointer fixed-padding">
                                            <Dropdown className="float-end" align="end">
                                                <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                                                    <i className="mdi mdi-dots-vertical"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} to="/apps/insights">
                                                        Explore Insights
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            {widgetTitle4 && <h4 className="header-title mt-0">{widgetTitle4}</h4>}
                                            <a href="/apps/insights">
                                                <SisenseWidget
                                                    oid={regionalConfig.SJS_DASHBOARD.WIDGET4_ID}
                                                    height={150}
                                                    onLoaded={(event) => onLoaded(event, setWidgetTitle4)}
                                                />
                                            </a>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12} xl={8}>
                            <Card>
                                <Card.Body bsPrefix="card-body fixed-padding">
                                    <Dropdown className="float-end" align="end">
                                        <Dropdown.Toggle as="a" className="cursor-pointer card-drop">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to="/apps/insights">
                                                Explore Insights
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {widgetTitle5 && <h4 className="header-title mt-0">{widgetTitle5}</h4>}
                                    <SisenseWidget
                                        oid={regionalConfig.SJS_DASHBOARD.WIDGET5_ID}
                                        height={360}
                                        onLoaded={(event) => onLoaded(event, setWidgetTitle5)}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </SisenseDashboard>
            </SisenseApp>

            <Row>
                <Col md={12} xl={4}>
                    <Inbox messages={messages} />
                </Col>
                <Col md={12} xl={8}>
                    <Projects projectDetails={projectDetails} />
                </Col>
            </Row>
        </>
    );
};

export default DashBoard1;

import { Row, Col, Form } from 'react-bootstrap';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';

import regionalConfig from '../../../config_region';

// hooks
import { usePageTitle, useRedux } from '../../../hooks';

const DashBoard1 = () => {
    // set pagetitle
    usePageTitle({
        title: 'Insights',
        breadCrumbItems: [
            {
                path: '/apps-insights',
                label: 'Insights',
                active: true,
            },
        ],
    });

    const { dispatch, appSelector } = useRedux();

    const { layoutColor, layoutWidth, menuPosition, topbarTheme, isOpenRightSideBar, pageTitle } = appSelector(
        (state) => ({
            layoutColor: state.Layout.layoutColor,
            layoutWidth: state.Layout.layoutWidth,
            menuPosition: state.Layout.menuPosition,
            topbarTheme: state.Layout.topbarTheme,
            isOpenRightSideBar: state.Layout.isOpenRightSideBar,
            pageTitle: state.PageTitle.pageTitle,
        })
    );

    const sisenseThemeId = () => {
        if (layoutColor == 'dark') {
            return regionalConfig.DARK_THEME_ID;
        } else {
            return regionalConfig.LIGHT_THEME_ID;
        }
    };

    const targetIframe = useRef(null);

    let dashboardIframe: any

    let dashboardSettings = {
        showToolbar: true,
        showLeftPane: false,
        showRightPane: false
    }

    const [embedSdk, setEmbedSdk] = useState<any>({});
    const [sisenseDashboard, setSisenseDashboard] = useState<any>({});
    const [isEmbedSdkLoaded, setIsEmbedSdkLoaded] = useState(false);
    const [isEmbedSdkScriptAdded, setEmbedSdkScriptAdded] = useState(false);

    const loadEmbedSdk = (url: string) => {
        const script = document.createElement('script');
        script.src = url;
        script.setAttribute('script-name', 'sisenseEmbedSdk');
        document.head.appendChild(script);
        setEmbedSdkScriptAdded(true);
        const promise = new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
        });
        return promise;
    };

    const setEmbedSdkVariables = () => {
        if (!isEmbedSdkLoaded) {
            setEmbedSdk((window as any)['sisense.embed']);
            setIsEmbedSdkLoaded(true);
        }

        const promise = new Promise((resolve, reject) => {
            resolve('');
        });
        return promise;
    };

    function dashboardLoadedHandler(args: any) {

        var dash = args.dashboard;
        //console.log('Dashboard ' + dash.oid + ' loaded');

        // Log size of dashboard when it loads
        sisenseDashboard.getSize().then(function (data: any) {
            let newHeight = data.content.height + 50; //getSize doesn't seem to be quite big enough
            dashboardIframe.style['height'] = newHeight + 'px';
            //console.log('New dashboard content height is ' + newHeight + ' px');
        });
    }

    //this needs to be converted to a promise?
    const renderDashboard = () => {
        dashboardIframe = document.getElementsByTagName('iframe')[0]
        if (typeof sisenseDashboard.dashboard === "undefined") {
            setSisenseDashboard(() => {
                let sisenseDash = new embedSdk.SisenseFrame({
                    url: regionalConfig.SISENSE_URL,
                    dashboard: regionalConfig.DASHBOARD_ID,
                    theme: sisenseThemeId(),
                    settings: dashboardSettings,
                    volatile: true,
                    element: dashboardIframe

                })

                return sisenseDash;
            });
        }
        else {
            sisenseDashboard.updateSettings(dashboardSettings);
        }

        if (sisenseDashboard.dashboard) {
            sisenseDashboard.render().then(() => {
                console.log("Sisense dashboard render() completed");

                sisenseDashboard.dashboard.on(embedSdk.enums.DashboardEventType.LOADED, dashboardLoadedHandler);

                sisenseDashboard.app.setTheme(sisenseThemeId());
            }).catch((e: any) => {
                console.log(e);
            });
        }

    };

    const updateDashboard = () => {

        if (sisenseDashboard && dashboardSettings) {
            dashboardSettings.showToolbar = false;
            sisenseDashboard.updateSettings(dashboardSettings)
        }

    };

    //TODO: the theme changes but the dashboard doesn't reload - need to trigger refresh somehow
    const urlParams = 'hostname=' + window.location.hostname + '&amp;sisenseUrl=' + regionalConfig.SISENSE_URL;
    // let embedUrl =
    //     regionalConfig.SISENSE_URL +
    //     '/app/main#/dashboards/' +
    //     regionalConfig.DASHBOARD_ID +
    //     '?embed=true&amp;r=true&amp;theme=' +
    //     sisenseThemeId()
    //     //+ '&t=true'
    //     //+ '&edit=true'
    //     + '&amp;' + urlParams;

    const url = regionalConfig.SISENSE_URL + '/js/frame.js'// + '?' + urlParams;

    if (isEmbedSdkLoaded) {
        //console.log('calling renderDashboard');
        //renderDashboard();
    }
    else {
        if (isEmbedSdkScriptAdded) {
            setEmbedSdkVariables().then(() => {
                //console.log("promise returned from setEmbedSdkVariables");
                //console.log('calling renderDashboard');
                //renderDashboard();
            }).catch(e => {
                console.log(e);
            });
        }
        else {
            loadEmbedSdk(url).then(() => {
                //console.log("promise returned from loadEmbedSdk");
                //works after script loaded (navigate away and back again)
                setEmbedSdkVariables().then(() => {
                    //console.log("promise returned from setEmbedSdkVariables");
                    //console.log('calling renderDashboard');
                    //renderDashboard();
                }).catch(e => {
                    console.log(e);
                });
            });

        }


    }

    useEffect(() => {

        if (isEmbedSdkLoaded && embedSdk) {
            renderDashboard();
            //console.log(sisenseDashboard);

        }

        return () => {
            // let script = document.querySelector(`script[script-name="sisenseEmbedSdk"]`);
            // document.body.removeChild(script);
        }
    });

    return (
        <>
            {/* <Row>
                <Col><button onClick={updateDashboard}>Remove Toolbar</button></Col>
                <Col>
                    <Form.Switch
                        id="showFilterPane"
                        label="Show Filters"
                    />
                </Col>
                <Col></Col>
                <Col></Col>
            </Row> */}
            <Row>
                <Col id="dashboardContainer">

                    <iframe
                        id="sisense-iframe"
                        width="100%"
                        height="1000px"
                        frameBorder="0"
                        scrolling="auto"
                        title="sisenseDashboard"
                        ref={targetIframe}
                        name="sisense-iframe"
                    ></iframe>

                </Col>

            </Row>
        </>
    );
};

export default DashBoard1;

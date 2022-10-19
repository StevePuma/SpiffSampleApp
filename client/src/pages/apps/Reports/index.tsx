import { Row, Col, Form } from 'react-bootstrap';
import { useEffect, useLayoutEffect, useState, useRef } from 'react';

import regionalConfig from '../../../config_region';

// hooks
import { usePageTitle, useRedux } from '../../../hooks';

const ReportsPage = () => {
    // set pagetitle
    usePageTitle({
        title: 'Reports',
        breadCrumbItems: [
            {
                path: '/apps-reports',
                label: 'Reports',
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


    //TODO: the theme changes but the dashboard doesn't reload - need to trigger refresh somehow
    const urlParams = 'hostname=' + window.location.hostname + '&amp;sisenseUrl=' + regionalConfig.SISENSE_URL;
    let embedUrl =
        regionalConfig.SISENSE_URL +
        '/plugins/reportManager/main.html#/reports' +
        '?embed=true' +
        '&amp;' + urlParams;


    return (
        <>
            <Row>
                <iframe
                    width="100%"
                    height="1000px"
                    frameBorder="0"
                    scrolling="auto"
                    title="reportManager"
                    src={embedUrl}></iframe>
            </Row>
        </>
    );
};

export default ReportsPage;

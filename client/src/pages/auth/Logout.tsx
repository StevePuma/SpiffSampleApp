import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import regionalConfig from '../../config_region';

// hooks
import { useRedux } from '../../hooks/';

//actions
import { logoutUser, resetAuth } from '../../redux/actions';

// components
import AuthLayout from './AuthLayout';

// images
import LogoDark from '../../assets/images/crm_logo_small.png';
import LogoLight from '../../assets/images/crm_logo_small_dark.png';

const LogoutIcon = () => {
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle
                className="path circle"
                fill="none"
                stroke="#4bd396"
                strokeWidth="6"
                strokeMiterlimit="10"
                cx="65.1"
                cy="65.1"
                r="62.1"
            />
            <polyline
                className="path check"
                fill="none"
                stroke="#4bd396"
                strokeWidth="6"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
        </svg>
    );
};

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();
    return (
        <Row className="mt-3">
            <Col xs={12} className="text-center">
                <p className="text-muted">
                    {t('Back to')}{' '}
                    <Link to={'/auth/login'} className="text-dark ms-1">
                        <b>{t('Sign In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Logout = () => {
    const { t } = useTranslation();
    const { dispatch } = useRedux();

    fetch(`${regionalConfig.SISENSE_URL}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include'
    })
        .catch(error => {
            console.error('Sisense SSO Logout error:', error);
        });

    //TODO: add code here to remove the <script> tag that src attribute points to *sisense.v1.js*
    let sjstags = document.querySelectorAll('[script-name="sisensejs"]');
    sjstags.forEach((tag) => {
        tag.remove();
    });

    if ((window as any)["SisenseAppContext"]) {
        delete (window as any)["SisenseAppContext"];
    }

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch]);


    return (
        <AuthLayout hasLogo={true} bottomLinks={<BottomLink />}>

            <div className="text-center">
                <div className="mt-4">
                    <div className="logout-checkmark">
                        <LogoutIcon />
                    </div>
                </div>

                <h3>{t('See you again !')}</h3>

                <p className="text-muted"> {t('You are now successfully signed out.')} </p>
            </div>
            <div style={{ display: 'none' }}>
                <iframe
                    width="1px"
                    height="1px"
                    frameBorder="0"
                    scrolling="auto"
                    title="sisenseLogout"
                    src={`${regionalConfig.SISENSE_URL}/api/auth/logout`}></iframe>
            </div>
        </AuthLayout>
    );
};

export default Logout;

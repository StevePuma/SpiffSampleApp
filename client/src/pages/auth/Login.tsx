import { useEffect, useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Navigate, Link, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

// hooks
import { useRedux } from '../../hooks/';

// actions
import { resetAuth, loginUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/form/';
import Loader from '../../components/Loader';

import AuthLayout from './AuthLayout';

import userList from '../../helpers/user-list';

type LocationState = {
    from?: Location;
};

type UserData = {
    email: string;
    password: string;
};

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            {/* <Col xs={12} className="text-center">
                <p className="text-muted">
                    <Link to="/auth/forget-password" className="text-muted ms-1">
                        <i className="fa fa-lock me-1"></i>
                        {t('Forgot your password?')}
                    </Link>
                </p>
                <p className="text-muted">
                    {t("Don't have an account?")}{' '}
                    <Link to={'/auth/register'} className="text-dark ms-1">
                        <b>{t('Sign Up')}</b>
                    </Link>
                </p>
            </Col> */}
        </Row>
    );
};

const Login = () => {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();

    const { user, userLoggedIn, loading, error } = appSelector((state) => ({
        user: state.Auth.user,
        loading: state.Auth.loading,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    const [uname, setUname] = useState("");
    const [pword, setPword] = useState("");

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter Email')).email(t('Please enter valid Email')),
            password: yup.string().required(t('Please enter Password')),
        })
    );

    const handleUserSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        users && users.map(user => {
            if(e.target.value.includes("select a user")) {
                setUname("");
                setPword("");
                return;
            }
            else if (user.emailAddress?.includes(e.target.value)) {
                setUname(user.emailAddress);
                setPword(user.password);
                document.getElementById('inputEmail')?.focus();
                setTimeout(()=>{document.getElementById('inputPassword')?.focus()}, 250)
            }
        })
    }

    const handleEmailTyped = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUname(e.target.value);
    }
    const handlePasswordTyped = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPword(e.target.value);
    }

    /*
    handle form submission
    */
    const onSubmit = (formData: UserData) => {
        dispatch(loginUser(formData['email'], formData['password']));
    };

    const location = useLocation();
    let redirectUrl = '/';

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/';
    }

    const [users, setUsers] = useState(userList.map(u => (
        { emailAddress: u.email, password: u.password }
    )));

    return (
        <>
            {userLoggedIn && user && <Navigate to={redirectUrl} replace />}

            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0">{t('Sign In')}</h4>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                {loading && <Loader />}

                <VerticalForm<UserData>
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                // defaultValues={{ email: 'rihanna.jones@strategic-growth.com', password: 'bestcrm2022!' }}
                >
                    <FormInput
                        name="userlist"
                        label={t('User Shortcuts')}
                        type="select"
                        containerClass="mb-3"
                        className="form-select"
                        key="select"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleUserSelected(e)}
                    >
                        <option key="blank"> -- select a user or type below -- </option>
                        {users && users.map((user) => <option key={user.emailAddress}>{user.emailAddress}</option>)}
                    </FormInput>
                    <FormInput
                        name="email"
                        id="inputEmail"
                        label={t('Email address')}
                        type="text"
                        containerClass="mb-3"
                        //key="select"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleEmailTyped(e)}
                        value={uname}
                    >
                    </FormInput>
                    <FormInput
                        label={t('Password')}
                        id="inputPassword"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        containerClass={'mb-3'}
                        //onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handlePasswordTyped(e)}
                        // value={pword}
                    >
                    </FormInput>

                    <FormInput
                        type="checkbox"
                        name="checkbox"
                        label={t('Remember me')}
                        containerClass={'mb-3'}
                        defaultChecked
                    />

                    <div className="text-center d-grid mb-3">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default Login;

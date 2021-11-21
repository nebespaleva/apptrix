import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Layout, Input, Button } from 'antd';
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { setLoading } from '../../Reducers/signInReducer';
import { postLogInData } from '../../AsyncActions/asyncLogin';
import HeaderComponent from '../../Components/Header/Header';
import './index.scss';

const { Content, Footer } = Layout;

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchRequest = useSelector((state) => state.signInStore.loading);
    const error = useSelector((state) => state.signInStore.error);
    const authorized = useSelector((state) => state.signInStore.isAuthorized);

    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');

    useEffect(() => {
        if (authorized) {
            navigate('/users');
        } else {
            localStorage.clear();
        }
    }, [authorized, navigate]);

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(postLogInData(uname, pass));
    }

    return(
        <Layout className="layout">
        <HeaderComponent 
            authorized={authorized}
            selected={2}
        />
        <Content>
            <form className="content-wrapper">
                <Input 
                    value={uname}
                    onChange={(e) => setUname(e.target.value)}
                    placeholder="username" 
                    prefix={<UserOutlined />} 
                    style={{ 
                        width: '20%',
                        marginBottom: '25px'
                    }}
                />
                <Input.Password
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{ 
                        width: '20%',
                        marginBottom: '25px'
                    }}
                />
                <Button 
                    type='submit'
                    loading={fetchRequest}
                    onClick={(e) => handleSignIn(e)}
                >Sign In</Button>
            </form>
            { error &&                 
                <h3 className="content-wrapper__error">
                    Incorrect login or password. Please, try again.
                </h3> }
        </Content>
        <Footer style={{ textAlign: 'center' }}>Apptrix</Footer>
        </Layout>
    )
};

export default LoginPage;
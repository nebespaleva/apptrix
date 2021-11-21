import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { setAuthorized } from "../../Reducers/signInReducer";
import './index.scss';


const { Header } = Layout;

const HeaderComponent = ({authorized, selected}) => {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        if (authorized) {
            dispatch(setAuthorized(false));
            localStorage.clear();
        }
    }

    return(
        <Header className='header-wrapper'>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[`${selected}`]}>
                    <Menu.Item key='1'>
                        <Link to='/home'>
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item 
                        key='2'
                        onClick={handleSignOut}
                    >
                    <Link to='/login'>
                            { 
                              authorized ?
                              'Sign Out' :
                              'Sign In'
                            }
                        </Link>
                    </Menu.Item>
                
            </Menu>
        </Header>
    )
};

export default HeaderComponent;
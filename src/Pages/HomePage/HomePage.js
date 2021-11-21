import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Layout } from "antd";
import HeaderComponent from "../../Components/Header/Header";
import { postDataToCardsTable } from "../../AsyncActions/asyncCard";
import { setCardsLoading, setCurrentCardID } from "../../Reducers/cardReducer";
import "./index.scss";

const { Content, Footer } = Layout;

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authorized = useSelector((state) => state.signInStore.isAuthorized);
    const cards = useSelector((state) => state.cardStore.cards);
    const isFetched = useSelector((state) => state.cardStore.loading);

    useEffect(() => {
        dispatch(setCardsLoading(true));
        dispatch(postDataToCardsTable());
    }, [authorized]);

    const cardsItemsWithKey = cards.map((item) => {
        return {
            ...item,
            key: item.id
        }
    });

    const handleCurrentID = (text) => {
        navigate(`/current-card-info-${text}`)
        dispatch(setCurrentCardID(text));
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a onClick={() => handleCurrentID(text)}>{text}</a>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }
    ];

    return(
        <Layout className='layout'>
            <HeaderComponent
                authorized={authorized}
                selected={1}
            />
            <Content>
                <Table dataSource={cardsItemsWithKey} columns={columns} loading={isFetched}/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Apptrix</Footer>
        </Layout>
    )
};

export default HomePage;
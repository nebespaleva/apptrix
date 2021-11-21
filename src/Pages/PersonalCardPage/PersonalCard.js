import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Layout, Card } from "antd";
import HeaderComponent from "../../Components/Header/Header";
import './index.scss';

const { Content, Footer } = Layout;

const PersonalCard = () => {
    const navigate = useNavigate();

    const currentCardID = useSelector((store) => store.cardStore.currentCardID);
    const authorized = useSelector((store) => store.signInStore.isAuthorized);
    const cards = useSelector((store) => store.cardStore.cards);

    useEffect(() => {
        if (!authorized) {
            navigate('/login')
            localStorage.clear();
        }
    }, [authorized]);

    let cardInfo = cards.filter((item) => item.id === currentCardID);

    const renderCard = (cardInfo) => {
        return(
            <Card title={`Name: ${cardInfo[0].name}`} bordered={false} style={{ width: 300 }}>
            <p>Login: {cardInfo[0].login}</p>
            <p>Email: {cardInfo[0].email}</p>
            <p>ID: {cardInfo[0].id}</p>
            <p>Type: {cardInfo[0]['$type']}</p>
        </Card>
        )
    }

    return(
        <Layout className='layout'>
            <HeaderComponent authorized={authorized}/>
            <Content className='content-card-wrapper'>
               {renderCard(cardInfo)}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Apptrix</Footer>
        </Layout>
    )
}

export default PersonalCard;
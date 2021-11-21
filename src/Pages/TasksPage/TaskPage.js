import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Table, Layout, AutoComplete } from "antd";
import { postDataToTasksTable, postFilteredDataToTaskTable } from "../../AsyncActions/asyncTask";
import { setCardsLoading } from "../../Reducers/cardReducer"; 
import HeaderComponent from "../../Components/Header/Header";

const { Content, Footer } = Layout;

const TaskPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authorized = useSelector((state) => state.signInStore.isAuthorized);
    const tasks = useSelector((state) => state.cardStore.tasks);
    const isFetched = useSelector((state) => state.cardStore.loading);

    useEffect(() => {
        if (!authorized) {
            navigate('/login')
            localStorage.clear();
        }
    }, [authorized, navigate]);

    useEffect(() => {
        dispatch(setCardsLoading(true));
        dispatch(postDataToTasksTable());
    }, [authorized]);

    const taskItemsWithKey = tasks.map((item) => {
        return {
            id: item.id,
            key: item.id,
            summary: item.summary,
            name: item.project.name,
        }
    });

    const options = Array.from(new Set(tasks.map((item) => item.project.name))).map(item => {
        return {
            value: item
        }
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Project Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Summary',
            dataIndex: 'summary',
            key: 'summary',
        }
    ];

    const handleChangeValue = (value) => {
        if (value.length >= 3) {
            dispatch(postFilteredDataToTaskTable(value));
        }
        if (!value.length) {
            dispatch(postDataToTasksTable());
        }
    }

    return(
        <Layout>
            <HeaderComponent selected={3} authorized={authorized}/>
            <Content>
                <AutoComplete
                style={{ width: 200, marginBottom: '25px' }}
                options={options}
                placeholder="Enter project name"
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                onChange={(value) => handleChangeValue(value)}
                />
                <Table dataSource={taskItemsWithKey} columns={columns} loading={isFetched}/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Apptrix</Footer>
        </Layout>
    )
}

export default TaskPage;
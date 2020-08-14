import React, { Component } from 'react';
// import styles from './index.module.css';
import Table from '../../components/admin-table';
import AdminWrapper from '../../components/admin-wrapper';
import { getAllUsers } from '../../utils/requester';

class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }
    componentDidMount = async () => {
        const users = await getAllUsers();
        this.setState({
            users
        });
    }
    render() {
        const { users } = this.state
        return (
            <AdminWrapper>
                <Table data={users} />
            </AdminWrapper>
        );
    }   
}

export default Users;

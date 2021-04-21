import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../react/Context';
import styles from './index.module.css';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import Input from '../../components/user-input';
import SubmitButton from '../../components/submit-button';
import UsersList from '../../components/user-list';
import { createGroup } from '../../requester';


function GroupPage() {

    const context = useContext(UserContext);
    const history = useHistory();

    const [user, setUser] = useState(context.user);
    const [name, setName] = useState('');
    const [members, setMembers] = useState([user]);
    const [type, setType] = useState('group');
    const [errName, setErrName] = useState(null);

    const addUser = (e) => {
        const id = e.target.value;
        const friend = user.friends.find(u => u._id === id);

        if (members.find(u => u._id === friend._id))
            return;

        setMembers([...members, friend]);
    }

    const removeUser = (e) => {
        const id = e.target.value;
        const match = (u) => u._id === id && u._id !== user._id;
        if (members.some(match)) {
            members.splice(members.findIndex(match), 1);
            setMembers([...members]);
        }
    }

    const filterUsers = () => {
        return user
            .friends
            .filter(friend => {
                return !members.some(groupMember => groupMember._id === friend._id);
            });
    }

    const isInvalid = () => {
        setErrName(null);
        let result = false;
        if (name === '' || name.length < 2 || name.length > 20) {
            setErrName('Your group name must be between 2 and 20 characters!');
            result = true;
        }
        return result;
    }

    const sendRequest = async () => {
        const group = { name, type, members }
        const response = await createGroup(group);
        history.push(`/chat/${response._id}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (isInvalid()) return;
        sendRequest();
    }

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <h2>Create Group</h2>
                <form className={styles.form} onSubmit={onSubmit}>
                    <Input
                        name="name"
                        err={errName}
                        type="text"
                        placeholder="Group Name"
                        vlalue={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <SubmitButton value="Create Group" />
                </form>
                <UsersList
                    users={members}
                    heading={'Group Members'}
                    buttons={{ remove: removeUser }}
                    empty={'There is no friends in this section'}
                />
                <UsersList
                    users={filterUsers()}
                    heading={'Add members'}
                    buttons={{ add: addUser }}
                    empty={'There is no friends in this section'}
                />
            </Wrapper>
        </div>
    );
}

export default GroupPage;
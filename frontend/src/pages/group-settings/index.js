import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../react/Context';
import styles from './index.module.css';

import Header from '../../components/header';
import Wrapper from '../../components/wrapper-main';
import Input from '../../components/user-input';
import SubmitButton from '../../components/submit-button';
import UsersList from '../../components/list-user';
import { updateChat } from '../../requester';
import GroupsMenu from '../../components/menu-groups';
import { getChat } from '../../requester';
import BorderWrapper from '../../components/wrapper-border';
import Card from '../../components/card';

function SettingsGroupPage({match}) {

    const context = useContext(UserContext);
    const history = useHistory();
    const [group, setGroup] = useState({})
    const [user, setUser] = useState(context.user);

    const [name, setName] = useState('');
    const [errName, setErrName] = useState(null);
    const [about, setAbout] = useState('');
    const [type, setType] = useState('private');
    const [members, setMembers] = useState([user]);
    const [image, setImage] = useState('');
    const [website, setWebsite] = useState('');

    const fetchData = async (id) => {
        if (!id) return;
        const room = await getChat(id);
        if (!room) return;

        setGroup(room);
        setName(room.name);
        setAbout(room.about);
        setImage(room.image);
        setWebsite(room.website);
        setType(room.type);
        setMembers(room.members);
    }
    useEffect(() => {
        fetchData(match?.params?.id);
        setUser(context.user);
    }, [context.user, match.params.id]);

    const addUser = (e) => {
        const id = e.target.value;
        const friend = user.friends.find(u => u._id === id);
        if (members.find(u => u._id === friend._id)) return;
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

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isInvalid()) return;
        group.name = name;
        group.about = about;
        group.image = image;
        group.type = type;
        group.members = members;   
        group.website = website;    
        const response = await updateChat(group);
        history.push(`/group/${response._id}`);
    }

    return (
        <div className={styles.container}>
            <Header />
            <Wrapper>
                <GroupsMenu />
                <h2>Group Settings</h2>
                <BorderWrapper heading="Group Card">
                    <div className={styles['card-holder']}>
                        <Card data={group} />
                    </div>
                </BorderWrapper>
                <form className={styles.form} onSubmit={onSubmit}>
                    <Input
                        name="name"
                        err={errName}
                        type="text"
                        placeholder="Group name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        name="about"
                        type="text"
                        placeholder="About group"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                    <Input
                        name="image"
                        type="text"
                        placeholder="Image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <Input
                        name="website"
                        type="text"
                        placeholder="Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <select
                        className={styles.select}
                        name="type"
                        value={type}
                        onChange={(e) => { setType(e.target.value) }}
                    >
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </select>
                    <SubmitButton value="Save" />
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

export default SettingsGroupPage;
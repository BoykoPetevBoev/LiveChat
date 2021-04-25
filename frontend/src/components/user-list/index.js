import React from 'react';
// import styles from './index.module.css';
import CardWrapper from '../card-user';
import BorderWrapper from '../wrapper-border'
import UserCardCompact from '../card-info-aside';
import GroupCard from '../card-group';

function UsersList({ rooms, users, heading, buttons, empty }) {

    const RenderUsers = () => {
        if (!users || users.length === 0)
            return <p>{empty}</p>

        if (!rooms)
            return users.map((user) => <CardWrapper id={user._id} buttons={buttons} user={user} />)

        return users.map((user) => {
            const chat = rooms.find(room => room.members.includes(user._id))
            return <CardWrapper id={chat._id} buttons={buttons} user={user} />
        })
    }
    const RenderRooms = () => {
        return !rooms || rooms.length === 0
            ? <p>{empty}</p>
            : rooms?.map((room) => <CardWrapper id={room._id} {...buttons} key={room._id}><GroupCard room={room} /></CardWrapper>)
    }

    return (
        <BorderWrapper heading={heading}>
            {
                users ? <RenderUsers /> : <RenderRooms />
            }
        </BorderWrapper >
    )
}

export default UsersList
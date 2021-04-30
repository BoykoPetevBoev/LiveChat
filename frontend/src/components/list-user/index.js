import React from 'react';
import UserCard from '../card-user';
import BorderWrapper from '../wrapper-border'

function UsersList({ users, rooms, buttons, empty }) {
    return (
        <BorderWrapper heading="Friends">
            {
                !users || users.length === 0
                    ? <p>{empty}</p>
                    : users.map((user) => {
                        const chat = rooms?.find(room => room.members.includes(user._id))
                        return <UserCard id={chat?._id} buttons={buttons} user={user} key={user._id} />
                    })
            }
        </BorderWrapper >
    )
}

export default UsersList
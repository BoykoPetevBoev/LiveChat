import React from 'react';
import Card from '../card';
import BorderWrapper from '../wrapper-border'

function UsersList({ users, rooms, buttons, empty, heading }) {
    return (
        <BorderWrapper heading={heading}>
            {
                !users || users.length === 0
                    ? <p>{empty}</p>
                    : users.map((user) => {
                        const chat = rooms?.find(room => room.members.includes(user._id))
                        return <Card id={chat?._id} buttons={buttons} data={user} key={user._id} />
                    })
            }
        </BorderWrapper >
    )
}

export default UsersList
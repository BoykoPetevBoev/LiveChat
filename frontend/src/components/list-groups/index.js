import React from 'react';
import BorderWrapper from '../wrapper-border'
import GroupCard from '../card-group';

function GroupsList({ groups, buttons, empty }) {
    return (
        <BorderWrapper heading="Groups">
            {
                !groups || groups.length === 0
                    ? <p>{empty}</p>
                    : groups?.map((room) => <GroupCard room={room} buttons={buttons} key={room._id} />)
            }
        </BorderWrapper >
    )
}

export default GroupsList
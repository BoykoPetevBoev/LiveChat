import React from 'react';
import BorderWrapper from '../wrapper-border'
import GroupCard from '../card-group';

function GroupsList({ groups, buttons, empty, heading }) {
    return (
        <BorderWrapper heading={heading}>
            {
                !groups || groups.length === 0
                    ? <p>{empty}</p>
                    : groups?.map((room) => <GroupCard room={room} buttons={buttons} key={room._id} />)
            }
        </BorderWrapper >
    )
}

export default GroupsList
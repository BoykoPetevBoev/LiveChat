import React from 'react';
import BorderWrapper from '../wrapper-border'
import Card from '../card';

function GroupsList({ groups, buttons, empty, heading }) {
    return (
        <BorderWrapper heading={heading}>
            {
                !groups || groups.length === 0
                    ? <p>{empty}</p>
                    : groups?.map((room) => <Card data={room} buttons={buttons} key={room._id} />)
            }
        </BorderWrapper >
    )
}

export default GroupsList
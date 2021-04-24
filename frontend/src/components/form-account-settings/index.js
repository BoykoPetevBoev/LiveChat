import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom'
import { updateUser } from '../../requester'
import styles from './index.module.css';
import UserContext from '../../react/Context';
import SubmitButton from '../../components/submit-button';
import Input from '../../components/user-input';
import BorderWrapper from '../../components/wrapper-border';

function UserSettingsForm() {

    const [username, setUsername] = useState('');
    const [errUsername, setErrUsername] = useState(null);
    const [phone, setPhone] = useState('');
    const [errPhone, setErrPhone] = useState(null);
    const [website, setWebsite] = useState('');
    const [errWebsite, setErrWebsite] = useState(null);
    const [address, setAddress] = useState('')
    const [errAddress, setErrAddress] = useState(null)
    const [image, setImage] = useState('');
    const [errImage, setErrImage] = useState(null);

    const context = useContext(UserContext);
    // const history = useHistory();
    const [user, setUser] = useState(context.user);

    useEffect(() => {
        setUser(context.user);
        setUsername(context.user.username);
        // setImage(context.user.image);
        setPhone(context.user.phone);
        // setAddress(context.user.address);
        // setWebsite(context.user.website);

    }, [context.user])

    const validateUser = () => {
        setErrUsername(null);
        setErrWebsite(null);
        setErrAddress(null);
        setErrImage(null);
        setErrPhone(null)

        let result = false;
        if (image !== '' && (!image.startsWith('http://' || !image.startsWith('https://')))) {
            setErrImage('Image URL must start with "http://" or "https://"');
            result = true;
        }
        if (website !== '' && (!website.startsWith('http://' || !website.startsWith('https://')))) {
            setErrWebsite('Your website must start with "http://" or "https://"');
            result = true;
        }
        if (username === '' || username.length < 2 || username.length > 20) {
            setErrUsername('Your username must be between 2 and 20 characters!');
            result = true;
        }
        if (phone !== '' && (phone.length !== 10 || !Number(phone))) {
            setErrPhone('Pnone number must be 10 character long!');
            result = true;
        }
        return result;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const isInvalid = validateUser();
        if (isInvalid) return;

        user.image = image;
        user.website = website;
        user.username = username;
        user.address = address;
        user.phone = phone;
        const res = await updateUser(user);

        console.log(res);

        if (!res) return;

        context.updateUser(res);
    }

    return (
        <BorderWrapper heading='Account settings'>
            <form className={styles.form} onSubmit={onSubmit}>
                <Input
                    name="image"
                    label="Image"
                    err={errImage}
                    type="text"
                    placeholder='Image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <Input
                    name="username"
                    label="Username"
                    err={errUsername}
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    name="phone"
                    label="Phone"
                    err={errPhone}
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                    name="address"
                    label="Address"
                    err={errAddress}
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Input
                    name="website"
                    label="Website"
                    err={errWebsite}
                    type="text"
                    placeholder="Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
                <SubmitButton value='Save' />
            </form>
        </BorderWrapper>
    )
}

export default UserSettingsForm;
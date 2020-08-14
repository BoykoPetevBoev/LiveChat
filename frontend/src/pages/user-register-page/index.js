import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import UserContext from '../../Context';
import styles from './index.module.css';
import Header from '../../components/header';
import FormHolder from '../../components/user-form-holder';
import SubmitButton from '../../components/user-submit-button';
import Input from '../../components/user-input';
import { userRegister } from '../../utils/requester';

function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errFirstName, setErrFirstName] = useState(null);
    const [errLastName, setErrLastName] = useState(null);
    const [errEmail, setErrEmail] = useState(null);
    const [errPassword, setErrPassword] = useState(null);
    const [errRePassword, setErrRePassword] = useState(null);
    const context = useContext(UserContext);
    const history = useHistory();

    const validateForm = () => {
        setErrFirstName(null);
        setErrLastName(null);
        setErrEmail(null);
        setErrPassword(null);
        setErrRePassword(null);

        let result = true;
        if (firstName === '' || firstName.length < 2 || firstName.length > 50) {
            setErrFirstName('Your first name must be between 2 and 50 characters!');
            result = false;
        }
        if (lastName === '' || lastName.length < 2 || lastName.length > 50) {
            setErrLastName('Your last name must be between 2 and 50 characters!');
            result = false;
        }
        if (email === '' || !email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setErrEmail('Enter a valid email address!');
            result = false;
        }
        if (password === '' || password.length < 3 || password.length > 50) {
            setErrPassword('Password must be between 3 and 15 caracter long!');
            result = false;
        }
        if (rePassword !== password) {
            setErrRePassword('Password and Repeat password must be the same!');
            result = false;
        }
        return result;
    }
    const registerHandler = async () => {
        const body = {
            firstName,
            lastName,
            email,
            password
        };

        const user = await userRegister(body);
        if (user) {
            context.login(user);
            history.push('/');
        }
        else {
            setErrEmail('Email is already registered!');
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            registerHandler();
        }
    }

    return (
        <div className={styles.background}>
            <Header />

            <FormHolder className='register' title='Sign Up for Free'>
                <form onSubmit={onSubmit}>
                    <Input
                        name="firstName"
                        err={errFirstName}
                        type="text"
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input
                        name="lastName"
                        err={errLastName}
                        type="text"
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <Input
                        name="email"
                        err={errEmail}
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        err={errPassword}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        err={errRePassword}
                        type="password"
                        name="rePassword"
                        placeholder="Confirm Password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                    <SubmitButton value='GET STARTED' />
                </form>
            </FormHolder>
        </div>
    )
}


// class RegisterPage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             rePassword: '',
//             errFirstName: null,
//             errLastName: null,
//             errEmail: null,
//             errPassword: null,
//             errRePassword: null
//         }
//     }
//     onChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         });
//     }
//     validateForm = () => {
//         this.setState({
//             errFirstName: null,
//             errLastName: null,
//             errEmail: null,
//             errPassword: null,
//             errRePassword: null
//         })
//         const { firstName, lastName, email, password, rePassword } = this.state;
//         let result = true;
//         if (firstName === '' || firstName.length < 2 || firstName.length > 50) {
//             this.setState({
//                 errFirstName: 'Your first name must be between 2 and 50 characters!'
//             });
//             result = false;
//         }
//         if (lastName === '' || lastName.length < 2 || lastName.length > 50) {
//             this.setState({
//                 errLastName: 'Your last name must be between 2 and 50 characters!'
//             });
//             result = false;
//         }
//         if (email === '' || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
//             this.setState({
//                 errEmail: 'Enter a valid email address!'
//             });
//             result = false;
//         }
//         if (password === '' || password.length < 3 || password.length > 50) {
//             this.setState({
//                 errPassword: 'Password must be between 3 and 15 caracter long!'
//             })
//             result = false;
//         }
//         if (rePassword !== password) {
//             this.setState({
//                 errRePassword: 'Password and Repeat password must be the same!'
//             })
//             result = false;
//         }
//         return result;
//     }
//     registerHandler = async () => {
//         const user = this.state;
//         const url = 'http://localhost:5000/register';
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(user)
//         });
//         this.props.history.push('/');
//         console.log(response);
//     }

//     onSubmit = (e) => {
//         e.preventDefault();
//         const isValid = this.validateForm();
//         if (isValid) {
//             this.registerHandler();
//         }
//     }
//     render() {
//         return (
//             <div className={styles.background}>
//                 <Header />

//                 <FormHolder className='register' title='Sign Up for Free'>
//                     <form onSubmit={this.onSubmit}>
//                         <Input
//                             name="firstName"
//                             err={this.state.errFirstName}
//                             type="text"
//                             placeholder='First Name'
//                             value={this.state.firstName}
//                             onChange={this.onChange}
//                         />
//                         <Input
//                             name="lastName"
//                             err={this.state.errLastName}
//                             type="text"
//                             placeholder='Last Name'
//                             value={this.state.lastName}
//                             onChange={this.onChange}
//                         />
//                         <Input
//                             name="email"
//                             err={this.state.errEmail}
//                             type="text"
//                             placeholder="Email"
//                             value={this.state.email}
//                             onChange={this.onChange}
//                         />
//                         <Input
//                             err={this.state.errPassword}
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={this.state.password}
//                             onChange={this.onChange}
//                         />
//                         <Input
//                             err={this.state.errRePassword}
//                             type="password"
//                             name="rePassword"
//                             placeholder="Confirm Password"
//                             value={this.state.rePassword}
//                             onChange={this.onChange}
//                         />
//                         <SubmitButton value='GET STARTED' />
//                     </form>
//                 </FormHolder>
//             </div>
//         );
//     };
// };
export default RegisterPage;
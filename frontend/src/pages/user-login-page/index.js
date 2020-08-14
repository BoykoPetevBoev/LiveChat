import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import styles from './index.module.css';
import Header from '../../components/header';
import FormHolder from '../../components/user-form-holder';
import SubmitButton from '../../components/user-submit-button';
import Input from '../../components/user-input';
import UserContext from '../../Context';
import { userLogin } from '../../utils/requester';


function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(null);
    const context = useContext(UserContext);
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setErr('Invalid email or password!');
            return;
        }
        const user = await userLogin({email, password});
        if (user) {
            context.login(user);
            history.push('/');
        }
        else {
            setErr('Invalid email or password!');
        }
    }

    return (
        <div className={styles.background}>
            <Header />
            <FormHolder className='login' title="Welcome Back!">
                <form onSubmit={onSubmit}>
                    <Input
                        name='email'
                        err={err}
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        name='password'
                        err={err ? true : false}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <SubmitButton value='LOGIN' />
                </form>
            </FormHolder>
        </div>
    )
}

export default LoginPage;







// class LoginPage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             err: null
//         }
//     }
//     onChange = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         });
//     }
//     onSubmit = (e) => {
//         e.preventDefault();
//         const { email, password } = this.state;
//         if (email === '' || password === '') {
//             this.setState({
//                 err: 'Invalid email or password!'
//             });

//         } else {
//             console.log('login: ', this.state);
//         }
//     }
//     render() {
//         return (
//             <div className={styles.background}>
//                 <Header />
//                 <FormHolder className='login' title="Welcome Back!">
//                     <form onSubmit={this.onSubmit}>
//                         <Input
//                             name='email'
//                             err={this.state.err}
//                             type='text'
//                             placeholder='Email'
//                             value={this.state.email}
//                             onChange={this.onChange}
//                         />
//                         <Input
//                             name='password'
//                             err={this.state.err ? true : false}
//                             type='password'
//                             placeholder='Password'
//                             value={this.state.password}
//                             onChange={this.onChange}
//                         />
//                         <SubmitButton value='LOGIN' />
//                     </form>
//                 </FormHolder>
//             </div>
//         );
//     };
// };


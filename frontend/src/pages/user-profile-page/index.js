import React, { useContext, useState, useEffect } from 'react';
import styles from './index.module.css'
import UserContext from '../../Context';
import { Link } from 'react-router-dom';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Products from '../../components/user-cart-products';

import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Favorite from '@material-ui/icons/Favorite';


function UserPage(props) {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const context = useContext(UserContext);

    useEffect(() => {
        if (context.user) {
            setCart(context.user.shoppingCart);
            setWishlist(context.user.wishlist);
        }
    }, [])

    const showTable = (products) => {
        return products.map(product => {
            return (
                <Products item={product} />
            )
        })
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.user}>
                <div className={styles.welcome}>
                    <p>Welcome {context.user.firstName} {context.user.lastName}</p>
                </div>
                <div className={styles.account}>
                    <p>Account</p>
                    <table className={styles.table}>
                        <tbody>
                            <tr className={styles.tr}>
                                <th>FIRST NAME:</th>
                                <td>{context.user.firstName}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <th>LAST NAME:</th>
                                <td>{context.user.lastName}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <th>EMAIL:</th>
                                <td>{context.user.email}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <th>PHONE:</th>
                                <td>{context.user.phone}</td>
                            </tr>
                            <tr className={styles.tr}>
                                <th>ADDRESS:</th>
                                <td>{context.user.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Link className={styles.ico} to='/shopping-cart'>
                    <ShoppingCart />
                </Link>
                <Link className={styles.ico} to='/wishlist'>
                    <Favorite />
                </Link>

                <div className={styles['shopping-cart']}>
                    <p className={styles.name}>Shopping Cart</p>
                    {showTable(cart)}
                </div>

                <div className={styles.wishlist}>
                    <p className={styles.name}>Wishlist</p>
                    {showTable(wishlist)}
                </div>
                
            </div>
            <Footer />
        </div>
    );
}

export default UserPage;
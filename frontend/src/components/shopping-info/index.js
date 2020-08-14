import React, { useContext, useState, useEffect } from 'react';
import styles from './index.module.css';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Favorite from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';
import UserContext from '../../Context';
import { Link } from 'react-router-dom';

function ShoppingInfo() {
    const context = useContext(UserContext);
    const [cart, setCart] = useState(0);
    const [wishlist, setWishlist] = useState(0);
    const [totalPrice, setTotalParice] = useState('0.00')

    useEffect(() => {
        const user = context.user
        if (user) {
            setCart(user.shoppingCart.length);
            setWishlist(user.wishlist.length);
            const price = user.shoppingCart.reduce((acc, cur) => {
                return acc += Number(cur.price);
            }, 0);
            setTotalParice(price.toFixed(2));
        }
        else {
            setCart(0);
            setWishlist(0);
            setTotalParice('0.00');
        }
    });

    return (
        <div className={styles.container} >

            <div className={styles.skew}>
                <p>$ {totalPrice}</p>
            </div>

            <div className={styles.links}>
                <Link className={styles.ico} to='/shopping-cart'>
                    <Badge color="secondary" badgeContent={cart}>
                        <ShoppingCart />
                    </Badge>
                </Link>

                <Link className={styles.ico} to='/wishlist'>
                    <Badge color="secondary" badgeContent={wishlist}>
                        <Favorite />
                    </Badge>
                </Link>
            </div>

        </div>
    );
}

export default ShoppingInfo;
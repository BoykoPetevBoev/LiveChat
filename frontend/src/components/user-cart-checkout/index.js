import React from 'react';
import styles from './index.module.css'

const CartCheckout = ({ cart }) => {

    const totalPrice = () => {
        const price = cart.reduce((acc, cur) => {
            return acc += Number(cur.price)
        }, 0)
        return price.toFixed(2);
    }
    
    return (
        <div className={styles.order}>
            <p className={styles.heading}>SUMMARY</p>

            <div className={styles['order-info']}>
                <p>Subtotal:</p>
                <p>${totalPrice()}</p>

                <p>Shipping:</p>
                <p>FREE</p>
            </div>

            <div className={styles['total-price']}>
                <p>TOTAL: </p>
                <p>${totalPrice()}</p>
            </div>

            <button className={styles.checkout}>CHECKOUT</button>

        </div>
    );
};

export default CartCheckout;
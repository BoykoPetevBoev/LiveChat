import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

function CartProducts({ item: product, onClick }) {
    const path = `/${product.category}/${product._id}`
    return (
        <div className={styles.product}>
            <Link to={path}>

                <div className={styles['image-holder']}>
                    <img className={styles.img} src={product.images[0]} alt={product.brand} />
                </div>

                <div className={styles['name-holder']}>
                    <p>{product.brand} {product.model}</p>
                </div>

                <div className={styles['price-holder']}>
                    <p className={styles.price}>${product.price}</p>
                </div>
            </Link>
            {onClick ?
                <div className={styles['button-holder']}>
                    <button className={styles.button} value={product._id} onClick={onClick} >✕</button>
                </div>
                : null
            }

        </div>
    );
}

export default CartProducts;
import React from 'react';
import styles from './index.module.css';
import Navigation from '../admin-navigation';
import ProductImages from '../product-images';
import ProductInfo from '../product-info';

function AdminFormWrepper(props) {

    return (
            <div className={styles.container}>

                {props.children}

                <div className={styles.warning}>
                    {props.error ? <p>{props.error}</p> : null}
                </div>

                <ProductImages images={props.images} />
                <ProductInfo
                    brand={props.brand}
                    model={props.model}
                    description={props.description}
                    characteristics={props.characteristics}
                    price={props.price}
                />
            </div>
    )
}

export default AdminFormWrepper;
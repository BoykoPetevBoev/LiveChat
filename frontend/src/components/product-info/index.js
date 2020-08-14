import React from 'react';
import styles from './index.module.css';
import Table from '../product-characteristics-table';

const ProductInfo = ({ brand, model, details, price, description, characteristics }) => {
    return (
        <div className={styles['info-holder']}>
            <p className={styles['product-name']}>{brand} {model}</p>
            <p className={styles['product-price']}>${price}</p>
            <div>
                <h4>DESCRIPTION</h4>
                <p>{details}</p>
                <p>{description}</p>
            </div>
            <div>
                <h4>SPECIFICATIONS</h4>
                <Table characteristics={characteristics} />
            </div>
        </div>
    );
};

export default ProductInfo;
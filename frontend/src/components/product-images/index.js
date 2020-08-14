import React from 'react';
import styles from './index.module.css';

function ImageHolder({ images }) {

    const renderImages = (image, index) => {
        return (
            <div key={index} className={styles['image-holder']}>
                <img src={image} alt='' />
            </div>
        )
    }

    if(!images) {
        return (
            <div>
                
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {
                images.map((image, index) => renderImages(image, index))
            }
        </div>
    );
}

export default ImageHolder;
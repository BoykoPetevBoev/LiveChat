import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../Context';
import styles from './index.module.css';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/header';
import ProductsTemplate from '../../components/products-template';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import Footer from '../../components/footer';
import { addToCart, removeFromWishlist } from '../../utils/user';



function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const context = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        setWishlist(context.user.wishlist);

    }, []);

    const removeProduct = async (e) => {
        const id = e.target.value;
        const user = await removeFromWishlist(id, context.user);
        context.updateUser(user);
        setWishlist(user.wishlist);
    }

    const addProduct = async (e) => {
        const id = e.target.value;
        const user = await addToCart(id, context.user);
        context.updateUser(user);
        history.push('/shopping-cart');
    }

    const renderProducts = (product) => {
        const path = `/${product.category}/${product._id}`
        return (
            <div key={product._id} className={styles.product}>
                <Link to={path}>
                    <ProductsTemplate  {...product} />
                </Link>
                <div>
                    <button value={product._id} className={styles.add} onClick={addProduct} >
                        <ShoppingCart className={styles.ico} />
                    </button>
                    <button value={product._id} className={styles.remove} onClick={removeProduct} >
                        <DeleteIcon className={styles.ico} />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles['wishlist-wrapper']}>

                <div className={styles.wishlist}>
                    <p>YOUR WISHLIST ({context.user.wishlist.length})</p>
                </div>

                <div className={styles.category}>
                    {wishlist.map(product => renderProducts(product))}
                </div>


            </div>
            <Footer />
        </div>
    );
}

export default Wishlist;
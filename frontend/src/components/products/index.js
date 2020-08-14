import React, { useState, useEffect, useContext } from 'react';
import styles from './index.module.css';
import { Link, useHistory } from 'react-router-dom';
import ProductsTemplate from '../products-template';
import { getAllProducts } from '../../utils/requester';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Favorite from '@material-ui/icons/Favorite';
import UserContext from '../../Context';
import { addToCart, addToWishlist } from '../../utils/user';
import { findByLabelText } from '@testing-library/react';

function Products({ filter }) {
    const [products, setProducts] = useState([]);
    const context = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const data = await getAllProducts();
        data.reverse();
        setProducts(data);
    }

    const addToCartHandler = async (e) => {
        if (!context.loggedIn) {
            return history.push('/login');
        }
        const id = e.target.value;
        const user = await addToCart(id, context.user);
        context.updateUser(user);
        history.push('/shopping-cart');
    }

    const addToWishlistHandler = async (e) => {
        if (!context.loggedIn) {
            return history.push('/login');
        }
        const id = e.target.value;
        const user = await addToWishlist(id, context.user);
        context.updateUser(user);
        history.push('/wishlist')
    }

    const renderProducts = (product) => {
        const path = `/${product.category}/${product._id}`
        
        if (filter && product.category !== filter) {
            return null;
        }

        return (
            <div key={product._id} className={styles.product}>
                <Link className={styles.link} to={path}>
                    <ProductsTemplate  {...product} />
                </Link>
                <button onClick={addToCartHandler} value={product._id} className={styles.add} >
                    <ShoppingCart className={styles.ico} />
                </button>
                <button onClick={addToWishlistHandler} value={product._id} className={styles.wishlist}>
                    <Favorite className={styles.ico} />
                </button>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {products.map(product => renderProducts(product))}
        </div>
    );
}

export default Products;





// class Product extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             data: [],
//             filter: this.props.filter
//         }
//     }
//     componentDidMount() {
//         this.getProducts();
//     }
//     async getProducts() {
//         const promise = await fetch('http://localhost:5000/get-products');
//         const data = await promise.json();
//         const { filter } = this.state;
//         let result = [];
//         if (filter) {
//             result = data.filter(obj => obj.category === filter)
//         }
//         else {
//             result = data.slice(0)
//         }

//         this.setState({
//             data: result.reverse()
//         });
//     }
//     renderProducts() {
//         const { data } = this.state;

//         return data.map((product) => {
//             const path = `/${product.category}/${product._id}`
//             return (
//                 <div key={product._id} className={styles.product}>

//                     <div className={styles.category}>
//                         <p>{product.category}</p>
//                     </div>

//                     <div className={styles.image}>
//                         <img src={product} alt="NoImage" />
//                     </div>

//                     <div className={styles.title}>
//                         <p> <b>{product.brand} {product.model}</b></p>
//                     </div>
//                     <div className={styles.price}>
//                         <p>${product.price}</p>
//                     </div>

//                     <div className={styles.buttons}>
//                         <Link className={styles.btnSave} to={path}>LEARN MORE</Link>
//                     </div>
//                 </div>
//             )
//         })
//     }
//     render() {
//         return (
//             <div className={styles.container}>
//                 {this.renderProducts()}
//             </div>
//         )
//     }
// }

// export default Product

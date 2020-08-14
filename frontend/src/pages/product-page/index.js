import React, { useState, useEffect, useContext } from 'react';
import styles from './index.module.css';
import UserContext from '../../Context';

import Wrapper from '../../components/wrapper';
import ProductImages from '../../components/product-images';
import ProductInfo from '../../components/product-info';
import ProductButton from '../../components/product-button';
import { getProduct } from '../../utils/requester';
import { addToCart, addToWishlist } from '../../utils/user';

import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Favorite from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom';

function Product(props) {
    const [product, setProduct] = useState({});
    const context = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await getProduct(props.match.params.id);
        setProduct(data);
    }

    const addToCartHandler = async () => {
        if (!context.loggedIn) {
            return props.history.push('/login');
        }
        const user = await addToCart(product._id, context.user);
        context.updateUser(user);
        history.push('/shopping-cart')
    }

    const addToWishlistHandler = async () => {
        if (!context.loggedIn) {
            return props.history.push('/login');
        }
        const user = await addToWishlist(product._id, context.user);
        context.updateUser(user);
        history.push('/wishlist')
    }

    return (
        <Wrapper>
            <div className={styles['product-wraper']}>
                <ProductImages images={product.images} />
                <ProductInfo
                    brand={product.brand}
                    model={product.model}
                    description={product.description}
                    price={product.price}
                    characteristics={product.characteristics}
                />
                <div className={styles['button-wrapper']}>

                    <ProductButton
                        onClick={addToCartHandler}
                    > <ShoppingCart /> </ProductButton>

                    <ProductButton
                        onClick={addToWishlistHandler}
                    > <Favorite /> </ProductButton>

                </div>
            </div>
        </Wrapper>
    );
}
export default Product;



// class ProductPage extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             product: {},
//             id: this.props.match.params.id
//         }
//     }
//     componentDidMount = async () => {
//         const { id } = this.state;
//         const promise = await fetch('http://localhost:5000/get-products');
//         const data = await promise.json();
//         const [product] = data.filter(obj => obj._id === id);
//         this.setState({
//             product
//         });
//     }
//     render() {
//         const { product } = this.state;
//         return (
//             <div>
//                 <Header />
//                 <Menu />
//                 <div className={styles.container}>
//                     {/* <ImageHolder images={[product., product.secondImage]} /> */}
//                     <div className={styles['pic-holder']}>
//                         <div className={styles['image-holder']}>
//                             <img src={product.} alt='' />
//                         </div>
//                         <div className={styles['image-holder']}>
//                             <img src={product.secondImage} alt='' />
//                         </div>
//                     </div>
//                     <div className={styles['info-holder']}>
//                         <p className={styles['product-name']}>{product.brand} {product.model}</p>
//                         <p>{product.details}</p>
//                         <p className={styles['product-price']}>${product.price}</p>
//                         <Link className={styles['add-to-cart']} to="/">ADD TO CART</Link>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }



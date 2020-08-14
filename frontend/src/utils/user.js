import { updateWishlist, updateShoppingCart } from './requester'

async function addToCart(id, user) {
    user.shoppingCart.push(id);
    const userUpdate = await updateShoppingCart(user);
    return userUpdate;
}
async function removeFromCart(id, user) {
    const index = user.shoppingCart.findIndex(el => el._id === id);
    user.shoppingCart.splice(index, 1);
    const userUpdate = await updateShoppingCart(user);
    return userUpdate;
}
async function addToWishlist(id, user) {
    const found = user.wishlist.find(el => el._id === id);
    if(found){
        return user;
    }
    user.wishlist.push(id);
    const userUpdate = await updateWishlist(user);
    return userUpdate;
}
async function removeFromWishlist(id, user) {
    const index = user.wishlist.findIndex(el => el._id === id);
    user.wishlist.splice(index, 1);
    const userUpdate = await updateWishlist(user);
    return userUpdate;

}

export {
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist
}
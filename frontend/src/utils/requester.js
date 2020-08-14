
async function fetchRequest(method, body, url) {
    const promise = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return promise;
}

async function handleUserRequest(promise) {
    if (promise.ok) {
        setToken(promise);
        const user = await promise.json();
        return user;
    }
    else {
        return null;
    }
}

function setToken(promise) {
    const token = promise.headers.get('Authorization');
    console.log(token);
    document.cookie = `GameZoneToken=${token}`;
}

async function userLogin(body) {
    const promise = await fetchRequest('POST', body, 'http://localhost:5000/login');
    return await handleUserRequest(promise);
}

async function userRegister(body) {
    const promise = await fetchRequest('POST', body, 'http://localhost:5000/register');
    return await handleUserRequest(promise);
}

async function userAuthorization(token) {
    const promise = await fetch('http://localhost:5000/verify', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    const response = await promise.json();
    return response;
}

async function getProduct(id) {
    const promise = await fetch(`http://localhost:5000/get-product?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (promise.ok) {
        const data = await promise.json();
        return data;
    }
    else {
        return {};
    }
}

async function getAllProducts() {
    const promise = await fetch('http://localhost:5000/get-products');
    if (promise.ok) {
        const data = await promise.json();
        return data;
    }
    else {
        return [];
    }
}

async function getAllUsers() {
    const promise = await fetch('http://localhost:5000/get-users');
    if (promise.ok) {
        const data = await promise.json();
        return data;
    }
    else {
        return [];
    }
}

async function addProduct(body) {
    const promise = await fetchRequest('POST', body, 'http://localhost:5000/add-product');
    if (promise.status === 201) {
        // const response = await promise.json();
        // return response;
    }
}

async function updateShoppingCart(user) {
    const promise = await fetchRequest('PUT', user, 'http://localhost:5000/update-shopping-cart');
    if (promise.status === 201) {
        const response = await promise.json();
        return response;
    }
}

async function updateWishlist(user) {
    const promise = await fetchRequest('PUT', user, 'http://localhost:5000/update-wishlist');
    if (promise.status === 201) {
        const response = await promise.json();
        return response;
    }
}

// async function changeProduct() {
// const data = await getAllProducts();
// data.map(async (product) => {
//     // console.log(product.images);
//     if (!product.images) {
//         // console.log(product);
//         const newProduct = product
//         const images = [product.firstImage, product.secondImage]
//         newProduct.firstImage = null;
//         newProduct.secondImage = null;
//         newProduct.images = images;
//         console.log(newProduct);
//         const res = await fetchRequest('PUT', newProduct, 'http://localhost:5000/update-product')
//         console.log(res);
//     }
// })
// }
// changeProduct();



module.exports = {
    userLogin,
    userRegister,
    userAuthorization,
    addProduct,
    updateShoppingCart,
    updateWishlist,
    getAllProducts,
    getAllUsers,
    getProduct
}
const Product = require('../models/Product');

async function addProduct(req, res, next) {
    const { category, brand, model, images, description, characteristics } = req.body;
    const price = Number(req.body.price).toFixed(2);

    const product = new Product({
        category,
        brand,
        model,
        price,
        images,
        description,
        characteristics
    })
    const status = await product.save();

    res.writeHead(201, { 'Content-Type': 'text/plain' }).send(status);
}
async function getProducts(req, res, next) {
    const data = await Product.find().lean();
    res.send(data);
}
async function getProduct(req, res, next) {
    const { id } = req.query;
    const product = await Product.findById(id).lean();
    res.send(product);
}
async function updateProduct(req, res) {
    const product = req.body

}


module.exports = {
    getProducts,
    addProduct,
    getProduct,
    updateProduct
}
import mongoose from 'mongoose';

export const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
    name: String, 
    slug: String,
    image: String,
    images: [String],
    brand: String,
    price: Number,
    description: String,
    countInStock: Number
})

const Product = mongoose.model('Product', ProductSchema)
export default Product;

// export function CreateNewProduct(req, res) {
//     const newProduct = new Product({
//         name: req.body.name,
//         image: req.body.image,
//         images: req.body.images,
//         brand: req.body.brand,
//         price: req.body.price,
//         description: req.body.description,
//         countInStock: req.body.countInStock
//     })
//     newProduct.save()
//     .then((createdProduct) => {
//         res.status(201).json(createdProduct)
//     })
//     .catch((err) => {
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
// }

// export function RemoveProduct(req, res) {
//     const id = req.body.id;
//     Product.findByIdAndDelete(id)
//     .then((deleteProduct) => {
//         res.stauts(200).json(deleteProduct)
//     })
//     .catch((err) => {
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
// }

// export function UpdateProduct(req, res) {
//     const id = req.body.id;
//     const name = req.body.name;
//     const image = req.body.image;
//     const price = req.body.price;
//     const description = req.body.description;
//     const countInStock = req.body.countInStock;
//     const updateProduct = Product.findByIdAndUpdate(id, {
//         name: name,
//         image: image, 
//         price: price,
//         description: description,
//         countInStock: countInStock
//     }, { new: true})
//     .then((updatedProduct) => {
//         res.status(200).json(updatedProduct)
//     })
//     .catch((err) => {
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
// }

// export function GetAllProducts(req, res) {
//     Product.find()
//     .then((products) => {
//         res.status(200).json(products);
//     })
//     .catch((err) => {
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
// }
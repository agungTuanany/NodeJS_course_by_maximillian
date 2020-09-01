"use strict";

/*
 * Controller for all "product" either admin-product or user-product
 *
 */

// Internal Dependencies
const Product = require("./../models/product.js");

const getProducts = (request, response, next) => {

    Product.fetchAll()
        .then(product => {

            return response.render('admin/products', {
                pageTitle: "Admin Products",
                path: 'admin//products',
                products: product
            });
        })
        .catch(err => console.log(err));

};

const getAddProduct = (request, response, next) => {

    return response
        .status(200)
        .render("admin/edit-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            editing: false
        });
};

const postAddProduct = (request, response, next) => {

    const title       = typeof(request.body.title) === "string" && request.body.title.trim().length > 0 ? request.body.title : false;
    const price       = typeof(parseFloat(request.body.price)) === "number" && parseFloat(request.body.price.length) > -1 ? parseFloat(request.body.price) : false;
    const imageUrl    = typeof(request.body.imageUrl) === "string" && request.body.imageUrl.trim().length > 0 ? request.body.imageUrl : false;
    const description = typeof(request.body.description) === "string" && request.body.description.trim().length > 0 ? request.body.description : false;

    //(title, price, imageUrl, description) {
    const product = new Product(title, price, imageUrl, description)

    product.save()
        .then(result => {

            return response
                .status(301)
                .redirect("/admin/products");
        })
        .catch(err => console.log(err));
};

// http://localhost:8080/admin/edit-product/123aabb?edit=true
const getEditProduct = (request, response, next) => {

    const editMode = request.query.edit;

    if (!editMode) {
        return response
            .status(301)
            .redirect("/");
    };

    const prodId = request.params.productId;

    Product.findById(prodId)
        .then(product => {

            // @NOTE: It's bad approach in UX, most of the time you want to show an
            // error instead redirect
            if(!product) {
                return response
                    .status(301)
                    .redirect("/")
            };

            return response
                .status(200)
                .render('admin/edit-product', {
                pageTitle: "Edit Product",
                path: '/admin/edit-product',
                editing:editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
};

const postEditProduct = (request, response, next) => {

    const prodId          = request.body.productId;
    const updatedTitle    = request.body.title;
    const updatedPrice    = request.body.price;
    const updatedImageUrl = request.body.imageUrl;
    const updatedDesc     = request.body.description;
    // (id, title, imageUrl, price, description)

    Product.findByPk(prodId)
        .then(product => {

            product.title       = updatedTitle;
            product.imageUrl    = updatedImageUrl;
            product.price       = updatedPrice;
            product.description = updatedDesc

            //  If the products doesn't exist will create a new one. This should not be happens
            return product.save()
        })
        // Handle any success saved product
        .then(result => {

            console.log("Succeeded update product");
            return response
                .status(301)
                .redirect("/admin/products");
        })
        .catch(err => console.log(err))
};

// const postDeleteProduct = (request, response, next) => {

//     const prodId = request.body.productId;

//     Product.findByPk(prodId)

//         .then(product => {

//             return product.destroy()
//         })
//         .then(result => {

//             console.log("Succeeded delete product");
//             return response
//                 .status(301)
//                 .redirect("/admin/products");
//         })
//         .catch(err => console.log(err));
// };

module.exports = {
    getProducts,
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    // postDeleteProduct
};

"use strict";

/*
 * Controller for all "product" either admin-product or user-product
 *
 */

// 3rd party Dependencies

// Internal Dependencies
const Product = require("./../models/product.js");

// Global variables

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

    //(title, price, imageUrl, description, id, userId)
    const product = new Product(title, price, imageUrl, description, null, request.user._id);

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


    //(title, price, imageUrl, description, id)
    const product = new Product(updatedTitle, updatedPrice, updatedImageUrl, updatedDesc, prodId);

    product.save()
        .then(result => {

            console.log("Succeeded update product");
            return response
                .status(301)
                .redirect("/admin/products");
        })
        .catch(err => console.log(err))
};

const postDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    Product.deleteById(prodId)
        .then(result => {

            console.log("Succeeded delete product");
            return response
                .status(301)
                .redirect("/admin/products");
        })
        .catch(err => console.log(err));
};

module.exports = {
    getProducts,
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    postDeleteProduct
};

"use strict";

/*
 * Controller for all "product" either admin-product or user-product
 *
 * XXX  NOTE FIXME:
 * @param product.push() is returning with a new array; caused the data can be seen
 * with unauthorized requested user; This a BAD APPROACH!!
 * XXX
 *
 */

// Internal Dependencies
const Product = require("./../models/product.js");

const getAddProduct = (request, response, next) => {

    return response
        .status(200)
        .render("admin/edit-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            // formCSS: true,
            // productCSS: true,
            // activeAddProduct: true
        });
};

const postAddProduct = (request, response, next) => {

    const title       = typeof(request.body.title) === "string" && request.body.title.trim().length > 0 ? request.body.title : false;
    const imageUrl    = typeof(request.body.imageUrl) === "string" && request.body.imageUrl.trim().length > 0 ? request.body.imageUrl : false;
    const price       = typeof(parseFloat(request.body.price)) === "number" && parseFloat(request.body.price.length) > -1 ? parseFloat(request.body.price) : false;
    const description = typeof(request.body.description) === "string" && request.body.description.trim().length > 0 ? request.body.description : false;

    const product = new Product(title, imageUrl, price, description);

    if (product.title === false ||
        product.imageUrl === false ||
        product.price === false ||
        product.description === false
    ) {
        //@TODO: Create notice word if product is false
        response
            .status(302)
            .render("admin/add-product", {
                pageTitle: "Add Product",
                path: "/admin/add-product",
            });
        return;
    };

    product.save();

    return response.status(302).redirect("/products");
};

// http://localhost:8080/admin/edit-product/123aabb?edit=true
const getEditProduct = (request, response, next) => {

    const editMode = request.query.edit;

    if (!editMode) {
        return response
            .status(301)
            .redirect("/");
    };

    // If editMode is attached even the value is 'null' or 'undefined'  you get render into
    // "admin/edit-product/productId"
    console.log(editMode);

    response.render("admin/edit-product", {
        pageTitle: "Edit Products",
        path: "/admin/edit-product",
        editing: editMode
    });
};

const getProducts = (request, response, next) => {

    Product.fetchAll(products => {

        return response
            .status(200)
            .render("admin/products", {
                products,
                pageTitle: "Admin Products",
                path: "/admin/products",
                activeShop: true,
                productCSS: true
            });
    });
};

module.exports = {
    getAddProduct,
    postAddProduct,
    getEditProduct,
    getProducts
};

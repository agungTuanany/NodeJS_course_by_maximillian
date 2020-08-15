"use strict";

/*
 * Controller for all "product" either admin-product or user-product
 *
 * XXX  NOTE FIXME:
 * @param product.push() is returning with a new array; caused the data can be seen
 * with unauthorized requested user; That cause the @param requested.body.title
 * is always stream until the server reloaded. This a BAD APPROACH!!
 * XXX
 */

// Internal Dependencies
const Product = require("./../models/product.js");

const getAddProduct = (request, response, next) => {

    return response
        .status(200)
        .render("admin/add-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            // hasProduct: products.length > 0,
            formCSS: true,
            productCSS: true,
            activeAddProduct: true
        });
};

const postAddProduct = (request, response, next) => {

    const product = new Product(request.body.title);

    if (request.body.title === "") {
        //@TODO: Create notice word if string empty
        return response
            .status(302)
            .render("admin/add-product", {
                pageTitle: "Add Product",
                path: "/admin/add-product",
                // hasProduct: products.length > 0
            });
    };

    product.save();

    return response.status(302).redirect("/");
};

const getProduct = (request, response, next) => {

    Product.fetchAll(products => {
        return response.render("shop/product-list", {
            products,
            pageTitle: "Shop Page",
            path: "/",
            hasProduct:  products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};

module.exports = {
    getAddProduct,
    postAddProduct,
    getProduct,
};
